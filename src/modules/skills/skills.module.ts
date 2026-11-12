import { Module } from '@nestjs/common';
import { PrismaModule } from '@infra/prisma/prisma.module';
import { SkillsService } from '@modules/skills/skills.service';
import { SkillsLoader } from '@modules/skills/skills.loader';
import { SkillsResolver } from '@modules/skills/skills.resolver';

@Module({
  imports: [PrismaModule],
  providers: [SkillsService, SkillsLoader, SkillsResolver],
})
export class SkillsModule {}
