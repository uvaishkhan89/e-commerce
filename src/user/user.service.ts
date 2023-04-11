import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ){}

  add(data) {
    return this.userRepository.save(data);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: {id}
    });
  }

  async update(id, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    });
    return this.userRepository.save(user);
  }

  async remove(id) {
    const user = await this.findOne(id);
    return this.userRepository.delete(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
        where: {
            email: email,
        }
    });
}

  async getUserByName(email) {
    return this.userRepository.findOne({ where: email })
  }
}
