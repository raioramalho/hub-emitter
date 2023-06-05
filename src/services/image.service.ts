import fetch from 'fetch';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
const base = '/var/www/html/public/produtos';

@Injectable()
export default class ImageService {
  async download(url: string, path: string) {
    fetch(url)
      .then((response: any) => {
        const dest = fs.createWriteStream(`${base}/${path}`);
        response.body.pipe(dest);

        dest.on('finish', () => {
          console.log('Download concluído!');
          return true;
        });

        dest.on('error', (err) => {
          console.error(`Ocorreu um erro durante o download: ${err.message}`);
          throw new Error(err.message);
        });

      });
  }
}
