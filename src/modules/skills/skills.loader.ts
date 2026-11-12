import { Injectable } from '@nestjs/common';
import { SkillsService } from '@modules/skills/skills.service';
import DataLoader from 'dataloader';
import { Skill } from '@modules/skills/models/skill.model';

@Injectable()
export class SkillsLoader {
  readonly byProfileId = new DataLoader<string, Skill[]>((profileIds) =>
    this.skillsService.findByProfileIds(profileIds),
  );

  constructor(private readonly skillsService: SkillsService) {}
}
