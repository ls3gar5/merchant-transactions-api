import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from './transaction.repository';
import { NumeratorRepository } from './numerator.repository';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(private taskRepository: TransactionRepository, private numeratorRepository: NumeratorRepository) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    //1-  A unique ID created using Numerator API.
    const uniqueNumber:string  = await this.numeratorRepository.getUniqueNumeratorOptimistic();
    const trasacDto = {...createTransactionDto, id: uniqueNumber} as CreateTransactionDto;
    const result = this.taskRepository.postNewTransaction(trasacDto);
    return result;
  }

  findAll() {
    return this.taskRepository.getTransactions();
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
