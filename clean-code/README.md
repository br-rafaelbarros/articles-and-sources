
[![Brazilian Portuguese](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/32px-Flag_of_Brazil.svg.png) Leia em Protuguês BR](#o-problema)  | 
[![English](https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/32px-Flag_of_the_United_States.svg.png) Read in English US](#the-problem)


# The problem

* A Gas Station requires a system to manage the precification of its products based on  many factors.

* The point to based rules are:
  - Buy price from the supplier;
  - profit margin by product;
      - Gasoline Common: 12%
      - Gasoline Aditive: 15%
      - Gasoline Premium: 18%
      - Diesel Common: 10%
      - Diesel S10: 12%
      - Ethanol: 10%
  - Taxes by State:
      - Sao Paulo:
          - ICMS: 25%
          - PIS: 1.65%
          - COFINS: 7.6%
          - CIDE: 0.1%
      - Federal District:
          - ICMS: 29%
          - PIS: 1.35%
          - COFINS: 7.0%
          - CIDE: 0.2%
      - Rio Grande do Sul:
          - ICMS: 30%
          - PIS: 1.11%
          - COFINS: 7.9%
          - CIDE: 0.4%
  - Taxes by City:
      - Sao Paulo:
        - ISS: 5%
      - Brasilia:
        - ISS: 4%
      - São Leopolodo:
        - ISS: 3%
  - Taxes by Type of Payment:
     - Cash: 10%
     - Credit: 15%
     - Debit: 12%

* The price of last purchase is used to calculate are:
- Gasoline Common R$ 3.50 per liter
- Gasoline Aditive R$ 3.90 per liter
- Gasoline Premium R$ 4.10 per liter
- Diesel Common R$ 3.20 per liter
- Diesel S10 R$ 3.40 per liter
- Ethanol R$ 2.50 per liter

## Based on the rules above, create a system that calculates the price to sell of the products based on the purchase price and the rules above.
  


# About the solution

* The solution was developed in NodeJS, using NestJS framework, Typescript

#### Note: As the aim is to show clean code practices, no database connection or components that facilitate development will be used.

#
#
#
  

# O problema

* Um Posto de Gasolina necessita de um sistema para gerenciar a precificação de seus produtos com base em diversos fatores.

* O ponto base para regras são:
   - Preço de compra do fornecedor;
   - margem de lucro por produto;
       - Gasolina Comum: 12%
       - Aditivo Gasolina: 15%
       - Prêmio Gasolina: 18%
       - Diesel Comum: 10%
       - Diesel S10: 12%
       - Etanol: 10%
   - Impostos por Estado:
      - Sao Paulo:
          - ICMS: 25%
          - PIS: 1.65%
          - COFINS: 7.6%
          - CIDE: 0.1%
      - Distrito Federal:
          - ICMS: 29%
          - PIS: 1.65%
          - COFINS: 7.6%
          - CIDE: 0.1%
      - Rio Grande do Sul:
          - ICMS: 30%
          - PIS: 1.65%
          - COFINS: 7.6%
          - CIDE: 0.1%
  - Taxes by City:
      - Sao Paulo:
        - ISS: 5%
      - Brasília:
        - ISS: 4%
      - São Leopolodo:
        - ISS: 3%
  - Taxes by Type of Payment:
     - Cash: 10%
     - Credit: 15%
     - Debit: 12%

* O preço da última compra utilizado para calcular são:
- Gasolina Comum R$ 3,50 o litro
- Gasolina Aditiva R$ 3,90 o litro
- Gasolina Premium R$ 4,10 o litro
- Diesel Comum R$ 3,20 o litro
- Diesel S10 R$ 3,40 o litro
- Etanol R$ 2,50 por litro

## Baseado nas regras acima, crie um sistema que calcule o preço de venda dos produtos com base no preço de compra e nas regras acima.

# Sobre a solução

* A solução foi desenvolvida em NodeJS, utilizando framework NestJS, Typescript