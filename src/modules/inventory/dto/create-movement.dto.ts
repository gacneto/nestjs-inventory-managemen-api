import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class CreateMovementDto {
  @ApiProperty({
    description: 'O ID do produto que está sendo movimentado',
    example: 'a0b1c2d3-e4f5-g6h7-i8j9-k0l1m2n3o4p5',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'A quantidade a ser adicionada ou removida do estoque',
    example: 10,
  })
  @IsInt()
  @IsPositive({ message: 'A quantidade deve ser um número positivo' })
  quantity: number;
}
