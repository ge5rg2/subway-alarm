import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubwayController } from './subway.controller';
import { SubwayService } from './subway.service';

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [SubwayController],
  providers: [SubwayService],
  exports: [SubwayService],
})
export class SubwayModule {}