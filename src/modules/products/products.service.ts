import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRO } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  private mapToRo(product: Product): ProductRO {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      unit: product.unit,
      price: Number(product.price),
      quantity: product.currentQuantity,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  async create(dto: CreateProductDto): Promise<ProductRO> {
    const productEntity = this.productRepository.create({
      ...dto,
      currentQuantity: dto.initialQuantity,
    });

    const savedProduct = await this.productRepository.save(productEntity);
    return this.mapToRo(savedProduct);
  }

  async findAll(): Promise<ProductRO[]> {
    const products = await this.productRepository.find();
    return products.map((product) => this.mapToRo(product));
  }

  async findOne(id: string): Promise<ProductRO> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return this.mapToRo(product);
  }

  async update(id: string, dto: UpdateProductDto): Promise<ProductRO> {
    const product = await this.productRepository.preload({
      id: id,
      ...dto,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    const updatedProduct = await this.productRepository.save(product);
    return this.mapToRo(updatedProduct);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }
}
