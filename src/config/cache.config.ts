import { CacheModuleOptions } from "@nestjs/common";

export const cacheConfig: CacheModuleOptions<Record<string, any>> = {
  ttl: 600,
};