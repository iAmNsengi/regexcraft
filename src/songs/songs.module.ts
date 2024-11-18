import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';

@Module({
  providers: [SongsService],
  controllers: [SongsController]
})
export class SongsModule {}
