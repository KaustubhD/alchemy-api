import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "..//users/entities/user.entity";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/AuthDto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  public constructor(private authService: AuthService) { }

  @Post('signup')
  @ApiResponse({ status: HttpStatus.OK, type: User })
  public registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  public authenticateUser(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

}