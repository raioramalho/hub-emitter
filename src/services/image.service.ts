import fs from 'fs';
import https from 'https';
import http from 'http';
import { Injectable } from '@nestjs/common';

const path = '/var/www/html/public/produtos';

@Injectable()
export default class ImageService {
  async baixarImagem(
    cnpj: string,
    sku: string,
    src: string,
    nomeDaImagem: string,
  ): Promise<boolean> {
    const check = src.split(':');

    if (check[0] === 'https') {
      return new Promise<boolean>((resolve, reject) => {
        const file = fs.createWriteStream(
          `${path}/${cnpj}/${sku}/${nomeDaImagem}`,
        );
        const request = https.get(src, (response) => {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Imagem baixada [ ${nomeDaImagem} ]`);
            resolve(true);
          });
        });
        request.on('error', (err) => {
          console.error('Erro ao baixar a imagem!');
          reject(false);
        });
      });
    } else {
      return new Promise<boolean>((resolve, reject) => {
        const file = fs.createWriteStream(
          `${path}/${cnpj}/${sku}/${nomeDaImagem}`,
        );
        const request = http.get(src, (response) => {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Imagem baixada [ ${nomeDaImagem} ]`);
            resolve(true);
          });
        });
        request.on('error', (err) => {
          console.error('Erro ao baixar a imagem!');
          reject(false);
        });
      });
    }
  }
}
