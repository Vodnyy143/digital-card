import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Experience } from '@modules/experience/models/experience.model';
import { ExperienceService } from '@modules/experience/experience.service';

@Injectable({ scope: Scope.REQUEST })
export class ExperienceLoader {
  readonly byProfileId = new DataLoader<string, Experience[]>((profileIds) =>
    this.experienceService.findByProfileIds(profileIds),
  );

  constructor(private readonly experienceService: ExperienceService) {}
}
