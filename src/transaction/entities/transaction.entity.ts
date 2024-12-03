import { IsIn, IsNotEmpty, IsOptional, MaxLength } from "class-validator"

export enum Card {
    DEBIT_CARD = 'DEBIT_CARD',
    CREDIT_CARD = 'CREDIT_CARD',
  }

export class Transaction {
    id: string
    totalAmount: number
    @IsOptional()
    description: string
    @IsIn([Card.CREDIT_CARD, Card.DEBIT_CARD])
    payment: Card
    @IsNotEmpty()
    cardNumber: number
    @IsNotEmpty()
    cardHolder: string
    @IsNotEmpty()
    cardExp: Date
    @IsNotEmpty()
    @MaxLength(3)
    cardCvv: number
}
