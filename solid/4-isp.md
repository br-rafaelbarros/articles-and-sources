


[![Brazilian Portuguese](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/32px-Flag_of_Brazil.svg.png) Leia em Protuguês BR](#princípio-de-segregação-de-interfaces) | 
[![English](https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/32px-Flag_of_the_United_States.svg.png) Read in English US](#interface-segregation-principle)


# Princípio de Segregação de Interfaces

Caso queira seguir a sequência de estudos, leia o conteúdo do princípio SRP [clique aqui](./1-srp.md). Ou aproveite a leitura! 

Este princípio é bem claro até no nome, a idéia dele é que deve ser criado interfaces o mais enxutas possíveis, ou seja, interfaces com somente os métodos necessários para a classe que a implementa, quanto mais específica a interface, melhor.
Como tenho mantido a mesma estrutura de exemplo, vamos manter o cenário de saque de uma conta bancária. Neste caso teriamos uma classe `Card` que implementa a interface `Operation` 
com os métodos `withdraw` e `deposit`.

- Agora vamos imaginar o cenário descrito acima, onde temos uma interface com métodos que não são necessários para a classe que a implementa.

```java
public interface Operation {
    void withdraw();
    void deposit();
    void transfer();
    void payment();
}

public class Card implements Operation {
    @Override
    public void withdraw() {
        // TODO Auto-generated method stub
    }

    @Override
    public void deposit() {
        // TODO Auto-generated method stub
    }

    @Override
    public void transfer() {
        // TODO Auto-generated method stub
    }

    @Override
    public void payment() {
        // TODO Auto-generated method stub
    }
```

Neste caso á princípio não vemos nenhum problema, e realmente para o cenário descrito tudo vai rolar bem, mas vamos imaginar que agora temos uma classe `Pix` que também implementa a interface `Operation`, ja podemos perceber que alguns metodos não fazem sentido para a classe `Pix`, como por exemplo o método `withdraw`.

- Agora vamos imaginar o cenário descrito acima, aplicando o princípio de segregação de interfaces.

```java
public interface Withdraw {
    void withdraw();
}

public interface Deposit {
    void deposit();
}

public interface Transfer {
    void transfer();
}

public interface Payment {
    void payment();
}

public class Card implements Withdraw, Deposit, Transfer, Payment {
    @Override
    public void withdraw() {
        // TODO Auto-generated method stub
    }

    @Override
    public void deposit() {
        // TODO Auto-generated method stub
    }

    @Override
    public void transfer() {
        // TODO Auto-generated method stub
    }

    @Override
    public void payment() {
        // TODO Auto-generated method stub
    }
}

public class Pix implements Transfer, Payment {
    @Override
    public void transfer() {
        // TODO Auto-generated method stub
    }

    @Override
    public void payment() {
        // TODO Auto-generated method stub
    }
}
```

Podemos perceber que o código ficou mais limpo e mais fácil de entender, e também que o princípio de segregação de interfaces foi aplicado.
Também epossível identificar que nauralmente tivemos que desenvolver mais linhas de código, mas por outro lado podemos passar as responsabilidades de cada classe de forma mais clara.

# Conclusão 

Levando em consideração o princípio podemos dizer que quanto mais interfaces especializadas melhor é aplicado o princípio.

**Obs.: Como todo desenvolvimento pede tanto para projeto quanto sustentação, é importante que o desenvolvedor tenha bom senso na hora de aplicar o princípio, pois em alguns casos pode ser mais interessante ter uma interface mais genérica. ou seguir um padrão já aplicado, mesmo que em sua análise nao seja o melhor, isso para manter uma certa coesão no código**


----

# ENGLISH

[![Brazilian Portuguese](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/32px-Flag_of_Brazil.svg.png) Leia em Protuguês BR](#princípio-de-segregação-de-interfaces) | 
[![English](https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/32px-Flag_of_the_United_States.svg.png) Read in English US](#interface-segregation-principle)

# Interface Segregation Principle

If you'd like to follow the study sequence, read about the SRP principle [click here](./1-srp.md). Or just dive into this content!

The name of this principle is pretty clear in itself—the idea is to create interfaces as lean as possible, meaning interfaces that only include methods necessary for the class implementing them. The more specific the interface, the better.

Let's stick with the same example structure of withdrawing from a bank account. In this case, we have a `Card` class that implements the `Operation` interface with `withdraw` and `deposit` methods.

- Now, let's imagine the scenario where we have an interface with methods that are not necessary for the implementing class.

```java
public interface Operation {
    void withdraw();
    void deposit();
    void transfer();
    void payment();
}

public class Card implements Operation {
    @Override
    public void withdraw() {
        // TODO Auto-generated method stub
    }

    @Override
    public void deposit() {
        // TODO Auto-generated method stub
    }

    @Override
    public void transfer() {
        // TODO Auto-generated method stub
    }

    @Override
    public void payment() {
        // TODO Auto-generated method stub
    }
}
```

At first glance, we might not see any issues in this scenario, and indeed, for the described scenario, everything seems fine. However, let's imagine now that we have a Pix class that also implements the Operation interface. We can already see that some methods don't make sense for the Pix class, such as the withdraw method.

- Now, let's consider the described scenario above and apply the principle of interface segregation.

```java
public interface Withdraw {
    void withdraw();
}

public interface Deposit {
    void deposit();
}

public interface Transfer {
    void transfer();
}

public interface Payment {
    void payment();
}

public class Card implements Withdraw, Deposit, Transfer, Payment {
    @Override
    public void withdraw() {
        // TODO Auto-generated method stub
    }

    @Override
    public void deposit() {
        // TODO Auto-generated method stub
    }

    @Override
    public void transfer() {
        // TODO Auto-generated method stub
    }

    @Override
    public void payment() {
        // TODO Auto-generated method stub
    }
}

public class Pix implements Transfer, Payment {
    @Override
    public void transfer() {
        // TODO Auto-generated method stub
    }

    @Override
    public void payment() {
        // TODO Auto-generated method stub
    }
}
```

We can see that the code appears cleaner and easier to understand, and the principle of interface segregation has been applied. Additionally, we've naturally developed more lines of code, but on the flip side, we can clearly assign responsibilities to each class.

# Conclusion
Considering the principle, it's safe to say that the more specialized interfaces are, the better the principle is applied.

**Note: As development encompasses both project creation and maintenance, it's important for developers to exercise good judgment when applying the principle. In some cases, having a more generic interface or following an established pattern might be more beneficial, even if it doesn't seem ideal upon analysis, in order to maintain a certain cohesion in the codebase.**