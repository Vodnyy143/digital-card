import { PrismaPg } from '@prisma/adapter-pg';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@generated/client';
import { EnvService } from '@infra/env/env.service';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(envService: EnvService) {
    const adapter = new PrismaPg({
      connectionString: envService.get('DATABASE_URL'),
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
