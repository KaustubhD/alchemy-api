import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';
import { format } from 'util';
import { createHash } from 'crypto';
import { NewsResponseDto } from '../news/dto/newsResponse.dto';
import { ForecastResponseDto } from '../weather/dto/forecastResponse.dto';

@Injectable()
export class HttpApiService {

  public constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  public async getNews(url: URL): Promise<NewsResponseDto> {
    url.searchParams.set('apiKey', process.env.NEWS_API_KEY);
    
    return this.invokeApi<NewsResponseDto>(url);
  }

  public async getWeatherForecast(url: URL): Promise<ForecastResponseDto> {
    url.searchParams.set('appid', process.env.WEATHER_API_KEY);

    return this.invokeApi<ForecastResponseDto>(url);
  }

  public async invokeApi<T>(url: URL): Promise<any> {
    const urlString = url.toString();
    const cacheKey = this.getCacheKeyFromUrl(urlString);
    let response: any = await this.cacheManager.get(cacheKey);
    
    if (response) {
      Logger.log('Getting data from cache');
    } else {
      Logger.log('Invoking: ' + urlString);
      response = await lastValueFrom(this.httpService.get<T>(urlString));
      Logger.debug('Got response: ' + format('%o', response.data));
      await this.cacheManager.set(cacheKey, response);
      Logger.debug('Cache added for: ' + cacheKey);
    }

    return response.data;
  }

  private getCacheKeyFromUrl(url: string): string {
    return createHash('sha256')
      .update(Buffer.from(url))
      .digest()
      .toString('hex');
  }
}
