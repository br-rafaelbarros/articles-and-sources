
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
    taxes: new Map([[CITY_TAXES.ISS, 0.05]])

  }],
  [CITIES_WITH_STATIONS.BRASILIA, {
    name: CITIES_WITH_STATIONS.BRASILIA,
    state: STATES_WITH_STATIONS.DISTRICT_FEDERAL,
    taxes: new Map([[CITY_TAXES.ISS, 0.04]])

  }],
  [CITIES_WITH_STATIONS.PORTO_ALEGRE, {
    name: CITIES_WITH_STATIONS.PORTO_ALEGRE,
    state: STATES_WITH_STATIONS.RIO_GRANDE_DO_SUL,
    taxes: new Map([[CITY_TAXES.ISS, 0.06]])

  }]
])

export const mapStatePercentTaxes: Map<STATES_WITH_STATIONS, Taxes<STATES_TAXES>> =
  new Map([
    [STATES_WITH_STATIONS.SAO_PAULO, new Map([
      [STATES_TAXES.ICMS, 0.25],
      [STATES_TAXES.PIS, 1.65],
      [STATES_TAXES.COFINS, 7.6],
      [STATES_TAXES.CIDE, 0.01]
    ])
    ],
    [STATES_WITH_STATIONS.DISTRICT_FEDERAL, new Map([
      [STATES_TAXES.ICMS, 0.29],
      [STATES_TAXES.PIS, 1.35],
      [STATES_TAXES.COFINS, 7.0],
      [STATES_TAXES.CIDE, 0.02]
    ])
    ],
    [STATES_WITH_STATIONS.RIO_GRANDE_DO_SUL, new Map([
      [STATES_TAXES.ICMS, 0.03],
      [STATES_TAXES.PIS, 1.65],
      [STATES_TAXES.COFINS, 7.6],
      [STATES_TAXES.CIDE, 0.01]
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

    const cityFound: CITIES_WITH_STATIONS | undefined = Object.values(CITIES_WITH_STATIONS).find(city => city === cityName)

    if (!cityFound) {
      throw new Error('City not found')
    }

    const cityReturn = mapCityPercentTaxes.get(cityFound)
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
    const productObject = Object.values(PERCENT_PROFIT_PRODUCT).find(product => product === product)
    if (!productObject) {
      throw new Error('Product not found')
    }
    const percentProfitReturn = mapProductPercentTaxes.get(productObject)
    if (!percentProfitReturn) {
      throw new Error('Product not found')
    }
    return percentProfitReturn
  }

}

export enum PERCENT_PROFIT_PRODUCT {
  GASOLINA_COMUM = 'gasolina comum',
  GASOLINA_ADITIVADA = 'gasolina aditivada',
  GASOLINA_PREMIUM = 'gasolina premium',
  ETANOL = 'etanol',
  DIESEL_COMUM = 'diesel comum',
  DIESEL_S10 = 'diesel s10'
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

export const mapProductPercentTaxes: Map<PERCENT_PROFIT_PRODUCT, number> = new Map([
  [PERCENT_PROFIT_PRODUCT.GASOLINA_COMUM, 0.12],
  [PERCENT_PROFIT_PRODUCT.GASOLINA_ADITIVADA, 0.15],
  [PERCENT_PROFIT_PRODUCT.GASOLINA_PREMIUM, 0.18],
  [PERCENT_PROFIT_PRODUCT.ETANOL, 0.10],
  [PERCENT_PROFIT_PRODUCT.DIESEL_COMUM, 0.10],
  [PERCENT_PROFIT_PRODUCT.DIESEL_S10, 0.12]
])
