import { Request, Response } from "express";
import login from '../../../../functions/discordLogin';

export default async (req: Request, res: Response) => {
    const token = req.header('Auth-Token');
    try {
        await login(token, req, res);
    } catch (e) {
        if (e === "no-token-found") {
            res.status(401).send("No token found");
          } else if (e === "source-not-provided") {
            res.status(400).send("Source not provided");
          } else {
            res.status(500).send(e);
          }
    }
    return res.status(200).send("OK");
};
export const autoRegister = true;