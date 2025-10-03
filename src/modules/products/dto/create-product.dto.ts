import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsEnum,
  IsPositive,
} from 'class-validator';
import { ProductUnit } from '../entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'O nome do produto',
    example: 'Café Especial Grão',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A categoria do produto',
    example: 'Grãos',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'A unidade de medida do produto',
    enum: ProductUnit,
    example: ProductUnit.KILOGRAM,
  })
  @IsEnum(ProductUnit)
  @IsNotEmpty()
  unit: ProductUnit;

  @ApiProperty({
    description: 'O preço unitário do produto',
    example: 85.5,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'A quantidade inicial do produto em estoque',
    example: 10,
  })
  @IsNumber()
  @Min(0)
  initialQuantity: number;
}
