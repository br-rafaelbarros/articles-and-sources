import { GasStationService } from "./gas-station.service";

describe('GasStationService', () => {

  describe('calcFinalProductPrice', () => {

    it('should calc amount tax', () => {

      const gasStationService = new GasStationService()

      const amountTax = gasStationService.calcFinalProductPrice({
        cityName: 'São Paulo',
        paymentType: 'Cash',
        productName: 'GASOLINA_COMUM',
        productPrice: 100,
      })

      expect(amountTax).toBe(973)
    })

  })

})