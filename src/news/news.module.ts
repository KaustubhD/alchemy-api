import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { HttpApiModule } from 'src/http-api/http-api.module';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [HttpApiModule]
})
export class NewsModule {}
