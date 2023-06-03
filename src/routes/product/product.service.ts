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
  ) {}
  async create(data: CreateProductDto, params: CreateProductParamsDto) {
    try {
      const CONSUMERKEY = data.CONSUMERKEY;
      const CONSUMERSECRET = data.CONSUMERSECRET;
      const URLLOJAVIRTUAL = data.URLLOJAVIRTUAL;
      const HUB_IMAGES = [];

      const hubService = new HubService(
        `HMAC-SHA1`,
        CONSUMERKEY,
        CONSUMERSECRET,
      );

      if (params.sankhya === true) {
        for (let index = 0; index < data?.images.length; index++) {
          await this.diretorioService.criarPastaCnpj(params.cnpj);
          await this.diretorioService.criarPastaProduto(
            params.cnpj,
            params.sku,
          );

          const SRC = data.images[index].src;
          const NAME = data.images[index].name;

          const DOWNLOAD = await this.imageService.baixarImagem(
            params.cnpj,
            params.sku,
            SRC,
            NAME,
          );

          if (!DOWNLOAD) {
            HUB_IMAGES.push({
              src: `${data.HOSTURL}/public/produtos/${params.cnpj}/${params.sku}/${NAME}`,
            });
          } else {
            HUB_IMAGES.push({
              src: '',
            });
          }
        }
        data.images = HUB_IMAGES;
      }

      delete data.CONSUMERKEY;
      delete data.CONSUMERSECRET;
      delete data.URLLOJAVIRTUAL;
      delete data.HOSTURL;

      const emit: any = await hubService.post(
        `${URLLOJAVIRTUAL}/wp-json/wc/v3/products`,
        data,
      );
      if (!emit?.id) {
        throw new CustomError(emit, HttpStatus.EXPECTATION_FAILED);
      }

      return data;
    } catch (error) {
      throw new CustomError(
        JSON.stringify(error),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
