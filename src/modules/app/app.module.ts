import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { PrismaModule } from '@infra/prisma/prisma.module';
import { EnvModule } from '@infra/env/env.module';
import { SeedModule } from '@infra/seed/seed.module';
import { ProfileModule } from '@modules/profile/profile.module';
import { SkillsModule } from '@modules/skills/skills.module';
import { ExperienceModule } from '@modules/experience/experience.module';
import { ProjectsModule } from '@modules/projects/projects.module';

type ApolloPlugin = NonNullable<ApolloDriverConfig['plugins']>[number];

const sandboxPlugin = ApolloServerPluginLandingPageLocalDefault({
  embed: true,
}) as unknown as ApolloPlugin;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EnvModule,
    PrismaModule,
    SeedModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
      playground: false,
      plugins: [sandboxPlugin],
    }),
    ProfileModule,
    SkillsModule,
    ExperienceModule,
    ProjectsModule,
  ],
})
export class AppModule {}
