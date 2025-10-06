import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { CreateMovementDto } from './dto/create-movement.dto';
import { InventoryService } from './inventory.service';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/modules/users/entities/user.entity';
import { GetUser } from 'src/modules/auth/decorators/get-user.decorator';
import { User } from 'src/modules/users/entities/user.entity';

@ApiTags('inventory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('stock-in')
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @ApiOperation({
    summary: 'Registrar entrada de produto no estoque (Admin e Funcionário)',
  })
  stockIn(@Body() dto: CreateMovementDto, @GetUser() user: User) {
    return this.inventoryService.stockIn(dto, user);
  }

  @Post('stock-out')
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @ApiOperation({
    summary: 'Registrar saída de produto do estoque (Admin e Funcionário)',
  })
  stockOut(@Body() dto: CreateMovementDto, @GetUser() user: User) {
    return this.inventoryService.stockOut(dto, user);
  }
}
