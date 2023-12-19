import { CityTaxes, GasStationRepositoryMock } from "../gas-station.repository-mock"
import { ITaxes } from "./taxes.interface"

export class CityTaxesService implements ITaxes {

  repository: GasStationRepositoryMock
  amountValue: number
  cityName: string

  constructor(
    cityName: string,
    amountValue: number
  ) {
    this.cityName = cityName
    this.amountValue = amountValue
    this.repository = new GasStationRepositoryMock()
  }

  calcAmountTax(): number {

    const city: CityTaxes = this.repository.getCityByName(this.cityName)
    const cityTaxes: CityTaxes = this.repository.getCityTaxes(city.name)

    let amountTax: number = 0

    cityTaxes.taxes.forEach((value: number) => {
      amountTax += this.amountValue * value
    })

    if (amountTax <= 0) {
      throw new Error('City not found')
    }

    return amountTax

  }

}