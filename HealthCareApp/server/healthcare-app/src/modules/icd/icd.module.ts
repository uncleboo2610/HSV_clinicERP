import { Module } from '@nestjs/common';
import { IcdService } from './services/icd/icd.service';
import { IcdController } from './controllers/icd/icd.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICD } from 'src/entities/ICD.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ICD])],
  providers: [IcdService],
  controllers: [IcdController]
})
export class IcdModule {}
