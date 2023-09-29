import { Module } from '@nestjs/common';
import { TypeServiceService } from './services/type-service/type-service.service';
import { TypeServiceController } from './controllers/type-service/type-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeService } from 'src/entities/type-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeService])],
  providers: [TypeServiceService],
  controllers: [TypeServiceController]
})
export class TypeServiceModule {}
