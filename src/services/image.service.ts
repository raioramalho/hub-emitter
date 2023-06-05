import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateProductParamsDto } from 'src/routes/product/dto/create-product.dto';

@Injectable()
export default class ImageService {
  async download(url: string, params: CreateProductParamsDto, NAME: string) {
    const response = await axios.get(url, { responseType: 'stream' });
    response.data.pipe(fs.createWriteStream(`/var/www/html/public/${Number(params.cnpj)}/${Number(params.sku)}/${NAME}`));

    return new Promise<void>(async (resolve, reject) => {
      await response.data.on('end', () => {
        resolve();
        console.log('ok')
      });
      // response.data.on('error', (err) => {
      //   reject(err);
      // });
    });
  }
}
