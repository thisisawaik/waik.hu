import { Test, TestingModule } from '@nestjs/testing';
import { DownloadsResolver } from './downloads.resolver';

describe('DownloadsResolver', () => {
  let resolver: DownloadsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DownloadsResolver],
    }).compile();

    resolver = module.get<DownloadsResolver>(DownloadsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
