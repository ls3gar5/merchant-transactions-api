import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { NumeratorRepository } from './numerator.repository';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository, NumeratorRepository],
})
export class TransactionModule {}
