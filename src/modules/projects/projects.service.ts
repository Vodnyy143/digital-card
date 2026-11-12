import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { groupByKey } from '@/common/utils/group-by-key';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfileIds(profileIds: readonly string[]) {
    const items = await this.prisma.project.findMany({
      where: {
        profileId: { in: [...profileIds] },
      },
      orderBy: { id: 'asc' },
    });

    return groupByKey(items, 'profileId', profileIds);
  }
}
