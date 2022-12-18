import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../../src/users/users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepo: Partial<Repository<User>>;

  beforeEach(async () => {
    userRepo = {

    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
