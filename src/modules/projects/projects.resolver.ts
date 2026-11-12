import { Profile } from '@modules/profile/models/profile.model';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProjectsLoader } from '@modules/projects/projects.loader';
import { Project } from '@modules/projects/models/project.model';

@Resolver(() => Profile)
export class ProjectsResolver {
  constructor(private readonly projectsLoader: ProjectsLoader) {}

  @ResolveField(() => [Project])
  projects(@Parent() profile: Profile) {
    return this.projectsLoader.byProfileId.load(profile.id);
  }
}
