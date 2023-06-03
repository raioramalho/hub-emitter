import { Injectable } from '@nestjs/common';
import fs from 'fs';
const path = '/var/www/html/public/produtos';

@Injectable()
export default class DiretorioService {
  buscar(endereco: any) {
    try {
      const buscar = fs.existsSync(`${path}/${endereco}`);
      if (!buscar) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  }

  criarPastaCnpj(cnpj: any) {
    try {
      fs.mkdir(`${path}/${cnpj}`, (error) => {
        if (error) {
          console.log(`Pasta do CNPJ: ${cnpj} - ERROR`);
        } else {
          console.log(`Pasta do CNPJ: ${cnpj} - SUCESSO`);
        }
      });
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  }

  criarPastaProduto(cnpj: any, sku: any) {
    fs.mkdir(`${path}/${sku}`, (error) => {
      if (error) {
        console.log(`Pasta do PRODUTO: ${sku} - ERROR`);
      } else {
        console.log(`Pasta do PRODUTO: ${sku} - SUCESSO`);
      }
    });
  }
}
