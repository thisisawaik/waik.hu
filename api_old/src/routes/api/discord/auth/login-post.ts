import { Request, Response } from "express";
import { default as login, RequestData } from '../../../../functions/discordLogin'

export default async (req: Request, res: Response) => {
    try {
        const dctoken = req.query.token;
        console.log(dctoken);
        console.log(res.locals.auth);
        if (typeof dctoken !== 'string') {
            return res.status(400).send('Missing token');
        }
        if (typeof req.query.source !== 'string') {
            return res.status(400).send('Missing source');
        }
        if (!dctoken) {
            return res.status(400).send({
                status: 400,
                type: "error",
                error: "Token not found in request"
            });
        }
        const data: RequestData = {
            token: dctoken,
            source: req.query.source || req.headers.origin || "https://waik.hu/auth/discord/callback",
            isDefaultSource: !req.query.source,
        }
        console.log(data);
        const token = await login(data, req, res);
        console.log(token);
        return res.status(200).json(token);
    } catch (e) {
        console.log(e)
        return res.sendStatus(500);
    }
    
};
export const autoRegister = true;
