import { Injectable, Scope } from '@nestjs/common';
import { ProjectsService } from '@modules/projects/projects.service';
import DataLoader from 'dataloader';
import { Project } from '@modules/projects/models/project.model';

@Injectable({ scope: Scope.REQUEST })
export class ProjectsLoader {
  readonly byProfileId = new DataLoader<string, Project[]>((profileIds) =>
    this.projectsService.findByProfileIds(profileIds),
  );

  constructor(private readonly projectsService: ProjectsService) {}
}
