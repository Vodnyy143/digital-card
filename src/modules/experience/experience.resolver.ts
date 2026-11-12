import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile } from '@modules/profile/models/profile.model';
import { ExperienceLoader } from '@modules/experience/experience.loader';
import { Experience } from '@modules/experience/models/experience.model';

@Resolver(() => Profile)
export class ExperienceResolver {
  constructor(private readonly experienceLoader: ExperienceLoader) {}

  @ResolveField(() => [Experience])
  experience(@Parent() profile: Profile) {
    return this.experienceLoader.byProfileId.load(profile.id);
  }
}
