import { Module } from '@nestjs/common';
import { ProfileService } from '@modules/profile/profile.service';
import { ProfileResolver } from '@modules/profile/profile.resolver';
import { PrismaModule } from '@infra/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProfileResolver, ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
