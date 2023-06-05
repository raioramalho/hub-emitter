import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  CreateProductParamsDto,
} from './dto/create-product.dto';
import ImageService from 'src/services/image.service';
import DiretorioService from 'src/services/diretorio.service';
import { CustomError } from 'src/common/custom.error';
import { HubService } from 'src/services/hub.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly imageService: ImageService,
    private readonly diretorioService: DiretorioService,
  ) { }
  async create(data: CreateProductDto, params: CreateProductParamsDto) {
    try {
      const CONSUMERKEY = data.CONSUMERKEY;
      const CONSUMERSECRET = data.CONSUMERSECRET;
      const URLLOJAVIRTUAL = data.URLLOJAVIRTUAL;

      const hubService = new HubService(
        `HMAC-SHA1`,
        CONSUMERKEY,
        CONSUMERSECRET,
      );

      // if (params.sankhya === "true") {
      //   for (let index = 0; index < data?.images.length; index++) {

      //     await this.diretorioService.criarPastaProduto(
      //       params.cnpj,
      //       params.sku,
      //     );

      //     const SRC = data.images[index].src;
      //     const NAME = data.images[index].name;
      //   }

      // }

      // data.images = HUB_IMAGES;

      delete data.CONSUMERKEY;
      delete data.CONSUMERSECRET;
      delete data.URLLOJAVIRTUAL;
      delete data.HOSTURL;

      return await hubService.post(
        `${URLLOJAVIRTUAL}/wp-json/wc/v3/products`,
        data,
      );
    } catch (error) {
      throw new CustomError(
        JSON.stringify(error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create_image(data: CreateProductDto, params: CreateProductParamsDto) {
    try {
      var HUB_IMAGES = [];

      if (params.sankhya === 'true') {

        await this.diretorioService.criarPastaCnpj(+params.cnpj);
        await this.diretorioService.criarPastaProduto(
          +params.cnpj,
          +params.sku,
        );

        for (let index = 0; index < data.images.length; index++) {

          const SRC = data.images[index].src;
          const NAME = data.images[index].name;

          try {
            await this.imageService.download(SRC, `${params.cnpj}/${params.sku}/${NAME}`);
            HUB_IMAGES.push({
              src: `${data.HOSTURL}/${params.cnpj}/${params.sku}/${NAME}`,
            });
          } catch (error) {
            throw new CustomError(`${error}`, HttpStatus.EXPECTATION_FAILED);
          }

        }
      }

      data.images = HUB_IMAGES;

      return data;
    } catch (error) {
      throw new CustomError(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
