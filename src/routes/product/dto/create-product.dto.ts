import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

class Categories {
  @IsOptional()
  @IsNumber()
  id: number;
}

class Images {
  @IsOptional()
  @IsString()
  src: string;
  @IsOptional()
  @IsString()
  name: string;
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  HOSTURL: string;

  @IsNotEmpty()
  @IsString()
  URLLOJAVIRTUAL: string;

  @IsNotEmpty()
  @IsString()
  CONSUMERKEY: string;

  @IsNotEmpty()
  @IsString()
  CONSUMERSECRET: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  weight: string;

  @IsOptional()
  stock_quantity: any;

  @IsOptional()
  date_modified: any;

  @IsOptional()
  dimensions: any;

  @IsOptional()
  sku: any;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  regular_price?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  short_description?: string;

  @IsOptional()
  categories: Categories[];
  @IsOptional()
  images: Images[];
}

export class CreateProductParamsDto {
  @IsOptional()
  cnpj: string;

  @IsOptional()
  sku: string;

  @IsOptional()
  sankhya: string;
}
