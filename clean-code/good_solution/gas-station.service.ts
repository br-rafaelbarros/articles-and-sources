import { CityTaxesService, PaymentTypeTaxesService, ProfitTaxesService, StateTaxesService } from "./taxes"

export type CalcFinalProductPriceDTO = {
  cityName: string,
  paymentType: string,
  product: string,
  productPrice: number,
}

export class GasStationService {

  public calcFinalProductPrice(payload: CalcFinalProductPriceDTO): number {

    const taxesServiceList: ITaxes[] = [
      new CityTaxesService(payload.cityName, payload.productPrice),
      new StateTaxesService(payload.cityName, payload.productPrice),
      new PaymentTypeTaxesService(payload.paymentType, payload.productPrice),
      new ProfitTaxesService(payload.product, payload.productPrice),
    ]

    let finalPrice: number = taxesServiceList.reduce((acc: number, taxesService: ITaxes) => {
      return acc + taxesService.calcAmountTax()
    }, 0)

    return finalPrice
  }
}