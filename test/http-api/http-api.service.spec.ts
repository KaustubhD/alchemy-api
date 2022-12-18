import { HttpService } from "@nestjs/axios";
import { CACHE_MANAGER } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { Cache } from "cache-manager";
import { of } from "rxjs";
import { URL } from "url";
import { HttpApiService } from "../../src/http-api/http-api.service";


describe('Http api service', () => {
  const oldEnv = process.env;
  let httpApiService: HttpApiService;
  let mockHttpService: Partial<HttpService>;
  let mockCacheManager: Partial<Cache>;
  
  beforeEach(async () => {
    process.env = {
      NEWS_API_KEY: 'key-1',
      WEATHER_API_KEY: 'key-2',
    };
    mockHttpService = {
      get:  jest.fn().mockReturnValue(of({ data: 'response' })),
    };
    mockCacheManager = {
      get: jest.fn(),
      set: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
        providers: [
          HttpApiService,
          {
            provide: HttpService,
            useValue: mockHttpService,
          },
          {
            provide: CACHE_MANAGER,
            useValue: mockCacheManager,
          },
        ],
      }).compile();

    httpApiService = moduleRef.get<HttpApiService>(HttpApiService);
  });

  afterAll(() => {
    process.env = oldEnv;
  });

  describe('GetNews()', () => {
    test('Should set apiKey param', async () => {
      const url = new URL('http://sample-url.com');
      const urlSpy = jest.spyOn(mockHttpService, 'get');
      
      await httpApiService.getNews(url);

      const actualUrl = new URL(urlSpy.mock.calls[0][0] as string);
      expect(actualUrl.searchParams.has('apiKey')).toBe(true);
      expect(actualUrl.searchParams.get('apiKey')).toEqual('key-1');
    });
  });

  describe('GetWeatherForecast()', () => {
    test('Should set apiKey param', async () => {
      const url = new URL('http://sample-url.com');
      const urlSpy = jest.spyOn(mockHttpService, 'get');
      
      await httpApiService.getWeatherForecast(url);

      const actualUrl = new URL(urlSpy.mock.calls[0][0] as string);
      expect(actualUrl.searchParams.has('appid')).toBe(true);
      expect(actualUrl.searchParams.get('appid')).toBe('key-2');
    });
  });

  describe('InvokeApi()', () => {
    test('Should set apiKey param', async () => {
      const expectedUrl = new URL('http://sample-url.com?q=abc');
      const urlSpy = jest.spyOn(mockHttpService, 'get');
      
      await httpApiService.invokeApi(expectedUrl);

      const actualUrl = urlSpy.mock.calls[0][0];
      expect(actualUrl).toEqual(expectedUrl.toString());
    });

    test('Should call api if cache value is not present', async () => {
      const expectedUrl = new URL('http://sample-url.com?q=abc');
      jest.spyOn(mockCacheManager, 'get').mockResolvedValue(undefined);
      const urlSpy = jest.spyOn(mockHttpService, 'get');
      
      await httpApiService.invokeApi(expectedUrl);

      expect(urlSpy).toHaveBeenCalled();
    });

    test('Should set the value if cache value is not present', async () => {
      const expectedUrl = new URL('http://sample-url.com?q=abc');
      jest.spyOn(mockCacheManager, 'get').mockResolvedValue(undefined);
      const setCacheSpy = jest.spyOn(mockCacheManager, 'set');
      
      await httpApiService.invokeApi(expectedUrl);

      expect(setCacheSpy).toHaveBeenCalled();
    });
    
    test('Should not call api if cache value is present', async () => {
      const expectedUrl = new URL('http://sample-url.com?q=abc');
      jest.spyOn(mockCacheManager, 'get').mockResolvedValue('mock response');
      const urlSpy = jest.spyOn(mockHttpService, 'get');
      
      await httpApiService.invokeApi(expectedUrl);

      expect(urlSpy).not.toHaveBeenCalled();
    });

    test('Should check same cache key for same url', async () => {
      const expectedUrl = new URL('http://sample-url.com?q=abc');
      const getCacheSpy = jest.spyOn(mockHttpService, 'get');
      
      await httpApiService.invokeApi(expectedUrl);
      await httpApiService.invokeApi(expectedUrl);

      const firstCallArg = getCacheSpy.mock.calls[0][0];
      const secondCallArg = getCacheSpy.mock.calls[1][0];
      expect(firstCallArg).toEqual(secondCallArg);
    });
  });
});