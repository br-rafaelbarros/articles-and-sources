[![Brazilian Portuguese](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/32px-Flag_of_Brazil.svg.png) Leia em Protuguês BR](#princípio-de-inversão-de-dependência) | 
[![English](https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/32px-Flag_of_the_United_States.svg.png) Read in English US](#dependency-inversion-principle)


# Princípio de Inversão de Dependência

Caso queira seguir a sequência de estudos, leia o conteúdo do princípio SRP [clique aqui](./1-srp.md). Ou aproveite a leitura! 

Este princípio sugere que as dependências de uma classe devem ser abstraídas em interfaces, e não em classes concretas. ou seja uma classe não deve depender de outra classe diretamente, mas sim de uma interface que a outra classe implementa.
É bom entender que sempre haverá exceções, mas o importante é que a regra seja seguida na maioria dos casos. Deve ser observado também a questão de manutenção, pois em alguns casos pode ser mais interessante ter uma classe concreta como dependência, pois a interface pode ser alterada e quebrar a aplicação.

- Agora vamos imaginar esse princípio aplicado ao mesmo cenário de saque em conta bancária. Nesse caso temos uma classe `Card` que implementa a interface `Operation` com os métodos `withdraw` e `deposit`.

```java
public interface IOperation {
    void withdraw();
    void deposit();
}

private class Operation implements IOperation {
    @Override
    public void withdraw() {
        // TODO Auto-generated method stub
    }

    @Override
    public void deposit() {
        // TODO Auto-generated method stub
    }
}

public class Card {
    private IOperation operation;

    public Card(IOperation operation) {
        this.operation = operation;
    }

    public void withdraw() {
        operation.withdraw();
    }

    public void deposit() {
        operation.deposit();
    }

}
```
 Podemos ver que a classe `Card` não depende mais diretamente da classe `Operation`, mas sim da interface `IOperation`. Isso ajuda a isolar a classe `Card` de mudanças na classe caso haja alguma alteração na classe `Operation`.
 
----

# ENGLISH

[![Brazilian Portuguese](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/32px-Flag_of_Brazil.svg.png) Leia em Protuguês BR](#princípio-de-inversão-de-dependência) | 
[![English](https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/32px-Flag_of_the_United_States.svg.png) Read in English US](#dependency-inversion-principle)

# Dependency Inversion Principle

If you want to follow the study sequence, read about the SRP principle [click here](./1-srp.md). Or enjoy this read!

This principle suggests that a class's dependencies should be abstracted into interfaces, not concrete classes. In other words, a class should not directly depend on another class but on an interface that the other class implements.
It's essential to understand that there will always be exceptions, but what's crucial is to follow the rule in most cases. Maintenance should also be considered because, in some instances, having a concrete class as a dependency might be more advantageous, as changing an interface could potentially break the application.

- Now, let's imagine this principle applied to the same scenario of withdrawing from a bank account. In this case, we have a `Card` class that implements the `IOperation` interface with `withdraw` and `deposit` methods.

```java
public interface IOperation {
    void withdraw();
    void deposit();
}

private class Operation implements IOperation {
    @Override
    public void withdraw() {
        // TODO Auto-generated method stub
    }

    @Override
    public void deposit() {
        // TODO Auto-generated method stub
    }
}

public class Card {
    private IOperation operation;

    public Card(IOperation operation) {
        this.operation = operation;
    }

    public void withdraw() {
        operation.withdraw();
    }

    public void deposit() {
        operation.deposit();
    }
}
```

Here, the Card class no longer directly depends on the Operation class but on the IOperation interface. This helps isolate the Card class from changes in the Operation class in case there are any alterations.