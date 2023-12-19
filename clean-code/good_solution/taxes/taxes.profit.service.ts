import { GasStationRepositoryMock } from "../gas-station.repository-mock"
import { ITaxes } from "./taxes.interface"

export class ProfitTaxesService implements ITaxes {

  amountValue: number
  productName: string
  repository: GasStationRepositoryMock

  constructor(
    productName: string,
    amountValue: number
  ) {
    this.productName = productName
    this.amountValue = amountValue
    this.repository = new GasStationRepositoryMock()
  }

  calcAmountTax(): number {

    let amountTax: number = 0

    const profitPercent: number = this.repository.getProfitProduct(this.productName)
    if (!profitPercent) {
      throw new Error('Product not found')
    }

    amountTax = this.amountValue * profitPercent

    if (amountTax <= 0) {
      throw new Error('Product profit price invalid')
    }

    return amountTax

  }

}