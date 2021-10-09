import { Controller, Get, Param, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DownloadsService } from './downloads.service';

@Controller('downloads')
export class DownloadsController {

    constructor(private readonly downloadService: DownloadsService) {}

    @Get('downloads/:Id')
    async getDownload(@Param('Id') id: string, @Query('force') force: string = "false", @Res() res: Response) {
        const rawdata = await this.downloadService.getDownload(id, Boolean(force));
        const data = { ...rawdata, id }
        return res.status(HttpStatus.OK).json(data)
    }
}
