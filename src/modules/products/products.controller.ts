import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/modules/users/entities/user.entity';
import { ProductRO } from './interfaces/product.interface';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Criar um novo produto (Apenas Admin)' })
  @ApiResponse({
    status: 201,
    description: 'O produto foi criado com sucesso.',
    type: ProductRO,
  })
  create(@Body() createProductDto: CreateProductDto): Promise<ProductRO> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Listar todos os produtos (Admin e Funcionário)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos.',
    type: [ProductRO],
  })
  findAll(): Promise<ProductRO[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Buscar um produto pelo ID (Admin e Funcionário)' })
  @ApiResponse({
    status: 200,
    description: 'Dados do produto.',
    type: ProductRO,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ProductRO> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Atualizar um produto pelo ID (Apenas Admin)' })
  @ApiResponse({
    status: 200,
    description: 'O produto foi atualizado com sucesso.',
    type: ProductRO,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductRO> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar um produto pelo ID (Apenas Admin)' })
  @ApiResponse({
    status: 204,
    description: 'O produto foi deletado com sucesso.',
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
