import { CacheModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpApiService } from './http-api.service';
import { cacheConfig } from '../config/cache.config';

@Module({
  providers: [HttpApiService],
  imports: [
    HttpModule,
    CacheModule.register(cacheConfig),
  ],
  exports: [HttpApiService],
})
export class HttpApiModule {}
