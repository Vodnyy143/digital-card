import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile } from '@modules/profile/models/profile.model';
import { SkillsLoader } from '@modules/skills/skills.loader';
import { Skill } from '@modules/skills/models/skill.model';

@Resolver(() => Profile)
export class SkillsResolver {
  constructor(private readonly skillsLoader: SkillsLoader) {}

  @ResolveField(() => [Skill])
  skills(@Parent() profile: Profile) {
    return this.skillsLoader.byProfileId.load(profile.id);
  }
}
