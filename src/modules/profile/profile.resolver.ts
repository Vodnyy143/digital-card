import { ProfileService } from '@modules/profile/profile.service';
import { Profile } from '@modules/profile/models/profile.model';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { description: 'Профиль владельца визитки' })
  profile() {
    return this.profileService.getProfile();
  }
}
