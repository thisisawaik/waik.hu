import { Request, Response } from "express";


export default (req: Request, res: Response) => {
    console.log('test')
    return res.status(200).send("OK");
}