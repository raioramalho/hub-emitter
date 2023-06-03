import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import ImageService from 'src/services/image.service';
import DiretorioService from 'src/services/diretorio.service';
import { HubService } from 'src/services/hub.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ImageService, DiretorioService],
})
export class ProductModule {}
