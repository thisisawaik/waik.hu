import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserModule } from './user/user.module';
import { DownloadsModule } from './downloads/downloads.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    UserModule,
    DownloadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '**', method: RequestMethod.ALL });
  }
}
