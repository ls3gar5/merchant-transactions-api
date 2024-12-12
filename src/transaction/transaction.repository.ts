import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from 'axios';
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { Transaction } from "./entities/transaction.entity";

@Injectable()
export class TransactionRepository {
    private axiosInstance: AxiosInstance;
    constructor() {

        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:8080',
            timeout: 5000,
            headers: {
              'Content-Type': 'application/json'
            }
          });
    }

    async getTransactions(): Promise<string[]> {
      try {
        const response = await this.axiosInstance.get('/transactions');
        return response.data;
      } catch (error) {
        throw new Error('Service not working');
      }
    }

    async getReceivables(): Promise<string[]> {
      const response = await this.axiosInstance.get('/receivables');
      return response.data;
  }

   async postNewTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
      const response = await this.axiosInstance.post('/transactions', createTransactionDto);

      return response.data
    
   }
}