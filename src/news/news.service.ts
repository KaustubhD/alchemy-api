import { Injectable } from '@nestjs/common';
import { isEmpty } from 'class-validator';
import { NewsList } from './entities/newsList.entity';
import { NewsRequestDto } from './dto/newsRequest.dto';
import { HttpApiService } from '../http-api/http-api.service';
import { News } from './entities/news.entity';
import { ArticleDto } from './dto/article.dto';

@Injectable()
export class NewsService {
  private readonly apiUrl: URL;
  public constructor(private httpService: HttpApiService) {
  }

  public async getNews(requestDto: NewsRequestDto): Promise<NewsList> {
    const apiUrl = this.getBaseUrl();
    this.setDefaultParams(apiUrl);
    if (requestDto.searchParams && !isEmpty(requestDto.searchParams)) {
      apiUrl.searchParams.set('q', requestDto.searchParams);
    }

    const apiResponse = await this.httpService.getNews(apiUrl);
    const sanitisedResponse: NewsList = {
      count: apiResponse.totalResults,
      data: apiResponse.articles.map(this.sanitiseArticles),
    }
    return sanitisedResponse;
  }

  private setDefaultParams(url: URL): void {
    url.searchParams.set('country', process.env.COUNTRY);
  }

  private getBaseUrl(): URL {
    return new URL(process.env.HEADLINES_URL);
  }

  private sanitiseArticles(article: ArticleDto): News {
    return {
      url: article.url,
      headline: article.title,
    };
  }
}
