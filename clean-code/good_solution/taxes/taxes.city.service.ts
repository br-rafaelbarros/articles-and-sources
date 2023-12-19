import { CITIES_WITH_STATIONS, CityTaxes, GasStationRepositoryMock } from "../gas-station.repository-mock"

export class CityTaxesService implements Taxes {

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

    const city: CITIES_WITH_STATIONS = CITIES_WITH_STATIONS[this.cityName]

    const cityTaxes: CityTaxes = this.repository.getCityTaxes(city)

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