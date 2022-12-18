import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({
    description: 'User defined handle',
    example: 'abc',
    required: true,
  })
  public userName: string;
  

  @ApiProperty({
    description: 'Password',
    example: 'test@1234-',
    required: true,
    minimum: 5
  })
  public password: string;
}