import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { InventoryHistoryQueryDto } from './dto/inventory-history-query.dto';
import { InventoryMovement } from '../inventory/entities/inventory-moment.entity';
import { ProductRO } from '../products/interfaces/product.interface';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(InventoryMovement)
    private readonly movementRepository: Repository<InventoryMovement>,
    private readonly productsService: ProductsService,
  ) {}

  async getCurrentStock(): Promise<ProductRO[]> {
    return this.productsService.findAll();
  }

  async getInventoryHistory(
    query: InventoryHistoryQueryDto,
  ): Promise<InventoryMovement[]> {
    const { startDate, endDate } = query;

    const queryBuilder = this.movementRepository.createQueryBuilder('movement');

    queryBuilder
      .leftJoinAndSelect('movement.product', 'product')
      .leftJoinAndSelect('movement.user', 'user');

    if (startDate) {
      queryBuilder.andWhere('movement.createdAt >= :startDate', { startDate });
    }

    if (endDate) {
      const inclusiveEndDate = new Date(endDate);
      inclusiveEndDate.setDate(inclusiveEndDate.getDate() + 1);
      queryBuilder.andWhere('movement.createdAt < :endDate', {
        endDate: inclusiveEndDate,
      });
    }

    queryBuilder.orderBy('movement.createdAt', 'DESC');

    return queryBuilder.getMany();
  }
}
