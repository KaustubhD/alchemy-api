import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SecurityUtils } from '../utils/SecurityUtils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  public constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}


  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = SecurityUtils.hashPassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return (await this.userRepository.find()).map(this.removeSensitiveInfo);
  }

  async findOne(userId: string): Promise<User> {
    return this.removeSensitiveInfo(await this.userRepository.findOneBy({ userId }));
  }
  async findOneByUserName(userName: string): Promise<User> {
    return this.userRepository.findOneBy({ userName });
  }

  removeSensitiveInfo(user: User): User {
    if (user) {
      delete user['password'];
      delete user['isActive'];
    }

    return user;
  }
}
