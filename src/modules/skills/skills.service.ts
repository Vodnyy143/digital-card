import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { groupByKey } from '@/common/utils/group-by-key';

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByProfileIds(profileIds: readonly string[]) {
    const skills = await this.prisma.skill.findMany({
      where: {
        profileId: { in: [...profileIds] },
      },
      orderBy: { id: 'asc' },
    });

    return groupByKey(skills, 'profileId', profileIds);
  }
}
