import { EnvModule } from '@infra/env/env.module';
import { Module } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';

@Module({
  imports: [EnvModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
