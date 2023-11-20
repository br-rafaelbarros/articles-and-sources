


[![Brazilian Portuguese](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/32px-Flag_of_Brazil.svg.png) Leia em Protuguês BR](#princípio-aberto-fechado) | 
[![English](https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/32px-Flag_of_the_United_States.svg.png) Read in English US](#open-closed-principle)


# Princípio Aberto-Fechado

Agora que está lendo este conteúdo, imagino que você já tenha lido o conteúdo do princípio SRP, apesar de não ser requisito para entendimento do princípio OCP, é importante que você tenha lido, pois cada princípio se complementa com o outro, e o entendimento de um vai te ajudar a entender o outro. se quiser ler o conteúdo do princípio SRP [clique aqui](./1-srp.md). Ou aproveite a leitura!

O 'O' do princípio SOLID segue a premissa de que uma classe deve estar aberta para extensão, mas fechada para modificação. Resumindo o desenho de uma classe deve ser feito de forma que seja possível adicionar novas funcionalidades sem que seja necessário alterar o código já existente. Isso é feito através de abstrações, interfaces e herança. Dito isso e possível perceber que essa premissa apesar de parecido com o princípio SRP, ele é diferente, pois o SRP orienta a segregação de responsabilidades, e o OCP orienta a extensão de funcionalidades.
esse princípio de aberto-fechado é bem aplicado quando se tem o entendimento no contexto mais amplo da aplicação para que seja possível prever as possíveis mudanças que podem ocorrer no futuro, isso se ocorre no início no desenho da solução por um bom design system com entendimento para solução ou ou num segundo momento de refatoração do código. Minha expêriencia me mostrou que o segundo caso é o mais comum, pois é muito difícil prever todas as mudanças que podem ocorrer no futuro, e quando ocorre uma mudança, é necessário refatorar o código para que ele se adeque a nova necessidade. 

Agora tendo o entendimento desse princípio, vamos uzar o mesmo cenário de saque para mantermos a consistência e unicidade do conteúdo. Já tenha a solução de saque com o princípio SRP aplicado, e agora o desenvolvedor precisa aplicaro princípio OCP, pois a empresa decidiu que agora o saque deve ser realizado com um cartão de débito, e não mais com o cartão de crédito, e o cartão de débito tem algumas regras diferentes do cartão de crédito, como por exemplo, o cartão de débito não tem limite de saque diário, e o limite de saque por transação é diferente do cartão de crédito. Então o desenvolvedor precisa alterar o código para que ele se adeque a nova regra de negócio.

- Agora vamos imaginar que o desenvolvedor não conhece o príncipio OCP e desenvolve o código da seguinte forma:
```java

public void performWithdraw(String userID, BigDecimal value) {

    Account account = accountRepository.findByUserID(userID);

    // get card default card to veify if is debit card
    Card card = cardRepository.findByAccountID(account.getId());

    if (card.getType() != CardType.DEBIT) {
        throw new Exception("Card is not debit");
    }

    validateWithdraw(value);
    deductBalance(value, card);
    createTransaction(value);
}

private void validateWithdraw(BigDecimal value) {
    if (value.compareTo(this.balance) > 0) {
        throw new InsufficientBalanceException();
    }
    if (value.compareTo(this.dailyWithdrawLimit) > 0) {
        throw new DailyWithdrawLimitExceededException();
    }
    if (value.compareTo(this.transactionLimit) > 0) {
        throw new TransactionLimitExceededException();
    }
}

private void deductBalance(BigDecimal value, Card card) {
    if (card.getType() == CardType.DEBIT) {
        this.balance = this.balance.subtract(value);
    } else {
        boolean isDailyWithdrawLimitExceeded = this.dailyWithdrawLimit.subtract(value).compareTo(BigDecimal.ZERO) < 0;
        
        if (isDailyWithdrawLimitExceeded) {
            throw new DailyWithdrawLimitExceededException();
        }

        this.balance = this.balance.subtract(value);
    }
}

private void createTransaction(BigDecimal value) {
    this.transactions.add(new Transaction(value, TransactionType.WITHDRAW));
}
```

Como pode perceber se comparar a diferença entre o ultimo exemplo desse códio com a implementação da nova regra, pode ser visto que foi alterado muintos pontos. Levando ao risco de quebra de funcionalidades já existentes, e dificuldade de manutenção do código. Isso porque o desenvolvedor não conhece o princípio OCP, pois ele não está seguindo a premissa de que uma classe deve estar aberta para extensão, mas fechada para modificação.

Agora vamos imaginar que o desenvolvedor conhece o príncipio OCP e tenha que desenvolver o mesmo código, ele irá desenvolver da seguinte forma:
```java
public interface WithdrawalValidator {
    void validate(BigDecimal value, BigDecimal balance, BigDecimal transactionLimit) throws WithdrawalValidationException;
}

public class InsufficientBalanceValidator implements WithdrawalValidator {
    @Override
    public void validate(BigDecimal value, BigDecimal balance, BigDecimal transactionLimit) throws WithdrawalValidationException {
        if (value.compareTo(balance) > 0) {
            throw new InsufficientBalanceException();
        }
    }
}

public class TransactionLimitValidator implements WithdrawalValidator {
    @Override
    public void validate(BigDecimal value, BigDecimal balance, BigDecimal transactionLimit) throws WithdrawalValidationException {
        if (value.compareTo(transactionLimit) > 0) {
            throw new TransactionLimitExceededException();
        }
    }
}

public interface BalanceDeductor {
    BigDecimal deduct(BigDecimal balance, BigDecimal value, Card card, BigDecimal dailyWithdrawLimit) throws WithdrawalValidationException;
}

public interface BalanceDeductor {
    BigDecimal deduct(BigDecimal balance, BigDecimal value, Card card, BigDecimal dailyWithdrawLimit) throws WithdrawalValidationException;
}

public class DefaultBalanceDeductor implements BalanceDeductor {
    @Override
    public BigDecimal deduct(BigDecimal balance, BigDecimal value, Card card, BigDecimal dailyWithdrawLimit) throws WithdrawalValidationException {
        if (card.getType() != CardType.DEBIT) {
            throw new Exception("Card is not debit");
        }

        if (card.getType() == CardType.DEBIT) {
            return balance.subtract(value);
        } else {
            BigDecimal remainingLimit = dailyWithdrawLimit.subtract(value);
            if (remainingLimit.compareTo(BigDecimal.ZERO) < 0) {
                throw new DailyWithdrawLimitExceededException();
            }
            return balance.subtract(value);
        }
    }
}


public class WithdrawalProcessor {
    private BigDecimal balance;
    private BigDecimal transactionLimit;
    private List<WithdrawalValidator> validators;
    private BalanceDeductor balanceDeductor;

    public WithdrawalProcessor(BigDecimal balance, BigDecimal transactionLimit, List<WithdrawalValidator> validators, BalanceDeductor balanceDeductor) {
        this.balance = balance;
        this.transactionLimit = transactionLimit;
        this.validators = validators;
        this.balanceDeductor = balanceDeductor;
    }

    public void performWithdraw(BigDecimal value, Card card, BigDecimal dailyWithdrawLimit) {
        for (WithdrawalValidator validator : validators) {
            try {
                validator.validate(value, balance, transactionLimit);
            } catch (WithdrawalValidationException e) {
                System.out.println("Validation error: " + e.getMessage());
                return;
            }
        }

        try {
            this.balance = balanceDeductor.deduct(balance, value, card, dailyWithdrawLimit);
            System.out.println("Withdrawal successful. New balance: " + this.balance);
        } catch (WithdrawalValidationException e) {
            System.out.println("Withdrawal error: " + e.getMessage());
        }
    }
}

```

Podemos perceber neste exemplo que se fossemos aplicar á risca este princípio teriamos que refatorar todo código já escrito, mesmo estando correto, e ja aplicado o primeiro princípio.
Pontos de devemos perceber neste exemplo:
- **POSITIVO**: A classe ``WithdrawalProcessor`` está aberta para extensão, pois ela recebe como parâmetro uma lista de validadores e um balanceDeductor, e com isso é possível adicionar novos validadores e um novo balanceDeductor sem que seja necessário alterar o código já existente.

- **NEGATIVO**: O codigo ficou maior e nem posso dizer mais complexo, melhor dizendo, ficou melhor de um aperpectiva arquitetural, mas também ficou um pouco mais complexo para um desenvolvedor com menos experiência entender e aplicar igualmente novas regras com o mesmo padrão.

- **POSITIVO**: O código ficou mais fácil de dar manutenção, pois se precisar adicionar uma nova regra, basta criar um novo validador e adicionar na lista de validadores, e se precisar adicionar um novo balanceDeductor, basta criar um novo balanceDeductor e passar como parâmetro na instanciação da classe ``WithdrawalProcessor``.

- **NEGATIVO**: O aumento significativo de classes requer uma boa organização e entendimento do código, e isso pode ser um problema para um desenvolvedor com menos experiência.

**Obs.:  Mais uma vez mencionando de uma forma diferente devemos sempre tentar aplicar as melhores práticas, mas devemos também ter o bom senso de saber quando aplicar ou não, pois nem sempre é possível aplicar todos os princípios, por vários motivos, como por exemplo, prazo, complexidade, seguir o padrão de código ja implementado, mas o fato de conhecer já vai te deixar em um nível de entendimento de soluções muito avançado. Um exemplo é que sistemas muito legado pode ter uma criticidade muito alta em realizarmos esses refactors por vários motivos, nível de conhecimentos dos devs, criticidade da aplicação e outros mencionado anteriormente**

----

# ENGLISH

[![Brazilian Portuguese](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/32px-Flag_of_Brazil.svg.png) Read in Brazilian Portuguese](#princípio-aberto-fechado) | 
[![English](https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/32px-Flag_of_the_United_States.svg.png) Leia em Português BR](#open-closed-principle)

# Open-Closed Principle

Now that you're reading this content, I assume you've already read about the SRP principle. While it's not a requirement to understand the OCP principle, it's crucial to have read about it because each principle complements the other. If you'd like to read about the SRP principle, [click here](./1-srp.md). Or simply enjoy the reading!

The 'O' in the SOLID principle follows the premise that a class should be open for extension but closed for modification. In essence, the design of a class should allow adding new functionalities without requiring changes to existing code. This is accomplished through abstractions, interfaces, and inheritance. It's essential to note that while this principle might seem similar to the SRP, it differs. The SRP guides the segregation of responsibilities, whereas the OCP guides the extension of functionalities.

This open-closed principle is best applied when understanding the broader context of the application to anticipate potential future changes. This might occur either during the initial solution design through a well-thought-out design system or in a later code refactoring phase. In my experience, the latter is more common because predicting all future changes is challenging, and when change happens, code refactoring becomes necessary to meet the new requirements.

Now, with an understanding of this principle, let's use the same withdrawal scenario to maintain content consistency and unity. Imagine having a withdrawal solution applying the SRP principle, and now the developer needs to apply the OCP principle. The company has decided that withdrawals must now be performed using a debit card instead of a credit card. The debit card has some different rules, such as no daily withdrawal limit, and the transaction withdrawal limit differs from the credit card. Therefore, the developer needs to adjust the code to align with the new business rule.

- Let's imagine that the developer is unfamiliar with the OCP and develops the code as follows:
```java

public void performWithdraw(String userID, BigDecimal value) {

    Account account = accountRepository.findByUserID(userID);

    // get card default card to veify if is debit card
    Card card = cardRepository.findByAccountID(account.getId());

    if (card.getType() != CardType.DEBIT) {
        throw new Exception("Card is not debit");
    }

    validateWithdraw(value);
    deductBalance(value, card);
    createTransaction(value);
}

private void validateWithdraw(BigDecimal value) {
    if (value.compareTo(this.balance) > 0) {
        throw new InsufficientBalanceException();
    }
    if (value.compareTo(this.dailyWithdrawLimit) > 0) {
        throw new DailyWithdrawLimitExceededException();
    }
    if (value.compareTo(this.transactionLimit) > 0) {
        throw new TransactionLimitExceededException();
    }
}

private void deductBalance(BigDecimal value, Card card) {
    if (card.getType() == CardType.DEBIT) {
        this.balance = this.balance.subtract(value);
    } else {
        boolean isDailyWithdrawLimitExceeded = this.dailyWithdrawLimit.subtract(value).compareTo(BigDecimal.ZERO) < 0;
        
        if (isDailyWithdrawLimitExceeded) {
            throw new DailyWithdrawLimitExceededException();
        }

        this.balance = this.balance.subtract(value);
    }
}

private void createTransaction(BigDecimal value) {
    this.transactions.add(new Transaction(value, TransactionType.WITHDRAW));
}
```
As seen in the difference between the last example of this code and the implementation of the new rule, many points were changed. This leads to the risk of breaking existing functionalities and makes code maintenance difficult. This is because the developer is not aware of the OCP principle, as they aren't following the premise that a class should be open for extension but closed for modification.

Now, suppose the developer is familiar with the OCP principle and needs to develop the same code. They would do it like this:

java
Copy code
// Updated code using interfaces and validators
In this example, strictly adhering to this principle would require refactoring the entire already-written code, even though it's correct and has already applied the first principle.

Key takeaways from this example:

**POSITIVE**: The WithdrawalProcessor class is open for extension as it takes a list of validators and a BalanceDeductor as parameters. This allows adding new validators and a new BalanceDeductor without modifying existing code.

**NEGATIVE**: The code has become larger and not necessarily more complex, but rather more architecturally sound. However, it might be slightly more complex for a less experienced developer to understand and equally apply new rules following the same pattern.

**POSITIVE**: The code is easier to maintain. Adding a new rule simply requires creating a new validator and adding it to the list of validators. Similarly, adding a new BalanceDeductor requires creating a new one and passing it as a parameter during the instantiation of the WithdrawalProcessor class.

**NEGATIVE**: The significant increase in classes demands good code organization and understanding, which might pose a challenge for less experienced developers.

**Note: Once again, it's crucial to approach best practices with discretion. Knowing when to apply them or not is essential because it's not always possible to apply all principles due to various reasons like deadlines, complexity, adhering to an existing code pattern. However, having this knowledge will put you at an advanced level of understanding solutions. For instance, very legacy systems might have high criticality in performing these refactors due to several reasons, including the team's knowledge level, application criticality, and other factors mentioned previously.**