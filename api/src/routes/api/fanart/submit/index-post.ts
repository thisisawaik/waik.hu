import { Request, Response } from "express";
import { auth } from 'firebase-admin';
import submit from '../../../../functions/fanartSubmit';
export default async function (req: Request, res: Response) {
    const data: FanartSubmitRequest = req.body;
    if (!data.id) {
        return res.status(400).send({ error: "Missing parameter 'id'" });
    }
    const user: auth.UserRecord = res.locals.auth;
    console.log("User:", user.uid);
    if (!user) {
        return res.status(401).end();
    }
    try {
        const result = await submit(data.id || user.uid, user);
        console.log(result.path);
        return res.status(200).send('OK');
    } catch (error) {
        console.error(error);
        if (error === "user has more than 3 fanarts") {
            return res.status(403).send({ error: "user has more than 3 fanarts", code: 'mt3' });
        }
        return res.status(500).send({ error: error });
    }
    
}

export interface FanartSubmitRequest {
    id: string;
}

export const autoRegister = true;