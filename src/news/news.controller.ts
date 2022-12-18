import { Controller, Query, UseGuards, Get, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { NewsRequestDto } from './dto/newsRequest.dto';
import { NewsList } from './entities/newsList.entity';
import { NewsService } from './news.service';


@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: NewsList, status: HttpStatus.OK })
  public getNews(@Query() searchParams: NewsRequestDto): Promise<NewsList> {
    return this.newsService.getNews(searchParams);
  }
}
