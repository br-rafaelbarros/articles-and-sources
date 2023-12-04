[![Brazilian Portuguese](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/32px-Flag_of_Brazil.svg.png) Leia em Protuguês BR](#sobre-o-projeto)  | 
[![English](https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/32px-Flag_of_the_United_States.svg.png) Read in English US](#about-the-project)


# About the project

This project was developed with didactic and demonstrative intent, to demonstrate knowledge of Clean Code practices.
The idea of this project is to show how code without any Clean Code application can work and even though it is difficult to maintain, the most critical points must be pointed out and how they can be improved.
It is worth highlighting that the idea is not to belittle anyone's work, but rather to show how we can improve the code and make it more readable and easy to maintain, and that this code is our own authorship and any similarity with other code is mere coincidence. I will be highlighting some points that can be improved, probably if you arrived at this code it was due to some indication, or you participated in some process in which I presented this code.
Feel free to fork, download, suggest improvements, criticize, etc.


# Points that will be covered:

- [1 - Naming of variables, methods, classes, etc.](#1-naming-of-variables-methods-classes-etc)
- [2 - Comments](#2-comments)
- [3 - Code structure](#3-code-structure)
- [4 - Size of methods](#4-size-of-methods)
- [5 - Magic numbers](#5-magic-numbers)
- [6 - Maintainability](#6-maintainability)
- [7 - Testability](#7-testability)
- [8 - Variable typing](#8-variable-typing)
- [9 - Error Hnadling](#9-error-handling)

# 1 Naming of variables, methods, classes, etc.

This item in my opinion is the simplest and most complicated at the same time heheheh, which dev who has never stopped to think about a variable name, and before finalizing the methods it has already been renamed? 'WHO NEVER", kidding aside, it differentiates a lot the readability of a code with the standardized nomenclatures.
It can be observed that the nomenclature of variables, methods and classes does not follow any pattern, which makes it difficult to read and understand the code, in addition to not following any nomenclature pattern, which makes it difficult to maintain the code, because it is not known what each variable, method or class does.
Examples of `txCA` when written the developer thought (and I know this because it was me heheh), that this mnemonic refers to the municipal rate of ICMS, that is, at the time of development it made sense but anyone else will 'skate' to understand if you understand, even if you have documentation, it is already a negative point, because you have to consult documentation to understand the meaning of a variable or a point that could simply be solved with a more 'explanatory' name, do you agree?
Throughout the code you can see this type of development and we can discourse about it, but I believe the point has already been passed.

# 2 Comments
In my understanding I can summarize that the use of comment serves as a quick documentation of the reason that block was applied, use to document the signature of a method, or an abbreviated comment of a point not presented in the rule but that is relevant. Other than that I don't see the need for comments, because the code must be self-explanatory.
*"Except for syntax exceptions presented in languages ​​like GO, and Java's own EJB3, among others not presented here".*
In the code we can see comments that became necessary due to the lack of use of good practices such as description of the rates what the line calculation should return and I included one that I particularly saw a lot including I do a 'mea culpa' because I've used it too to facilitate the analysis in many 'legacy that already maintenance' which is the use of comments to separate blocks of code, as can be seen in the example below:
``//START BLOCK X`` and ``//END BLOCK X``.
We can also discourse a lot about this subject because the work time has already shown us a lot of funny things, but I believe the point has already been passed.   

# 3 Code structure

In the example of the code it is not taking advantage of any of the benefits that the language offers, such as the use of classes, interfaces, inheritance, etc ..., it is practically structurally coded, leaving other bad points that we will address later.
This point is very visual and self-explanatory, based on the code in question, a good point to observe and that I purposely put to demonstrate since I did not find in the challenge presented a way to demonstrate, was the coded in the method `executeHadoukenMethod`, which is commonly known as Hadouken code, for those who like games and know Street Fighter, know what I'm talking about, but for those who don't know, it's basically a code that has so much condition inside that another that visually looks like a Hadouken, as can be seen below:
``` 
if (condition1) {
    if (condition2) {
        if (condition3) {
            // do something
        } else {
            // do something
        }
    } else {
        // do something
    }
} else {
    // do something
}
```
It is an extremely difficult maintainability code because each internal condition depends on the most external to materialize outside points such as readability among others.

# 4 Size of methods

Intentionally I kept all the challenge rules in a single method to show that even if it is not with the practices applied it still works. This does not mean that it is correct. The delivery may have been quick, but if there is any future maintenance, the time will be doubled and not just an `if` that will be added.
Another point that is good to observe is the amount of necessary 'rules' for the context, but that can be treated in a more 'auxiliary' way such as checking the city, state, type of payment, etc ..., they can be treated depending on the project in methods or even in separate classes, reducing the size of the method and leaving in it only the central objective, which in this case is the calculation of the sale price.

# 5 Magic numbers

This point is very simple to apply, and causes a very big difference in the readability of the code, basically it is to replace values ​​used globally and unaltered in the application context or even functionality by global variables, enum or constants, in the code in question we could apply in several points such as city names, types of accepted payment, standard tariff. In our example that application with the practices of Clean Code, we will be able to see how it will be.

# 6 Maintainability

On this topic I have an example that I heard in several sources of study that I did and I never forgot, summarizing it is kind of like "A dev must be a scout, when camping and leaving, must leave the place better than he found it", this explains a lot about the idea of ​​this point, when doing maintenance you must leave the code more readable than when you got it, so we can improve more and more points that need a lot of software maintenance.
Of course we should always evaluate the criticality of the code, points such as, loss in case of failure, time of this 'cleaning', test coverage of the block in question, points of much subject to be discussed, but the minimum was passed.

# 7 Testability

This topic we have two interesting points to present, the testability in the security issue in the refactorings applying the Clean Code practices, and how much more covered an application can be with the good practices applied. In our example we can see that we will be able to cover tests based only on the expected return, we will not be able to cover the exception scenarios, not even the isolated success ones, in the case the 'satellite' rules, for example the cities that the functionality does not cover. As in the topic above and applying the same sentence we must always refactor and cover more and more tests, of course when possible, let's always take the personal contexts into consideration.

# 8 Variable typing

One of the biggest points for choosing that this content was created with examples in javascript / typescript was the language not forcing the typing of the variables, which from a very high look facilitates development, but if you look from a more in-depth and critical perspective, variables must always be typed, today many guidelines and companies configure and use as an acceptance criterion the typing.
We can see in our example code that no typing was used, which makes it difficult to understand the function of the variable such as the one signed in the main method `product` if we only look at it we cannot be sure that this variable is an object that contains all the attributes to work or just the name of the product in question that is the presented scenario, this burdens a lot the development time and maintenance of the code, we can talk a lot more about the subject for example of the tariff variables that if for some reason there is an error and receive a string as a value, the error perception will be much more difficult to be identified.
Although I used typescript to exemplify, we can have examples like this in other languages ​​like Java, C #, etc ..., for example objects returned with only 1 filled attribute, variable that needs to be converted to a specific type by some rule not analyzed in development among others.

# 9 Error Handling

This may not seem like it, but for me it is one of the most important points, if we look at projects that we have already worked on and look specifically at how it treated the error many times we realize that even some having error handling patterns, they were not applied in their entirety, this is a very big bottleneck to bring security to the application, imagine if by chance your financial application returned an unhandled message exposing parts of the code or even a confidential data. For this it is very important that it be looked at and defined very carefully how errors will be handled in the application, in our example at first glance we can let this failure that I did on purpose go unnoticed, but if we look more carefully we can see that the error is not treated at any time, and much worse in the condition of passing some city that does not exist we can see that the returned value is `0`, that is, if by chance the owner of the system needs to price his cost of a city and did not pay attention to implement the new rule for him, the cost of sale would be 0 hypothetically if there is no audit customers would buy the fuel for free. Did you notice the importance of this topic, we could break down this subject for a long time because there are many points to discuss about it, but it is a reflection for the content showing the code with the clean code applied.

# Conclusion

To finish we saw that points for discussions are not lacking on the subject, but if you notice, if you use the minimum of rational in development, the code will be much better, you should always be aware that this is a model that should NOT be followed, and this code had these points well highlighted didactically.
I hope you enjoyed it and that it helped you to understand a little more about the subject, and that it helped to improve your code.

# Sobre o projeto

Este projeto foi desenvolvido com intenção didática e demonstrativa, para mostrar conhecimentos nas prátricas de Clean Code.
A ideia deste projeto é mostrar como um código sem nenhuma aplicação de Clean Code pode funcionar e mesmo assim ser um código de dificil manutenção, deve ser apontado os pontos mais críticos e como eles podem ser melhorados.
Vale a Pena destacar que a idéia não é desmerecer o trabalho de ninguém, mas sim mostrar como podemos melhorar o código e torná-lo mais legível e de fácil manutenção, e que esse código é de autoría própria e qualquer semelhança com outro codigo é mera coincidência. estarei elicitando alguns pontos que podem ser melhorados, provavelmente se chegou a este código foi por alguma indicação, ou participou de algum processo em que apresentei este código. 
Sinta-se a vontade para criar fork, baixar, sugerir melhorias, criticar, etc.


# Pontos que serão abordados:

- [1 - Nomenclatura de variáveis, métodos, classes, etc.](#1-nomenclatura-de-variáveis-métodos-classes-etc)
- [2 - Comentários](#2-comentários)
- [3 - Estrutura de código](#3-estrutura-de-código)
- [4 - Tamanho de métodos](#4-tamanho-de-métodos)
- [5 - Numeros mágicos](#5-numeros-mágicos)
- [6 - Manutenibilidade](#6-manutenibilidade)
- [7 - Testabilidade](#7-testabilidade)
- [8 - Tipagem de variáveis](#8-tipagem-de-variáveis)
- [9 - Tratamento de erros](#9-tratamento-de-erros)

# 1 Nomenclatura de variáveis, métodos, classes, etc.

Esse item na minha opnião é o mais simples e mais complicado ao mesmo tempo heheheh, qual o dev que nunca parou pra pensar em um nome de variavel, e antes de finalizar o metodos ela ja tenha sido renomeada? 'QUEM NUNCA",  brincadeiras a parte diferencia muito a legibilidade de um código com as nomenclatiras padronizadas.
Pode-se observar que a nomenclatura de variáveis, métodos e classes não segue nenhum padrão, o que dificulta a leitura e entendimento do código, além de não seguir nenhum padrão de nomenclatura, o que dificulta a manutenção do código, pois não se sabe o que cada variável, método ou classe faz.
Exemplos de `txCA` quando escrito o desenvolvedor pensou (e isso eu sei por que foi eu heheh), que esse minemonico referencia a taxa municipal de ICMS, ou seja no momento do desenvolvimento fez sentido mas qualquer outra pessoa vai 'patinar' para entender se entender, mesmo que tenha uma documentação, ja é um ponto negativo, pois ter que consultar documentação para entender o significado de uma variavel ou um ponto que poderia simplesmente ser solucionado com um nome mais 'explicaivo', concordam?
Em todo o código pode ser visto esse tipo de desenvolvimento e podemos discursar sobre isso, mas acredito que o ponto já foi passado.

# 2 Comentários

No meu entendimento posso resumir que o uso de comentário serve como uma documentação rápida do motivo que foi aplicado aquele bloco, uso para documentar a assinatura de um metodo, ou um comentário abreivado de um ponto não paresentado na regra mas que seja relevante. Fora isso não vejo necessidade de comentários, pois o código deve ser auto explicativo.

*"Salvo exceções de sintaxes apresentadas em linguagens como GO, e o proprio EJB3 do Java, entre outros não apresentados aqui".*

No código podemos ver comentários que se tornaram necessários devido a falta de uso de boas práticas como descrição das taxas o que o calculo da linha deve retornar e oncluí uma que particulamente ja ví muito inclusive faço um 'mea culpa'pois já usei também para facilitar a nálise em muitos 'legado que ja de manutenção' que é o uso de comentários para separar blocos de código, como pode ser visto no exemplo abaixo:
``//START BLOCO X`` e ``//END BLOCO X``.

Podemos também discursarm muito sobre esse assunto por que o tempo de trabalho ja nos mostrou muita coisa engraçada, mas acredito que o ponto já foi passado.

# 3 Estrutura de código

No exemplo do código não está aproveitando nenhum dos benefícios que a linguagem oferece, como por exemplo o uso de classes, interfaces, herança, etc..., está praticamente codificado estruturalmente, deixando outros pontos ruins que iremos abordar mais a frente.
Esse ponto é muito visual e autoexplicativo, baseando no código em questão, um ponto bom de se observar e que coloquei propositalmente para demonstrar ja que não achei no desafio apresentado uma forma de demonstrar, foi o codificado no método `executeHadoukenMethod`,que vulgarmente é conhecido como código Hadouken, para quem gosta de game e conhece Street Fighter, sabe do que estou falando, mas para quem não conhece, é basicamente um código que tem tanta condição dentro que outra que visualmente parece com um Hadouken, como pode ser visto abaixo:
```
if (condition1) {
    if (condition2) {
        if (condition3) {
            // do something
        } else {
            // do something
        }
    } else {
        // do something
    }
} else {
    // do something
}
```
É um código de manutenabilidade extremamente difícil por que cada condição interna depende da mais externa para se concretizar fora pontos como legibilidade entre outros.
Acho que consegui passar um pouco do que eu queria nessa parte.

# 4 Tamanho de métodos

Propositalmente mantive toda a regra do desafio em um único método para mostrar que mesmo que nao esteja com as práticas aplicadas ele ainda consegue funcionar. Isso não diz que é o correto. A entrega pode ter sido rápida, mas se houver alguma manutenção futura, o tempo será dobrado e não apenas um `if` que será adicionado.
Outro ponto que é bom observar é a quantidade de 'regras' negociais necessárias para o contexto, mas que podem ser tratadas de uma forma mais 'auxiliar' como por exemplo a verificação da cidade, estado, tipo de pagamento, etc..., elas podem ser tratadas dependendo do projeto em metódos ou até mesmo em classes separadas, reduzindo o tamanho do método e deixando nele apenas o objetivo central, que no caso é o calculo do preço de venda.

# 5 Numeros mágicos

Esse ponto é muito simples de ser aplicado, e causa uma diferença muito grande na legibilidade do código, basicamente é substituir valores usados globalmente e inalterados no contexto de aplicação ou ate mesmo de funcionalidade por variáveis globais, enum ou constantes, no código em questão poderiamos aplicar em vários pontos como nome das cidades, tipos de pagamento aceitos, tarifaz padrão. No nossso exemplo que aplicação com as práticas de Clean Code, poderemos ver como ficará.

# 6 Manutenibilidade

Sobre esse tópico tenho um exemplo que escutei em várias fontes de estudo que fiz e nunca mais esqueci, resumindo é meio assim "Um dev deve ser um escoteiro, quando acampar e for embora, deve deixar o local melhor do que encontrou", isso explica muito sobre a idéia desse ponto, quando se faz uma manutenção deve se deixar o código mais legivel que quando pegou, assim podemos ir melhorando cada vez mais pontos muito que necessita de muita manutenção do software.
Claro que devemos sempre avaliar a criticidade do código, pontos como, prejuizo em caso de falha, tempo dessa 'limpeza', cobertura de teste do bloco em questão, pontos de muito assunto para se discursar, mas foi passado o mínimo sobre.

# 7 Testabilidade

Este tópico temos dois pontos interessantes para podemos apresentar, a testabilidade na questão de segurança nos refactorings aplicando as práticas de Clean Code, e o quão mais coberto pode ser uma aplicação com as boas práticas aplicadas. No nosso exemplo podemos perceber que conseguiremos cobrir de testes baseado apenas no retorno esperado, não conseguiremos cobrir os cenários de exceção, nem mesmo os de sucesso isolados, no caso as regras 'satélites', por exemplo as cidades que a funcionalidade não cobre. Como no tópico acima e aplicando a mesma frase devemos sempre refatorar e cobrir cada vez mais de testes, claro quando for possível né vamos sempre levar os contextos pessoais em questão.

# 8 Tipagem de variáveis

Um dos maiores pontos para escolher que esse conteúdo fosse criado com exemplos em javascript/typescript foi pela liguaguem não obrigar a tipagem das váriáveis, que por um olhar muito alto facilita o desenvolvimento, mas se for olhar de uma perspectiva mais aprofundada e critériosa, deve-se sempre tipar as variáveis, hoje muitos guidelines e empresas configuram e usam como criterio de acietação a tipagem.
Podemos ver no nosso código de exemplo que não foi usado nenhuma tipagem, que dificulta a compreenção da função da variável como por exemplo a assinada no metodo princial `product` se olharmos apenas para ela não podemos ter certeza que essa variável é um objeto que contenha todos os atributos para se trabalhar ou apenas o nome do produto em questão que é o cenário apresentado, isso onera muito o tempo de desenvolvimento e manutenção do código, podemos falar muito mais sobre o assunto por exemplo das variaveis de tarifas que se por algum motivo houver um erro e receber uma string como valor, a percepção de erro será muito mais dificil de ser identificada.
Apesar de ter usado typescript para exemplificar podemos ter exemplos como este em outras linguagens como Java, C#, etc..., por exemplo objetos retornados com apenas 1 atributo preenchido, variavel que precisa ser convertida para um tipo especifico por alguma regra não analisada no desenvolvimento entre outras.

# 9 Tratamento de erros

Este pode não parecer, mas pra mim é um dos pontos mais importantes, se olharmos para projetos que ja trabalhamos e olharmos especificamente como ele tratava o erro em muitas vezes percebemos que mesmo alguns tendo padrões de tratamento de erros, não eram aplicados em sua completude, isso é um gargalo muito grande para levar segurança para aplicação, imaginemos se por um acaso seu aplicativo financeiro retonasse uma mensagem não tratada expondo partes do código ou ate um dado confidencial. Para isso é muito importante que seja olhado e definido com bastante cuidado como será tratado erros na aplicação, no nosso exemplo á primeira vista podemos deixar passar batido nessa falha que fiz propositalmente, mas se olharmos com mais cuidado podemos ver que o erro não é tratado em nenhum momento, e muito pior na condição de passado alguma cidade nao existente podemos ver que o valor retornado é `0`, ou seja se por um acaso o proprietario do sistema precise precificar o seu custo de uma cidade e não se atentou para implementarem a nova regra para ele, o custo de venda seria 0 hipoteticamente se não houver uma auditoria clientes comprariam o combustivel de graça. Perceu a importância deste tópico, poderiamos destrinchar esse assunto por muito tempos pois existem muitos pontos a tratarem sobre isso, mas fica a reflexão para o conteúdo mostrando o código com o clean code aplicado.


# Conclusão

Para finalizar vimos que pontos para discursões não faltam sobre o assunto, mas se perceber, se usar o mínimo de racional no desenvolvimento, o código vai ficar muito melhor, deve sempre se atentar que este é um modelo que NÃO deve ser seguido, e exte código teve esses pontos bem enaltecidos didaticamente.
Espero que tenham gostado e que possa ter ajudado a entender um pouco mais sobre o assunto, e que possa ter ajudado a melhorar o código de vocês.





