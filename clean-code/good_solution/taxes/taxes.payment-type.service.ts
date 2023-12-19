import { GasStationRepositoryMock, PAYMENT_TYPES } from "../gas-station.repository-mock"

export class PaymentTypeTaxesService implements ITaxes {

  amountValue: number
  paymentType: string
  repository: GasStationRepositoryMock

  constructor(
    paymentType: string,
    amountValue: number
  ) {
    this.paymentType = paymentType
    this.amountValue = amountValue
    this.repository = new GasStationRepositoryMock()
  }

  calcAmountTax(): number {

    let amountTax: number = 0

    const paymentTypeValid: PAYMENT_TYPES = PAYMENT_TYPES[this.paymentType]
    if (!paymentTypeValid) {
      throw new Error('Payment type not found')
    }

    const percentPaymentType: number = this.repository.getPaymentTaxes(paymentTypeValid)
    if (!percentPaymentType) {
      throw new Error('Payment type not found')
    }

    amountTax = this.amountValue * percentPaymentType

    if (amountTax <= 0) {
      throw new Error('Payment type, product price invalid')
    }

    return amountTax

  }

}