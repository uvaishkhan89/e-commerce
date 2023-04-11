import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>){}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    return this.productRepository.findOne({
      where: {id}
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto
    });
    return this.productRepository.save(product);
  }

  async remove(id) {
    const product = await this.findOne(id)
    return this.productRepository.delete(product);
  }
    
  async search(key){
    const result = await this.productRepository.find({
      where: [
        { name: Like(`%${key}%`) },
        { company: Like(`%${key}%`) },
        { category: Like(`%${key}%`) },
      ],
    });
    return result;
  }
}
