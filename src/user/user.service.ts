import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { UpdatePasswordUserDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ){}

  async hashPassword(password:string){
    const saltOrRounds = 10;
    const password1 = password;
    const hash = await bcrypt.hash(password1, saltOrRounds);
    return hash;
  }

  async add(data) {
    data.password = await this.hashPassword(data.password)
    return this.userRepository.save(data);
  }

  async findAll(query) {
    const {page=1, limit=10, sortOrder, sortBy = 'id'} = query;
    const [users, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: {
        [sortBy]: sortOrder || 'ASC',
      },
    });
    return [users, {Count: total}];
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: {id}
    });
  }

  async update(id, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await this.hashPassword(updateUserDto.password)
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

  async changePassword(id, updatePasswordUserDto: UpdatePasswordUserDto){
    const { oldPassword, newPassword, confirmPassword } = updatePasswordUserDto;
    const user = await this.userRepository.findOne({
      where: {id: id}
    })
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if(user && isMatch){
      if(newPassword == confirmPassword){
        user.password = await this.hashPassword(newPassword);
        this.userRepository.save(user);
        return 'Password Change Successfully';
      }else{
        throw new NotFoundException('Password not match');
      }
    }else{
      throw new NotFoundException('Enter correct password');
    }
  }

  async updatePassword(id, newPassword): Promise<User>{
    const user = await this.findOne(id);
    user.password = await this.hashPassword(newPassword);
    return this.userRepository.save(user);
  }

}

