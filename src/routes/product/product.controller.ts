import { Controller, Post, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/criar_produto/:cnpj/:sku/:sankhya')
  create(@Body() data: CreateProductDto, @Param() params: any) {
    return this.productService.create(data, params);
  }
}
