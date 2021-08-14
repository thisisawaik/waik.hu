import { Request, Response } from "express";
import { auth } from 'firebase-admin';
import submit from '../../../../functions/fanartApprove';
export default async function (req: Request, res: Response) {
    const data: FanartSubmitRequest = req.body;
    if (!data.id) {
        return res.status(400).send({ error: "Missing parameter 'id'" });
    }
    const user: auth.UserRecord = res.locals.auth;
    if (!user) {
        return res.status(401).end();
    }
    const resutl = await submit(data.id, user.uid);

}

export interface FanartSubmitRequest {
    id: string;
}