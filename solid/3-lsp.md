


[![Brazilian Portuguese](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/32px-Flag_of_Brazil.svg.png) Leia em Protuguês BR](#princípio-de-substituição-de-liskov) | 
[![English](https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/32px-Flag_of_the_United_States.svg.png) Read in English US](#liskov-substitution-principle)


# Princípio de Substituição de Liskov

Caso queira seguir a sequência de estudos, leia o conteúdo do princípio SRP [clique aqui](./1-srp.md). Ou aproveite a leitura! 

O princípio de substituição de Liskov resumidamente diz que as classes derivadas devem ser substituíveis por suas classes bases. Isso significa que uma classe derivada deve ser capaz de substituir sua classe base sem quebrar o comportamento do programa. Um complemento dos fatores anteriores mas na minha opnião muito difícil de ser aplicado sem prejuízo de quebra de funcionametos do sistema se for aplicado após o sistema já estar em produção com uma certa maturidade, digo maturidade no contexto de tempo de evolução sem quebra de funcionalidades.
Para aplicar de uma forma bem implementada esse príncípio é necessário um nível de abstração de segregação de responsabilidades muito alto, para evitar refactors ou ajustes na estrutura no futuro.
mas no geral é de uma forma MUITO RASA, usar orientação a objetos, polimorfismo na sua exência.
Para fugir dos exemplos comuns de quadrado e retângulo encontrados em diversos artigos, vamos imaginar um cenário de uma aplicação de banco, onde temos uma classe ``Account`` que representa uma conta bancária, e uma classe ``Card`` que representa um cartão de crédito ou débito. A classe ``Card`` que pode ser de ``CREDIT`` ou ``DEBIT``. E a classe ``Account`` tem um método ``performDigitalDeposit`` que recebe um valor, apenas o cartão de crédito e realiza o depósito na conta. E temos um método ``performWithdraw`` que recebe um valor, o cartão de crédito ou débito e realiza o saque na conta. 
Entendendo esse contexto vamos imaginar que o desenvolvedor precisa implementar o método ``performDigitalDeposit`` e ``performWithdraw``.

- Agora vamos imaginar que o desenvolvedor conhece apenas os prncípios de single responsibility principle e open closed principle, e desenvolve o código da seguinte forma:
```java
public class Account {
    private BigDecimal balance;
    private Card card;

    public Account(BigDecimal balance, Card card) {
        this.balance = balance;
        this.card = card;
    }

    public void performDigitalDeposit(BigDecimal value) {
        if (card.getType().equals(CardType.CREDIT)) {
            balance = balance.add(value);
        } else {
            throw new RuntimeException("Invalid card type");
        }
    }

    public void performWithdraw(BigDecimal value) {
        if ([CardType.CREDIT, CardType.DEBIT].contains(card.getType())) {
            balance = balance.subtract(value);
        } else {
            throw new RuntimeException("Invalid card type");
        }
    }
}
```

Mesmo funcionando, esse código não está seguindo o princípio de substituição de Liskov, pois se utilizarmos a classe Card podemos chamar a funcionalidade de depósito digital, mesmo existindo a validação para impedir a conclusão da operação, o código não está seguindo o princípio de substituição de Liskov.

Para solucionar esse problema, podemos utilizar o princípio de substituição de Liskov, e criar uma classe abstrata ``Card`` e duas classes que herdam de ``Card`` que são ``CreditCard`` e ``DebitCard``. E assim podemos utilizar o polimorfismo para realizar a validação de tipo de cartão.

```java
public abstract class Card {
    private CardType type;

    public Card(CardType type) {
        this.type = type;
    }

    public CardType getType() {
        return type;
    }

    public void performWithdraw(BigDecimal value) {
        // do something
    }

}

public class CreditCard extends Card {
    public CreditCard() {
        super(CardType.CREDIT);
    }

    public void performDigitalDeposit(BigDecimal value) {
        // implement specific rules
    }

}

public class DebitCard extends Card {
    public DebitCard() {
        super(CardType.DEBIT);
    }

    public void performDigitalTransfer(BigDecimal value) {
        // implement specific rules
    }

}

public class AccountService {
    private BigDecimal balance;
    private Card card;

    public AccountService(BigDecimal balance, Card card) {
        this.balance = balance;
        this.card = card;
    }

    public void performDigitalDeposit(BigDecimal value) {
        if (card.getType().equals(CardType.CREDIT)) {
            DebitCard debitCartd = (DebitCard) card;
            debitCartd.performDigitalDeposit(value);
        } 
        if (card.getType().equals(CardType.DEBIT)) {
            CreditCard creditCard = (CreditCard) card;
            creditCard.performDigitalTransfer(value);
        }
    }

    public void performWithdraw(BigDecimal value) {
        Card card = this.card;
        card.performWithdraw(value);
    }
}
```

Como podemos ver, agora o código está seguindo o princípio de substituição de Liskov, pois a criação da classe abstrata ``Card`` e as classes ``CreditCard`` e ``DebitCard`` que herdam de ``Card``, permitem que o polimorfismo seja utilizado para realizar a validação e chamar o método correto de acordo com o tipo de cartão. Mesmo que um desenvolvedor novato na equipe, não conheça as regras de negócio, ele fará uma operação correspondente, e não conseguirá chamar o método ``performDigitalDeposit`` se o cartão for de débito, e a Classe `AccountService` conseguirá ser chamade de qualquer lugar do sistema, sem quebrar o comportamento do programa.

## Conclusão

O princípio de substituição de Liskov é um princípio muito importante, pois permite que o polimorfismo seja utilizado de forma correta, e evita que o comportamento do programa seja quebrado. Porém, é importante ressaltar que esse princípio deve ser utilizado com cautela, pois se utilizado de forma errada, pode causar problemas no comportamento do programa.

----

# ENGLISH

[![Brazilian Portuguese](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/32px-Flag_of_Brazil.svg.png) Leia em Protuguês BR](#princípio-de-substituição-de-liskov) | 
[![English](https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/32px-Flag_of_the_United_States.svg.png) Read in English US](#liskov-substitution-principle)

# Liskov Substitution Principle

If you'd like to follow the study sequence, read about the SRP principle [click here](./1-srp.md). Or enjoy this reading!

The Liskov Substitution Principle essentially states that derived classes should be substitutable for their base classes. This means that a derived class should be capable of replacing its base class without breaking the program's behavior. It complements previous factors but, in my opinion, is quite challenging to apply without risking system functionality if applied after the system is already in production with a certain level of maturity, indicating an evolution period without functionality breaks.

To properly implement this principle, a high level of abstraction in segregating responsibilities is required to avoid future refactors or structural adjustments. Generally speaking, it's essentially about using object orientation and polymorphism.

To deviate from the common examples of squares and rectangles found in various articles, let's imagine a scenario in a banking application. There's an `Account` class representing a bank account and a `Card` class representing a credit or debit card. The `Card` can be of type `CREDIT` or `DEBIT`. The `Account` class has a method `performDigitalDeposit` for digital deposits, only available with a credit card, and a method `performWithdraw` for withdrawals, available with both credit and debit cards.

Understanding this context, let's imagine that a developer needs to implement the `performDigitalDeposit` and `performWithdraw` methods.

- Suppose the developer only knows the principles of Single Responsibility Principle and Open-Closed Principle and develops the code as follows:
```java
public class Account {
    private BigDecimal balance;
    private Card card;

    public Account(BigDecimal balance, Card card) {
        this.balance = balance;
        this.card = card;
    }

    public void performDigitalDeposit(BigDecimal value) {
        if (card.getType().equals(CardType.CREDIT)) {
            balance = balance.add(value);
        } else {
            throw new RuntimeException("Invalid card type");
        }
    }

    public void performWithdraw(BigDecimal value) {
        if ([CardType.CREDIT, CardType.DEBIT].contains(card.getType())) {
            balance = balance.subtract(value);
        } else {
            throw new RuntimeException("Invalid card type");
        }
    }
}
```

Although functional, this code doesn't adhere to the Liskov Substitution Principle. Using the Card class, one can call the digital deposit functionality despite the validation to prevent the operation's completion, indicating a violation of the Liskov Substitution Principle.

To address this issue, we can apply the Liskov Substitution Principle by creating an abstract class Card and two classes that inherit from Card, namely CreditCard and DebitCard. This way, we can use polymorphism to validate the card type.

```java
public abstract class Card {
    private CardType type;

    public Card(CardType type) {
        this.type = type;
    }

    public CardType getType() {
        return type;
    }

    public void performWithdraw(BigDecimal value) {
        // do something
    }

}

public class CreditCard extends Card {
    public CreditCard() {
        super(CardType.CREDIT);
    }

    public void performDigitalDeposit(BigDecimal value) {
        // implement specific rules
    }

}

public class DebitCard extends Card {
    public DebitCard() {
        super(CardType.DEBIT);
    }

    public void performDigitalTransfer(BigDecimal value) {
        // implement specific rules
    }

}

public class AccountService {
    private BigDecimal balance;
    private Card card;

    public AccountService(BigDecimal balance, Card card) {
        this.balance = balance;
        this.card = card;
    }

    public void performDigitalDeposit(BigDecimal value) {
        if (card.getType().equals(CardType.CREDIT)) {
            DebitCard debitCartd = (DebitCard) card;
            debitCartd.performDigitalDeposit(value);
        } 
        if (card.getType().equals(CardType.DEBIT)) {
            CreditCard creditCard = (CreditCard) card;
            creditCard.performDigitalTransfer(value);
        }
    }

    public void performWithdraw(BigDecimal value) {
        Card card = this.card;
        card.performWithdraw(value);
    }
}
```

As seen, the code now adheres to the Liskov Substitution Principle. The creation of the abstract class Card and classes CreditCard and DebitCard, which inherit from Card, allows polymorphism to perform validation and call the correct method based on the card type. Even a novice developer in the team, unfamiliar with business rules, will execute the corresponding operation. The AccountService class can be called from anywhere in the system without breaking the program's behavior.

Conclusion
The Liskov Substitution Principle is crucial as it enables correct utilization of polymorphism and prevents program behavior from breaking. However, it's essential to use this principle with caution as improper implementation can cause issues in program behavior.