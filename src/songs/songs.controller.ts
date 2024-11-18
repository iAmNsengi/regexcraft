import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Get()
  findAll() {
    return 'Get all songs endpoint';
  }

  @Post()
  createSong() {
    return 'Create song endpoint';
  }

  @Patch()
  updateSong() {
    return 'Update song endpoint';
  }
  @Delete()
  deleteSong() {
    return 'Delete song endpoint';
  }
}
