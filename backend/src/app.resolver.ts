import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String, { description: 'GraphQL sunucu sağlık kontrolü' })
  health(): string {
    return 'ok';
  }
}
