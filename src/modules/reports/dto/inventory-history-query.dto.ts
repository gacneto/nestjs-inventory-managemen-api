import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class InventoryHistoryQueryDto {
  @ApiPropertyOptional({
    description:
      'A data de início para o filtro (formato ISO 8601: YYYY-MM-DD)',
    example: '2025-10-01',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'A data final para o filtro (formato ISO 8601: YYYY-MM-DD)',
    example: '2025-10-31',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
