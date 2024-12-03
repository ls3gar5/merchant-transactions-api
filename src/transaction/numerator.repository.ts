import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from 'axios';
import { throwError } from "rxjs";

@Injectable()
export class NumeratorRepository {
    private axiosInstance: AxiosInstance;
    constructor() {

        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3000',
            timeout: 5000,
            headers: {
              'Content-Type': 'application/json'
            }
          });
    }

    async getUniqueNumerator():Promise<string> {
        try {
            await this.axiosInstance.post('/numerator/lock');

            const response = await this.axiosInstance.get('/numerator');
            const newId = response.data.numerator + 1; 
            await this.axiosInstance.put('/numerator', { value: newId});
        
            await this.axiosInstance.delete('numerator/lock');

            return newId;

        } catch (error) {
            await  this.axiosInstance.delete('numerator/lock');
            throw new Error(error);
        }
    }

    async getUniqueNumeratorOptimistic():Promise<string> {
        try {
            const response = await this.axiosInstance.get('/numerator');
            const newId = response.data.numerator + 1; 
            
            await this.axiosInstance.put('numerator/test-and-set', { "oldValue": response.data.numerator, "newValue":  newId} )

            return newId;

        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll(): Promise<string[]> {
        const response = await this.axiosInstance.get('/transactions');
        return response.data;
    }
}