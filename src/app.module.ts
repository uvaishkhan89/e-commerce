import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ".env",
      })],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        //entities: ['dist/**/*.entity.{ts,js}'],
        autoLoadEntities: true,
        //entities:[User,Product],// when ever its run on server. so it is mandatory
        logging: true
      }),
      inject: [ConfigService]
    }),
    UserModule,
    ProductModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
