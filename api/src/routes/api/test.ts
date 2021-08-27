import { Request, Response } from "express";

// http://localhost:8080/api/test

export default (req: Request, res: Response) => {
    console.log('test')
    return res.sendStatus(200);
}

export const autoRegister = true;