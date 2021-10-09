import { Request, Response } from "express";

export default (req: Request, res: Response) => {
    console.log('test admin')
    // console.log(res.locals.decodedToken)
    return res.status(200).send("OK");
}

export const autoRegister = true;
