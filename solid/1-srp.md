


[![Brazilian Portuguese](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/32px-Flag_of_Brazil.svg.png) Leia em Protuguês BR](#princípio-de-responsabilidade-única) | 
[![English](https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/32px-Flag_of_the_United_States.svg.png) Read in English US](#single-responsibility-principle)


# Princípio de Responsabilidade Única

O 'S' do princípio na minha opnião é o mais fácil de ser entendido. Resumindo ele simplesmente orienta o desenvovimento segregando os passos durante um fluxo de acordo com sua funcionalidade por exemplo.
Vamos imaginar uma funcionalidade de realizar saque do saldo em conta ``performWithdraw``. Onde o fluxo de execução é o seguinte:
  1. Verificar se o valor do saque é maior que o saldo em conta.
  2. Verificar se o valor do saque é maior que o limite de saque diário.
  3. Verificar se o valor do saque é maior que o limite de saque por transação.
  4. Deduzir o valor do saque do saldo em conta.
  5. Criação de um registro de transação.

**Obs.:  Não vamos levar em conta um caso real onde as validações são muito mais complexas, nem outros pontos que não foram abordados como resiliência, segurança, rollback e tratamento de erros entre outros.**

- Agora vamos imaginar que o desenvolvedor não conhece o príncipio SRP e desenvolve o código da seguinte forma:
```java
  public void performWithdraw(BigDecimal value) {
    if (value.compareTo(this.balance) > 0) {
        throw new Exception("Insufficient balance");
    }
    if (value.compareTo(this.dailyWithdrawLimit) > 0) {
        throw new Exception("Daily withdraw limit exceeded");
    }
    if (value.compareTo(this.transactionLimit) > 0) {
        throw new Exception("Transaction limit exceeded");
    }
      this.balance = this.balance.subtract(value);
      this.transactions.add(new Transaction(value, TransactionType.WITHDRAW));
  }
```
Apesar de ser um código simples e estar aparentemente claro para manutenção, entendimento e ele funcionar sem problemas, ele não está seguindo o príncipio SRP, porque ele está realizando mais de uma tarefa com responsabilidades diferentes em um único método, agora imagine se:
Em um futuro o desenvolvedor precisar alterar alguma dessas regras. Ele deverá revisar todo o código e realizar os testes novamente, além de ter que se preocupar com a ordem de execução das validações, pois se ele alterar a ordem de execução das validações, o código irá quebrar, pois a ordem de execução das validações é importante para o funcionamento correto do código, isso imaginando um sistema de médio/grande porte, de uma grande empresa onde trabalha, e tenha por exemplo, um time desenvolvedores, onde cada um tem um conhecimento diferente do código, e cada um tem um estilo de codificação diferente, imagina o caos que isso pode se tornar.
Isso fora outros pontos como dificuldades em desenvolver testes unitários, dificuldades em reaproveitar o código, que falaremos em uma outra oportunidade.

- Agora vamos imaginar que o desenvolvedor conhece o príncipio SRP e tenha que desenvolver o mesmo código, ele irá desenvolver da seguinte forma:
```java
public void performWithdraw(BigDecimal value) {
    validateWithdraw(value);
    deductBalance(value);
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

private void deductBalance(BigDecimal value) {
    this.balance = this.balance.subtract(value);
}

private void createTransaction(BigDecimal value) {
    this.transactions.add(new Transaction(value, TransactionType.WITHDRAW));
}
```

Este exemplo utilizando o primeiro princípio ja podemos ver que houve um almento de linhas de código, mas em contrapartida o código ficou mais legível, mais fácil de dar manutenção. Por exemplo, digamos que você recebeu a tarefa de incluir regras novas para que seja realzado o saque.
No primeiro modelo voce alteraria o metodo incluindo mais ``if`` e ``else`` se preocupando se conseguiu analisar o fluxo correto, e cada vez mais o codigo vai ficando verboso e dificil de dar manutenção.
Agora no segundo modelo, voce iria criar um novo metodo para realizar a nova regra, e no metodo ``performWithdraw`` voce iria apenas chamar o novo metodo, e o codigo ficaria mais limpo e facil de dar manutenção.
Conseguiu entender a diferença?
Bem para finalizar esse primeiro princípio, se concentre apenas neste conceito e ao ver os seguintes vai perceber que cada um se complementa com o anterior e entendendo vai perceber o quando seu nível de código vai melhorar.

**Obs.:  Não vamos achar que o mundo é perfeito e é claro que existirão casos onde não será possível aplicar o príncipio SRP, por vários motivos, como por exemplo, prazo, complexidade, seguir o padrão de código ja implementado, mas o fato de conhecer já vai te deixar em um nível de entendimento de soluções muito avançado.**

----

# ENGLISH

# Single Responsibility Principle

The 'S' principle, in my opinion, is the easiest to understand. Essentially, it guides development by segregating steps during a flow according to their functionality. For example, let's imagine a feature that performs a balance withdrawal, named `performWithdraw`. The execution flow goes as follows:
1. Check if the withdrawal amount is greater than the account balance.
2. Verify if the withdrawal amount exceeds the daily withdrawal limit.
3. Confirm if the withdrawal amount surpasses the transaction limit.
4. Deduct the withdrawal amount from the account balance.
5. Create a transaction record.

**Note: Let's not consider a real case where validations are much more complex, nor other aspects not addressed, such as resilience, security, rollback, error handling, among others.**

- Now, suppose a developer is unfamiliar with the SRP and develops the code in the following way:
```java
public void performWithdraw(BigDecimal value) {
  if (value.compareTo(this.balance) > 0) {
    throw new Exception("Insufficient balance");
  }
  if (value.compareTo(this.dailyWithdrawLimit) > 0) {
    throw new Exception("Daily withdraw limit exceeded");
  }
  if (value.compareTo(this.transactionLimit) > 0) {
    throw new Exception("Transaction limit exceeded");
  }
  this.balance = this.balance.subtract(value);
  this.transactions.add(new Transaction(value, TransactionType.WITHDRAW));
}
```

Despite being straightforward and apparently clear for maintenance and understanding, and it works seamlessly, it doesn't follow the SRP. This is because it performs more than one task with different responsibilities within a single method. Now, imagine if in the future the developer needs to alter any of these rules. They would have to review the entire code, perform tests again, and concern themselves with the execution order of validations. Changing the order of validations would break the code since the sequence is crucial for its correct functioning. In a medium/large-scale system in a big company where different developers work, each with varying knowledge of the code and different coding styles, imagine the chaos this could cause.

This is not to mention difficulties in developing unit tests or reusing the code, which we'll discuss another time.

- Now, suppose the developer is familiar with the SRP and needs to develop the same code. They would do it like this:
```java
public void performWithdraw(BigDecimal value) {
    validateWithdraw(value);
    deductBalance(value);
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

private void deductBalance(BigDecimal value) {
    this.balance = this.balance.subtract(value);
}

private void createTransaction(BigDecimal value) {
    this.transactions.add(new Transaction(value, TransactionType.WITHDRAW));
}
```

In this example using the first principle, you can see an increase in lines of code. However, on the flip side, the code becomes more readable and easier to maintain. For instance, let's say you're tasked with including new rules for withdrawals. In the first model, you'd alter the method by adding more if and else statements, constantly worrying about analyzing the correct flow, making the code more verbose and harder to maintain. In contrast, in the second model, you'd create a new method to execute the new rule, and in the performWithdraw method, you'd simply call the new method. This approach keeps the code cleaner and easier to maintain.

Do you see the difference now?

To conclude this first principle, focus solely on this concept. As you encounter the following principles, you'll notice how each complements the previous one, and by understanding them, you'll see how much your code quality improves.

**Note: Let's not assume the world is perfect. There will certainly be cases where applying the SRP might not be possible due to various reasons like deadlines, complexity, adhering to an existing code pattern. However, having the knowledge will elevate your understanding of solutions to an advanced level.**