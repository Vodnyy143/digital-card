import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { groupByKey } from '@/common/utils/group-by-key';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfileIds(profileIds: readonly string[]) {
    const items = await this.prisma.experience.findMany({
      where: {
        profileId: { in: [...profileIds] },
      },
      orderBy: { startDate: 'desc' },
    });

    return groupByKey(items, 'profileId', profileIds);
  }
}
