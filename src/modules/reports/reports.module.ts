import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ProductsModule } from '../products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryMovement } from '../inventory/entities/inventory-moment.entity';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([InventoryMovement])],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
