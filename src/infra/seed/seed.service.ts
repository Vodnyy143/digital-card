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
                name: 'EngLab - backend платформы для репетиторов',
                description:
                  'Серверная часть платформы онлайн-занятий на NestJS, Prisma и PostgreSQL. ' +
                  'Спроектировал базу данных, реализовал кабинеты администратора, преподавателя и студента, ' +
                  'приём оплаты через ЮMoney и создание ссылок на онлайн-конференции в Яндекс Телемосте.',
                url: null,
              },
              {
                name: 'Global Access - система мониторинга цен для промышленных рынков',
                description:
                  'Внутренняя система компании: постановка задач руководителями и контроль исполнения, ' +
                  'управление сотрудниками, компаниями и филиалами, выгрузка отчётов в PDF и Excel. ' +
                  'Цены (среднеоптовые, прайсовые, базовые) на молоко, яйца и другие продукты обновляются на экране ' +
                  'в реальном времени через WebSocket. Участвовал в проектировании БД, где характеристики ' +
                  'товаров хранятся по паттерну EAV. Код закрыт.',
                url: null,
              },
              {
                name: 'void-today',
                description:
                  'Дипломный проект. Веб-платформа управления задачами и проектами с организациями, отделами, ' +
                  'ролевой моделью и системой приглашений. NestJS, Prisma, React, Redux Toolkit.',
                url: 'https://github.com/Vodnyy143/void-today',
              },
              {
                name: 'my-hobbies-bot',
                description:
                  'Telegram-бот для хобби и привычек. Где можно создать привычку включить напоминание, и бот напоминает о ней. ' +
                  'Учебный проект на работу с командами бота.',
                url: 'https://github.com/Vodnyy143/my-hobbies-bot',
              },
            ],
          },
        },
      });
    });

    this.logger.log('Database seeded');
  }
}
