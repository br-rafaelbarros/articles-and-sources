import { CityTaxes, GasStationRepositoryMock, STATES_TAXES, Taxes as TaxesGeneric } from "../gas-station.repository-mock"
import { ITaxes } from "./taxes.interface"

export class StateTaxesService implements ITaxes {

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

    const cityTaxes: CityTaxes = this.repository.getCityByName(this.cityName)

    const stateTaxes: TaxesGeneric<STATES_TAXES> = this.repository.getStateTaxes(cityTaxes.state) as TaxesGeneric<STATES_TAXES>

    let amountTax: number = 0

    stateTaxes.forEach((value: number) => {
      amountTax += this.amountValue * value
    })

    if (amountTax <= 0) {
      throw new Error('State taxes not found')
    }

    return amountTax

  }

}