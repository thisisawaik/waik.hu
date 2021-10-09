import { Request, Response } from "express";
import * as fs from 'fs'
// http://localhost:8080/api/test

export default async (req: Request, res: Response) => {
    console.log(`./lighthouse/${req.params.id}`)
    return res.status(200).send(fs.readFileSync(`./lighthouse/${req.params.id}`, 'utf8'));
}

export const autoRegister = true;