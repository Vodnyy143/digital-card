# Цифровая визитка

GraphQL API, который показывает меня как специалиста. В нем представлены навыки, опыт работы и проекты. Данные доступны через Apollo Sandbox.

- Демо: http://localhost:5000/graphql
- Исходный код: https://github.com/Vodnyy143/digital-card

## Стэк

TypeScript, Node.js, NestJS, GraphQL, PrismaORM, PostgreSQL, Docker, Git, pnpm.

## Старт

### Через Docker

```bash
cp .env.example .env
docker compose up --build
```

Поднимаются PostgreSQL и приложение. При старте автоматически применяются миграции и заполняется база. После запуска откройте Apollo Sandbox:
<http://localhost:5000/graphql>.

### Локально

Нужны Node.js 20+, pnpm и запущенный PostgreSQL.

```bash
cp .env.example .env
docker compose up -d
pnpm install
pnpm prisma migrate dev
pnpm prisma generate
pnpm start:dev
```

### Переменные окружения

- DATABASE_URL - строка подключения к PostgreSQL.
- PORT - порт приложения.

Значения проверяются при старте (`src/infra/env`): при ошибке приложение падает сразу с понятным сообщением.

## Пример запроса

```graphql
query {
  profile {
    name
    description
    github
    linkedin
    skills { name }
    experience {
      company
      position
      startDate
      endDate
      achievements
    }
    projects { name description url }
  }
}
```

## Структура проекта

```
prisma/
├── schema.prisma
└── migrations/
src/
├── common/utils/           # общие утилиты (groupByKey)
├── infra/
│   ├── env/                # валидация переменных окружения
│   ├── prisma/             # PrismaModule и PrismaService
│   └── seed/               # заполнение БД при запуске
├── modules/
│   ├── app/                # корневой модуль, настройка GraphQL
│   ├── profile/            # запрос profile
│   ├── skills/             # поле profile.skills
│   ├── experience/         # поле profile.experience
│   └── projects/           # поле profile.projects
└── main.ts
```

Каждый предметный модуль устроен одинаково:

```
models/*.model.ts   GraphQL-тип
*.service.ts        работа с данными через Prisma
*.loader.ts         DataLoader 
*.resolver.ts       обращение к лоадеру
*.module.ts         объединение в модуль     
```

## Архитектурные решения

**Разделение ответственности.** Resolver знает только про GraphQL (аргументы и поля), service отвечает за данные и обращается к БД через Prisma, `infra` содержит техническую обвязку, `modules` предметную логику. Зависимости направлены в одну сторону: модули используют инфраструктуру, но не наоборот. Это позволяет менять хранилище или схему API независимо и тестировать service без GraphQL.

**Code-first GraphQL.** Схема строится из TypeScript-классов и декораторов, поэтому типы и схема не расходятся. Чтобы схему можно было прочитать без запуска, сгенерированный `schema.gql` лежит в репозитории.

**Вложенные данные и оптимизация запросов.** Связи `skills`, `experience` и `projects` резолвятся отдельными `@ResolveField` в своих модулях. Запросы к БД выполняются только для тех полей, которые запросил клиент. Загрузка идёт через DataLoader: все обращения за один тик объединяются в один запрос `WHERE profileId IN (...)`. Поэтому число запросов к БД не растёт с числом профилей (1 + 3 вместо 1 + 3N). Loader создаётся на каждый GraphQL-запрос (`Scope.REQUEST`), чтобы кэш не пересекался между запросами; цена этого решения в том, что связанные резолверы тоже становятся request-scoped.

*Честное замечание:* профиль в визитке один, поэтому при текущих данных loader не уменьшает число запросов по сравнению с обычным `findMany`. Он нужен как основа, которая не превращается в N+1, если профилей станет несколько.

**Инициализация БД.** `SeedService` выполняется в `OnModuleInit` и заполняет базу в одной транзакции: данные либо заполнены полностью, либо не изменились. Перед созданием профиль удаляется, связанные записи удаляются каскадом, поэтому правка данных в сиде применяется при следующем запуске. Минус: `id` меняются при каждом старте, для read-only API это не критично. Миграции применяются командой `prisma migrate deploy` при запуске контейнера, так что поднять проект с нуля можно одной командой.
 