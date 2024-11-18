import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';

@Module({
  providers: [SongsService]
})
export class SongsModule {}
