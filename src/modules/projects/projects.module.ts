import { Module } from '@nestjs/common';
import { PrismaModule } from '@infra/prisma/prisma.module';
import { ProjectsService } from '@modules/projects/projects.service';
import { ProjectsLoader } from '@modules/projects/projects.loader';
import { ProjectsResolver } from '@modules/projects/projects.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ProjectsService, ProjectsLoader, ProjectsResolver],
})
export class ProjectsModule {}
