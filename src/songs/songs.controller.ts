import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Post()
  createSong(@Body() body: CreateSongDTO) {
    return this.songsService.createSong(body);
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
