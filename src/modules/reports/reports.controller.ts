import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/modules/users/entities/user.entity';
import { ReportsService } from './reports.service';
import { InventoryHistoryQueryDto } from './dto/inventory-history-query.dto';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('current-stock')
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @ApiOperation({
    summary: 'Obter relatório de estoque atual (Admin e Funcionário)',
  })
  getCurrentStock() {
    return this.reportsService.getCurrentStock();
  }

  @Get('inventory-history')
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @ApiOperation({
    summary:
      'Obter histórico de movimentações de estoque (Admin e Funcionário)',
  })
  getInventoryHistory(@Query() queryDto: InventoryHistoryQueryDto) {
    return this.reportsService.getInventoryHistory(queryDto);
  }
}
