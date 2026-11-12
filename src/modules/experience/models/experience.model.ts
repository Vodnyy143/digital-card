import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => ID)
  id!: string;

  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field(() => Date)
  startDate!: Date;

  @Field(() => Date, {
    nullable: true,
    description: 'null означает по настоящее время',
  })
  endDate?: Date | null;

  @Field(() => [String])
  achievements!: string[];
}
