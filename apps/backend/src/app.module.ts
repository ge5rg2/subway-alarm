import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubwayModule } from './modules/subway/subway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SubwayModule,
  ],
})
export class AppModule {}
