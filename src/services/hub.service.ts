import { HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import addOAuthInterceptor from 'axios-oauth-1.0a';
import { CustomError } from 'src/common/custom.error';

@Injectable()
export class HubService {
  algorithm: any;
  key: string;
  secret: string;
  constructor(algorithm: any, key: string, secret: string) {
    this.algorithm = algorithm;
    this.key = key;
    this.secret = secret;
  }

  async post(URLLOJAVIRTUAL: string, data: any) {
    const client = axios.create();
    addOAuthInterceptor(client, this);

    const woo = await client
      .post(URLLOJAVIRTUAL, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new CustomError(`${error}`, HttpStatus.EXPECTATION_FAILED);
      });

    return woo;
  }
}
