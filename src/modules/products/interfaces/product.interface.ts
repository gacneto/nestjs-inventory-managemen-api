import { ApiProperty } from '@nestjs/swagger';
import { ProductUnit } from '../entities/product.entity';

export class ProductRO {
  @ApiProperty({
    description: 'O ID único do produto',
    example: 'a0b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5',
  })
  id: string;

  @ApiProperty({
    description: 'O nome do produto',
    example: 'Café Especial Grão',
  })
  name: string;

  @ApiProperty({ description: 'A categoria do produto', example: 'Grãos' })
  category: string;

  @ApiProperty({
    description: 'A unidade de medida',
    enum: ProductUnit,
    example: ProductUnit.KILOGRAM,
  })
  unit: ProductUnit;

  @ApiProperty({ description: 'O preço de venda do produto', example: 85.5 })
  price: number;

  @ApiProperty({ description: 'A quantidade atual em estoque', example: 50 })
  quantity: number;

  @ApiProperty({
    description: 'A data de criação do registro',
    example: '2025-10-02T12:25:35.488Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'A data da última atualização do registro',
    example: '2025-10-02T12:25:35.488Z',
  })
  updatedAt: Date;
}
