import { Transform } from 'class-transformer';

export class NewsRequestDto {

  @Transform(({ value }) => value?.trim())
  searchParams: string;
}