import { Module } from '@nestjs/common';
import { DownloadsResolver } from './downloads.resolver';
import { DownloadsService } from './downloads.service';
import { DownloadsController } from './downloads.controller';

@Module({
    providers: [DownloadsResolver, DownloadsService],
    controllers: [DownloadsController],
})
export class DownloadsModule {}
