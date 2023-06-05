import { HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CustomError } from 'src/common/custom.error';

const path = '/var/www/html/public/produtos';

@Injectable()
export default class DiretorioService {
  buscar(endereco: any) {
    try {
      fs.existsSync(`${path}/${endereco}`);
    } catch (error) {
      // throw new CustomError(`${error}`, HttpStatus.EXPECTATION_FAILED);
      return false;
    }
  }

  async criarPastaCnpj(cnpj: number) {
    try {
      await fs.promises.mkdir(`${path}/${cnpj}`);
      console.log('Pasta criada com sucesso!');
    } catch (error) {
      // throw new CustomError(`${error}`, HttpStatus.EXPECTATION_FAILED);
    }
  }

  async criarPastaProduto(cnpj: any, sku: any) {
    try {
      await fs.promises.mkdir(`${path}/${cnpj}/${sku}`);
      console.log('Pasta criada com sucesso!');
    } catch (error) {
      // throw new CustomError(`${error}`, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
