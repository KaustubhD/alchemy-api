import { Test } from "@nestjs/testing";
import { HttpApiService } from "../../src/http-api/http-api.service";
import { NewsService } from "../../src/news/news.service";
import { mockNewsResponse } from "./mock/newsResponse.mock";


describe('News service', () => {
  const oldEnv = process.env;
  let mockGetNewsFn: jest.Mock;
  let newsService: NewsService;
  let mockHttpService: Partial<HttpApiService>;
  
  beforeEach(async () => {
    process.env = {
      HEADLINES_URL: 'https://sample-url.com'
    };
    mockGetNewsFn = jest.fn().mockResolvedValue(mockNewsResponse);
    mockHttpService = {
      getNews: mockGetNewsFn,
    };

    const moduleRef = await Test.createTestingModule({
        providers: [
          NewsService,
          {
            provide: HttpApiService,
            useValue: mockHttpService,
          }
        ],
      }).compile();

    newsService = moduleRef.get<NewsService>(NewsService);
  });

  afterAll(() => {
    process.env = oldEnv;
  });
  describe('GetNews()', () => {
    test('It should return correct response', async () => {
      const actualResponse = await newsService.getNews({ searchParams: 'sample' });
  
      expect(actualResponse).toHaveProperty('count');
      expect(actualResponse).toHaveProperty('data');
      expect(actualResponse.count).toEqual(mockNewsResponse.articles.length);
      actualResponse.data.forEach((article, ind: number) => {
        expect(article.headline).toEqual(mockNewsResponse.articles[ind].title);
        expect(article.url).toEqual(mockNewsResponse.articles[ind].url);
      })
    });
    
    test('It should add search params in url params', async () => {
      const query = 'sample query';
      
      await newsService.getNews({ searchParams: query });

      const actualUrl: URL = mockGetNewsFn.mock.calls[0][0];
      expect(actualUrl.searchParams.get('q')).toEqual(query);
    });

    test('It should add country in url params', async () => {
      const country = 'ind';
      process.env.COUNTRY = country;
      
      await newsService.getNews({ searchParams: '' });

      const actualUrl: URL = mockGetNewsFn.mock.calls[0][0];
      expect(actualUrl.searchParams.get('country')).toEqual(country);
    });
  });
});