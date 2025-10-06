import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  InventoryMovement,
  MovementType,
} from './entities/inventory-moment.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryMovement)
    private readonly movementRepository: Repository<InventoryMovement>,
    private readonly productsService: ProductsService,
    private readonly dataSource: DataSource,
  ) {}

  async stockIn(
    dto: CreateMovementDto,
    user: User,
  ): Promise<InventoryMovement> {
    const { productId, quantity } = dto;

    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const product = await transactionalEntityManager.findOne(Product, {
        where: { id: productId },
      });
      if (!product) {
        throw new NotFoundException(
          `Produto com ID "${productId}" não encontrado.`,
        );
      }

      const quantityBefore = product.currentQuantity;
      const quantityAfter = quantityBefore + quantity;

      product.currentQuantity = quantityAfter;
      await transactionalEntityManager.save(product);

      const movement = transactionalEntityManager.create(InventoryMovement, {
        product_id: productId,
        user_id: user.id,
        type: MovementType.IN,
        quantity,
        quantityBefore,
        quantityAfter,
      });

      return transactionalEntityManager.save(movement);
    });
  }

  async stockOut(
    dto: CreateMovementDto,
    user: User,
  ): Promise<InventoryMovement> {
    const { productId, quantity } = dto;

    return this.dataSource.transaction(async (transactionalEntityManager) => {
      const product = await transactionalEntityManager.findOne(Product, {
        where: { id: productId },
      });
      if (!product) {
        throw new NotFoundException(
          `Produto com ID "${productId}" não encontrado.`,
        );
      }

      const quantityBefore = product.currentQuantity;

      if (quantityBefore < quantity) {
        throw new BadRequestException(
          `Estoque insuficiente. Quantidade atual: ${quantityBefore}.`,
        );
      }

      const quantityAfter = quantityBefore - quantity;

      product.currentQuantity = quantityAfter;
      await transactionalEntityManager.save(product);

      const movement = transactionalEntityManager.create(InventoryMovement, {
        product_id: productId,
        user_id: user.id,
        type: MovementType.OUT,
        quantity,
        quantityBefore,
        quantityAfter,
      });

      return transactionalEntityManager.save(movement);
    });
  }
}
