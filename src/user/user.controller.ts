import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Inject, forwardRef, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordUserDto } from './dto/update-password.dto';
import { PaginationQueryDto } from 'src/utils/dtos/pagination-query.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
@ApiSecurity('JWT-auth')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.add(createUserDto);
  }

  @Get()
  //@UseGuards(JwtAuthGuard)
  async findAll(@Query() query: PaginationQueryDto) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('/changepassword/:id')
  changePassword(@Param('id') id: string, @Body() updatePasswordUserDto: UpdatePasswordUserDto){
    return this.userService.changePassword(id, updatePasswordUserDto)
  }

}