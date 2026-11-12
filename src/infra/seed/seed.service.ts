import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedProfile();
  }

  private async seedProfile() {
    await this.prisma.$transaction(async (tx) => {
      await tx.profile.deleteMany();

      await tx.profile.create({
        data: {
          name: 'Артём',
          description:
            'Backend-разработчик. Работаю с TypeScript, NestJS, Prisma и PostgreSQL, ' +
            'разворачиваю сервисы в Docker.',
          github: 'https://github.com/Vodnyy143',
          linkedin: null,
          skills: {
            create: [
              { name: 'TypeScript' },
              { name: 'NestJS' },
              { name: 'Prisma' },
              { name: 'PostgreSQL' },
              { name: 'GraphQL' },
              { name: 'Docker' },
              { name: 'Git' },
            ],
          },
          experience: {
            create: [
              {
                company: 'GlobalMonitoring',
                position: 'Backend разработчик',
                startDate: new Date('2025-05-23'),
                endDate: new Date('2026-10-15'),
                achievements: [
                  'Реализовал сервис сидирования для системы мониторинга пищевого производства на паттерне EAV, чтобы хранить гибкий набор атрибутов без изменения схемы БД',
                  'Спроектировал и разработал с нуля backend платформы для репетиторов на NestJS, Prisma и PostgreSQL',
                ],
              },
            ],
          },
          projects: {
            create: [
              {
                name: 'Backend платформы для репетиторов',
                description:
                  'Серверная часть образовательной платформы с нуля: NestJS, Prisma, PostgreSQL. Код закрыт.',
                url: null,
              },
              {
                name: 'Сервис сидирования для системы мониторинга пищевого производства',
                description:
                  'Заполнение данных на паттерне EAV с гибким набором атрибутов. Код закрыт.',
                url: null,
              },
            ],
          },
        },
      });
    });

    this.logger.log('Database seeded');
  }
}
