import { Request, Response, NextFunction } from "express";
import { firestore } from 'firebase-admin'
import * as qdb from 'quick.db'

export default async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // const token: any = req.header('Auth-Token')
    console.log(`origin: ${req.headers['origin']}`);
    console.log(req.headers);
    console.log(req.headers['api-key']);
    if (!req.headers['origin']) {
        return res.status(403).send('Forbidden');
    }
    if (!req.headers['api-key'] || typeof req.headers['api-key'] !== 'string') {
        return res.status(403).send('Forbidden');
    }
    try {
        console.log(qdb.get(`keys.${req.headers['api-key']}`));
        const keydoc: KeyDoc = qdb.get(`keys.${req.headers['api-key']}`)
        if (!keydoc) {
            throw new Error('load_key')
        }
        const isValid = await validateKey(keydoc, req.headers['origin'])
        if (!isValid) {
            return res.status(403).send('Forbidden');
        }
        return next()
    } catch (error) {
        res.header("Access-Control-Allow-Origin", req.headers['origin']);
        const keydoc = await loadKey(req.headers['api-key'])
        const isValid = await validateKey(keydoc, req.headers['origin'])
        if (!isValid) {
            return res.status(403).send('Forbidden');
        }
        return next()
    }
}

export const autoRegister = false;

async function loadKey (key: string): Promise<KeyDoc> {
    const db = firestore();
    const keyRef = db.collection('waik/website/api_keys').doc(key);
    const keyDoc = await keyRef.get();
    if (typeof keyDoc.data() === 'undefined') {
        throw new Error('Doc undefined')
    }
    if (keyDoc.exists) {
        console.log(keyDoc.data());
        qdb.set(`keys.${key}`, keyDoc.data() || false);
        const keydoc: any = keyDoc.data()
        return keydoc;
    }
    throw new Error('Doc not found')
}

async function validateKey (keydoc: KeyDoc, origin: string): Promise<boolean> {
    if (keydoc.site.length < 1) {
        return false;
    }
    if (!origin) {
        return false;
    }
    const site = origin.split('//')[1];
    console.log(site);
    if (keydoc.site.find(e => e === site)) {
        return true;
    }
    return false;
}

interface KeyDoc {
    owner: string;
    public: boolean;
    site: Array<string>;
}