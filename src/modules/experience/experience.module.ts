import { Module } from '@nestjs/common';
import { PrismaModule } from '@infra/prisma/prisma.module';
import { ExperienceService } from '@modules/experience/experience.service';
import { ExperienceLoader } from '@modules/experience/experience.loader';
import { ExperienceResolver } from '@modules/experience/experience.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ExperienceService, ExperienceLoader, ExperienceResolver],
})
export class ExperienceModule {}
