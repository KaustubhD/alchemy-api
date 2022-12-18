import { Test, TestingModule } from '@nestjs/testing';
import { HttpApiService } from '../../src/http-api/http-api.service';
import { WeatherService } from '../../src/weather/weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  
  let mockHttpService: Partial<HttpApiService>;

  beforeEach(async () => {
    mockHttpService = {

    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: HttpApiService,
          useValue: mockHttpService,
        }
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
