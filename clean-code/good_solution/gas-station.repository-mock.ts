
export enum CITIES_WITH_STATIONS {
  SAO_PAULO = 'São Paulo',
  BRASILIA = 'Brasília',
  PORTO_ALEGRE = 'Porto Alegre'
}


export enum STATES_WITH_STATIONS {
  SAO_PAULO = 'São Paulo',
  DISTRICT_FEDERAL = 'Brasília',
  RIO_GRANDE_DO_SUL = 'Rio Grande do Sul'
}

export enum STATES_TAXES {
  ICMS = 'ICMS',
  PIS = 'PIS',
  COFINS = 'COFINS',
  CIDE = 'CIDE'
}

export enum CITY_TAXES {
  ISS = 'ISS'
}

export type Taxes<T> = Map<T, number>


export type CityTaxes = {
  name: CITIES_WITH_STATIONS
  state: STATES_WITH_STATIONS
  taxes: Taxes<CITY_TAXES>
}

export const mapCityPercentTaxes: Map<CITIES_WITH_STATIONS, CityTaxes> = new Map([
  [CITIES_WITH_STATIONS.SAO_PAULO, {
    name: CITIES_WITH_STATIONS.SAO_PAULO,
    state: STATES_WITH_STATIONS.SAO_PAULO,
    taxes: new Map([[CITY_TAXES.ISS, 0.5]])

  }],
  [CITIES_WITH_STATIONS.BRASILIA, {
    name: CITIES_WITH_STATIONS.BRASILIA,
    state: STATES_WITH_STATIONS.DISTRICT_FEDERAL,
    taxes: new Map([[CITY_TAXES.ISS, 0.4]])

  }],
  [CITIES_WITH_STATIONS.PORTO_ALEGRE, {
    name: CITIES_WITH_STATIONS.PORTO_ALEGRE,
    state: STATES_WITH_STATIONS.RIO_GRANDE_DO_SUL,
    taxes: new Map([[CITY_TAXES.ISS, 0.6]])

  }]
])

export const mapStatePercentTaxes: Map<STATES_WITH_STATIONS, Taxes<STATES_TAXES>> =
  new Map([
    [STATES_WITH_STATIONS.SAO_PAULO, new Map([
      [STATES_TAXES.ICMS, 0.25],
      [STATES_TAXES.PIS, 1.65],
      [STATES_TAXES.COFINS, 7.6],
      [STATES_TAXES.CIDE, 0.1]
    ])
    ],
    [STATES_WITH_STATIONS.DISTRICT_FEDERAL, new Map([
      [STATES_TAXES.ICMS, 0.29],
      [STATES_TAXES.PIS, 1.35],
      [STATES_TAXES.COFINS, 7.0],
      [STATES_TAXES.CIDE, 0.2]
    ])
    ],
    [STATES_WITH_STATIONS.RIO_GRANDE_DO_SUL, new Map([
      [STATES_TAXES.ICMS, 0.3],
      [STATES_TAXES.PIS, 1.65],
      [STATES_TAXES.COFINS, 7.6],
      [STATES_TAXES.CIDE, 0.1]
    ])
    ]
  ])



export class GasStationRepositoryMock {

  public getCityTaxes(city: CITIES_WITH_STATIONS): CityTaxes {
    const cityReturn: CityTaxes = mapCityPercentTaxes.get(city) as CityTaxes
    if (!cityReturn) {
      throw new Error('City not found')
    }
    return cityReturn
  }

  public getStateTaxes(state: STATES_WITH_STATIONS): Taxes<STATES_TAXES> {
    const stateReturn: Taxes<STATES_TAXES> = mapStatePercentTaxes.get(state) as Taxes<STATES_TAXES>
    if (!stateReturn) {
      throw new Error('State not found')
    }
    return stateReturn
  }

  public getCityByName(cityName: string): CityTaxes {

    const city: CITIES_WITH_STATIONS = CITIES_WITH_STATIONS[cityName]
    const cityReturn = mapCityPercentTaxes.get(city)
    if (!cityReturn) {
      throw new Error('City not found')
    }
    return cityReturn
  }

  public getPaymentTaxes(paymentType: PAYMENT_TYPES): number {
    const paymentReturn = mapPaymentPercentTaxes.get(paymentType)
    if (!paymentReturn) {
      throw new Error('Payment type not found')
    }
    return paymentReturn
  }

  public getProfitProduct(product: string): number {
    return PercentProfitProducts[product]
  }

}

export enum PercentProfitProducts {
  GASOLINA_COMUM = 0.12,
  GASOLINA_ADITIVADA = 0.15,
  GASOLINA_PREMIUM = 0.18,
  ETANOL = 0.10,
  DIESEL_COMUM = 0.10,
  DIESEL_S10 = 0.12
}

export enum PAYMENT_TYPES {
  CASH = 'Cash',
  CREDIT = 'Credit',
  DEBIT = 'Debit'
}

export const mapPaymentPercentTaxes: Map<PAYMENT_TYPES, number> = new Map([
  [PAYMENT_TYPES.CASH, 0.05],
  [PAYMENT_TYPES.CREDIT, 0.15],
  [PAYMENT_TYPES.DEBIT, 0.12]
])
