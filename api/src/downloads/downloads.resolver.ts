import { Args, Query, Resolver } from '@nestjs/graphql';
import { DownloadsService } from './downloads.service';
import { Download } from './models/downloads.model';

@Resolver()
export class DownloadsResolver {

    constructor(private readonly downloadService: DownloadsService) { }

    @Query(() => Download)
    async getDownload(@Args('id') id: string, @Args('force') force: boolean = false): Promise<Download> {
        const rawdata = await this.downloadService.getDownload(id, force);
        const data = { ...rawdata, id }
        return data;
    }
}
