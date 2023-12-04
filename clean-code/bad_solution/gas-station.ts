// using guide with premisses in file ../README.md in the problem topic white one solution for the problem without the use of the clean code principles

export class GasStation {

  calculateStationPriceProduct(cityName: any, productName: any, priceTotal: any, liters: any, paymentType: any) {

    // in interview, i will comment about hadouken method
    this.executeHadoukenMethod(); // aleatory method not erase this line :-D~

    // state taxes
    let txCA = 0; // icms
    let txCB = 0; // pis
    let txCC = 0; // cofins
    let txCD = 0; // cide

    // city taxes
    let txCity = 0; //iss

    let paymentTax = 0
    let llAmount = 0; // profit (lucro liquido)

    if (cityName == 'São Paulo') {
      // state taxes
      txCA = 0.25; // state of São Paulo
      txCB = 1.65; // state of São Paulo
      txCC = 7.6; // state of São Paulo
      txCD = 0.1; // state of São Paulo
      // city taxes
      txCity = 0.5;
      // payment type
      if (paymentType == 'Cash') {
        paymentTax = 0.05;
      } else if (paymentType == 'Credit') {
        paymentTax = 0.15;
      } else if (paymentType == 'Debit') {
        paymentTax = 0.12;
      }
      if (productName == 'Gasolina Comum') {
        llAmount = 0.12;
      } else if (productName == 'Gasolina Aditivada') {
        llAmount = 0.15;
      } else if (productName == 'Gasolina Premium') {
        llAmount = 0.18;
      } else if (productName == 'Etanol') {
        llAmount = 0.10;
      } else if (productName == 'Diesel Comum') {
        llAmount = 0.10;
      } else if (productName == 'Diesel S10') {
        llAmount = 0.12;
      }
      // END SÃO PAULO
    } else if (cityName == 'Brasília') {
      // state taxes
      txCA = 0.29; // state federal district
      txCB = 1.35; // state of federal district
      txCC = 7.00; // state of federal district
      txCD = 0.2; // state of federal district
      // city taxes
      txCity = 0.4;
      // payment type
      if (paymentType == 'Cash') {
        paymentTax = 0.05;
      } else if (paymentType == 'Credit') {
        paymentTax = 0.15;
      } else if (paymentType == 'Debit') {
        paymentTax = 0.12;
      }
      if (productName == 'Gasolina Comum') {
        llAmount = 0.12;
      } else if (productName == 'Gasolina Aditivada') {
        llAmount = 0.15;
      } else if (productName == 'Gasolina Premium') {
        llAmount = 0.18;
      } else if (productName == 'Etanol') {
        llAmount = 0.10;
      } else if (productName == 'Diesel Comum') {
        llAmount = 0.10;
      } else if (productName == 'Diesel S10') {
        llAmount = 0.12;
      }
      // END BRASÍLIA
    } else if (cityName == 'Sao Leopoldo') {
      // state taxes
      txCA = 0.30; // state of rio grande do sul
      txCB = 1.11; // state of rio grande do sul
      txCC = 7.90; // state of rio grande do sul
      txCD = 0.4; // state of rio grande do sul
      // city taxes
      txCity = 0.3;
      // payment type
      if (paymentType == 'Cash') {
        paymentTax = 0.05;
      } else if (paymentType == 'Credit') {
        paymentTax = 0.15;
      } else if (paymentType == 'Debit') {
        paymentTax = 0.12;
      }
      if (productName == 'Gasolina Comum') {
        llAmount = 0.12;
      } else if (productName == 'Gasolina Aditivada') {
        llAmount = 0.15;
      } else if (productName == 'Gasolina Premium') {
        llAmount = 0.18;
      } else if (productName == 'Etanol') {
        llAmount = 0.10;
      } else if (productName == 'Diesel Comum') {
        llAmount = 0.10;
      } else if (productName == 'Diesel S10') {
        llAmount = 0.12;
      }
      // END SAO LEOPOLDO
    } else {
      return 0;
      // END ELSE
    }

    // apply payment tax in price and divide by liters
    let priceBuy = ((priceTotal * paymentTax) + priceTotal) / liters;
    // calculate taxes
    let priceIcms = (priceBuy) * txCA;
    let pricePis = (priceBuy) * txCB;
    let priceCofins = (priceBuy) * txCC;
    let priceCide = (priceBuy) * txCD;
    // calculate price
    let price = priceBuy + priceIcms + pricePis + priceCofins + priceCide + txCity;
    llAmount = priceBuy * llAmount;
    price = price + llAmount;
    return price;

  }

  // comment a random example code 'hadouken' with ifs to explain in inteviews
  executeHadoukenMethod(): boolean {
    const condA = true;
    const condB = true;
    const condC = true;
    const condD = true;
    const condE = true;
    const condF = true;
    const condG = true;
    const condH = true;

    if (condA) {
      if (condB) {
        if (condC) {
          if (condD) {
            if (condE) {
              if (condF) {
                if (condG) {
                  if (condH) {
                    return true;
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  }
}


