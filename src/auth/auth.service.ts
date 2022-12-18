import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { SecurityUtils } from "../utils/SecurityUtils";
import { AuthDto } from "./dto/AuthDto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async register(userDto: CreateUserDto): Promise<User> {
    return this.userService.create(userDto);
  }
  public async login(authDto: AuthDto): Promise<any> {
    const user = await this.validateUser(authDto.userName, authDto.password);
    const tokenPayload = { userName: user.userName, sub: user.userId };
    const accessToken = this.jwtService.sign(tokenPayload);
    
    return { accessToken };
  }

  public async validateUser(userName: string, password: string): Promise<User> {
    const user = await this.userService.findOneByUserName(userName);
    const hashedPassword = SecurityUtils.hashPassword(password);

    if (user && user.password == hashedPassword) {
      delete user['password'];
      return user;
    }

    throw new UnauthorizedException();
  }
}