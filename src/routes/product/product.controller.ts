import { Controller, Post, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  CreateProductParamsDto,
} from './dto/create-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/criar_produto/:cnpj/:sku/:sankhya')
  create(
    @Body() data: CreateProductDto,
    @Param() params: CreateProductParamsDto,
  ) {
    return this.productService.create(data, params);
  }

  @Post('criar_imagem/:cnpj/:sku/:sankhya')
  create_imagem(
    @Body() data: CreateProductDto,
    @Param() params: CreateProductParamsDto,
  ) {
    return this.productService.create_image(data, params);
  }
}
