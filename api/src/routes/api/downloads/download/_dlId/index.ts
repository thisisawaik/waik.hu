import { Request, Response } from 'express';
import getDownload from '../../../../../functions/getDownload';

export default async function (req: Request, res: Response) {
    const download = await getDownload(req.params.dlId)
    res.setHeader('Cache-Contorl', 'public, max-age=86400');
    if (download.visible === true) {
        return res.status(200).json(download);
    } else if (res.locals.auth.customClaims.isWaikAdmin) {
        return res.status(200).json(download);
    }
    return res.status(401).send('Unauthorized');
}

export const autoRegister = true;
