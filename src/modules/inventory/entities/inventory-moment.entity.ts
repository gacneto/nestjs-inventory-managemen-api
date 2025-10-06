import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { User } from 'src/modules/users/entities/user.entity';

export enum MovementType {
  IN = 'entrada',
  OUT = 'saída',
}

@Entity({ name: 'inventory_movements' })
export class InventoryMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, { eager: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: string;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User; // O usuário que registrou a movimentação

  @Column()
  user_id: string;

  @Column({ type: 'enum', enum: MovementType })
  type: MovementType;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  quantityBefore: number;

  @Column({ type: 'int' })
  quantityAfter: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
