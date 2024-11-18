import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly songs = [];
  findAll() {
    return this.songs;
  }
  createSong(song) {
    this.songs.push(song);
    return this.songs;
  }
}
