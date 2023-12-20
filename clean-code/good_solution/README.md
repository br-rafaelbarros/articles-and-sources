[![Brazilian Portuguese](https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/32px-Flag_of_Brazil.svg.png) Leia em Protuguês BR](#introdução)  | 
[![English](https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/32px-Flag_of_the_United_States.svg.png) Read in English US](#introduction)

# Introdução

Olá, seja bem vindo ao repositório de estudos sobre Clean Code. Se você chegou até aqui, provavelmente já passou pelo repositório com detalhes sobre o que é Clean Code e por que é importante e exemplos de códios que não foram aplicado e brevedescrições sobre os detalhes. 
Se não, recomendo que você leia o [README.md](../bad_solution/README.md) do repositório anterior antes de continuar, vai te dar uma base melhor para entender o que está acontecendo aqui.

Agora que alinhamos, entendo que já tenha uma base sobre o que é Clean Code, a idéia do artigo foi, propor um problema e aplicar duas soluções, uma que não segue os princípios do Clean Code e outra que segue, como mencionado acima você ja deve ter lido o artigo anterior, com exemplos de códigos que não seguem os princípios do Clean Code, agora vamos ver um exemplo de código que segue os princípios do Clean Code.

# Pontos que serão abordados:

- [1 - Nomenclatura de variáveis, métodos, classes, etc.](#1---nomenclatura-de-variáveis-métodos-classes-etc)
- [2 - Comentários](#2---comentários)
- [3 - Estrutura de código](#3---estrutura-de-código)
- [4 - Tamanho de métodos](#3---estrutura-de-código)
- [5 - Numeros mágicos](#5---numeros-mágicos)
- [6 - Manutenibilidade](#6---manutenibilidade)
- [7 - Testabilidade](#7---testabilidade)

Obs.: Sobre o quão importante é cada passo, não irei descrever pois, já foi breviamente descrito no artigo com exemplo de código que não foi aplicado o clean code, então, se você ainda não leu, recomendo que leia antes de continuar.

# 1 - Nomenclatura de variáveis, métodos, classes, etc.

Ao abrir o arquivo [``gas-station.ts``](gas-station.service.ts) ja pode ser percebido que houve grandes mudanças, uma delas sobre este tópico, apesar da diminuição do uso de variáveis, pode ser visto que as que restaram estão mais claros e já nos mostra o valor que será atribuido a ela, se navegar entre as outras classes poderá perceber que o mesmo acontecerá, um ponto legal que pode ser percebido e nem muitas vezes aplicado é sobre a variavel ``taxesServiceList``, que como o nome já induz guarda uma lista de das clases responsaveis que irá calcular o imposto, tudo isso por que ela implementa uma interface que será sexplicados nos próximos tópicos.

# 2 - Comentários

Em todas classes podemos perceber que os comentários foram praticamente extintos, não que isso seja um regra ou exatamente uma boa prática, mas pense comigo, se o seu código está bem escrito, com nomes que induzem ao entendimento juntamente com as outras boas práticas, você acha que realmente seá preciso ficar aplicando comentários? Bom ao meu ver acredito que não. Mas é claro que existem pontos que apenas boas práticas não pode resolver, como por exemplo, quando se tem uma regra que depende de outros fatores externos ou a alteração vai ser feita par ajustar alguma mudança em componentes, entre outros pontos não podemos levar a regra que codigo sem comentários é o mundo perfeito, mas podemos usar como análise para refatorar e aplicar boas práticas. Falando um pouco mais sobre esse assunto quando for necessário o uso de comentários, procure sempre usar tipos de comentários necessários para cada situação, buscando por exemplo quando usar o ``//`` ou ``/* */`` ou ``/** */``.

# 3 - Estrutura de código

Sobre esse tópico sei que cada um tem uma forma de se trabalhar, e cada linguagem tem sua documentação, mas não é sobre esse ponto que digo aqui, mas sim sobre a estrutura na codificação, como você se organiza no código, bem por exemplo, você é daquele que declara as variáveis globais no inicio do método ou apenas na linha anterior ao início do seu uso? Não estou dizendo que uma maneira é correta e outra errada, mas dependendo da complexidade pode ser mais verboso a leitura, para isso grandes empresas costumam criar estilos, guideline, ou no mínimo avaliar em code rewiews esse ponto, a idéia aqui é "sempre se preocupe com a legibilidade", se voce abre uma classe ou um projeto e ja fica muito perdido logo no início, tem algo que não está bom concordam? Então, para demonstrar isso nos exemplos feitos, voce pode verificar logo a quantidades de classes clriadas comparando com o exemplo de não uso dos princípios, isso significa mais arquivos, mas ao mesmo tempo mais especialização para cada um, se olhar a estrutura de pastas vai perceber que tem uma pasta de ``taxes`` que agrupam as classes de serviço responsáveis pelo nome da pasta, outro ponto é que se abrir para avaliar os códigos vai perceber que a estrutura não tem linhas com mais de 3 ou 4 tabulações, isso é um ponto importante, não obrigatório, mas importante, pois se você tem muitas tabulações, significa que seu código poderia estar dividido em mais métodos ou classes, sempre que ver um bloco "hadouken" vulgarmente conhecido como demonstrado no artigo anterior, ja podemos abrir um alerta para melhorias.

# 4 - Tamanho de métodos

Alinhado com o tópico anterior metodos com muitas linhas de código além de trazer 
excesso de tabulações pode entre outras coisas como complexidade excessiva, regras que poderiam ser separadas em outros métodos, e talvez ate reutilizadas, redução na cobertura dos testes, entre outros pontos que podem fragilizar o código, então, sempre que se deparar com um código grande tente não deixa-lo maior e se possível ate reduzir mantendo a garantida da funcionalidade, ouvi em alguns lugares de estudos que o programador deve ser igual a um escoteiro acampando, quando ele for embora deve deixar o lugar mais limpo que quando chegou, isso se aplica perfeitamente no nosso contexto, sempre que puder agregar aplicando clean code, principalmente relacionado a métodos complexos, faça!
Agora fazendo o comparativo com as soluções apresentadas podemos ver o tamanho da mudança realizada referente a esse ponto, quanto no antigo que pegamos todas as regras e imputamos em uma única classe e um unico método, na outra solução, dividimos as responsailidades entre classes e metodos seguindo o principio de responsabilidade única do solid e aplicando o clean code, o que nos trouxe uma redução de mas ou menos 80% do código principal, agora além que facilitar a manutenção que podemos trabalhar em pontos isolados ou ate mesmo dividir entre os devs, teremos uma cobertura dos testes mais consistentes, sem falar da leitura que ficará muito mais fácil do analista encontrar o ponto de melhoria ou ajuste caso precise.

# 5 - Numeros mágicos

Na nossa solução aplicando clean code apliquei essa estratégi para valores usados globalmente.
Um ponto a ser observado e que pode ser melhorado é que esses dados ficaram junto com a classe de repositorio, o que não esta errado, mas poderia estar mais vinculado ao domínio, mas como não é o foco do artigo, e o exemplo é apenas didático, manteremos lá "pelo menos nesta primeira versão". Aproveitando que tocamos nos pontos sobre a didática e repositório vale a pena mencionar que o repositório no nosso é apenas uma camada que mantive valores fixos, pois não havia necessidade de criar um banco de dados para o exemplo, mas em um projeto real, devemos nos atentar para esta camada da aplicação para não conflitar entidades com negócio.

# 6 - Manutenibilidade

Fazendo uma analogia que tudo anterior a agora é passado e utilizando em projeto, podemos dizer que o codigo de ontem já é um "legado", não necessariamente como dizemos em nosso trabalho sobre sistemas descontinuados, ou que serão substituidos, ou com código com versões muito desatualizadas, no sentido de que todo código de ontem esta passivel a um ajuste ou correção hoje, basta mudar alguma regra negocial ou entrar demandas novas relacionadas aquele negócio.
Vamos fazer uma reflexão, olhe para os 2 códigos e seja sincero consigo mesmo, se houver a necessidade de incluir uma tarifa a mais por exemplo uma tarifa sobre manutenção do tanque reservatório, em qual das soluções você ia preferir trabalhar. 
Este é o ponto, provavelmente voce escolheria o segundo, pois quando mencionei a regra você ja imaginou aplicando a solução no segundo enquanto o primeiro voce provavelmetne passou algumas vezes para identificar o ponto de ajuste e se perguntassem para você qual seria mais fácil de garantir que não quebraria outro ponto, você se sentiria masi confortavél no segundo. Baseando-se nisso podemos demonstrar as vantages de aplicar clean code, pois a manutenção é mais fácil, e segura. Por isso vale a pena gastar um pouco de mais tempo codificando no início para evitar retrabalho no final.

# 7 - Testabilidade

Comparando as 2 soluções rapidamente podemos ver quais testes podemos fazer e o quanto ele estaria coberto, a primeira solução ao aplicar um teste unitário podemos perceber que o nosso teste seria apenas criando uma entrada e validando sua saida, ou seja praticamente um teste funcional, esse teste não garantiria os regras indiretas que estão sendo aplicadas dentro da funcionalidade, como por exemplo se o calculo de todas as tarifas estão corretos, pois avaliando somente a saida e uma taxa que deveria ser 0.01 fosse 0.02 e outra que devesse ser 0.02 fosse 0.01 o resultado poderia ser o mesmo. Já na segunda solução podemos cobrir de testes exatamente o calculo de uma determinada taxa, e se houvesse alteraçã poderiamos garantir que outro ponto nao seria afetado.
Com esses pontos apontados já podemos ver a aplicabilidade e importancia de tentar segregar o négocio aplicando clean code.

# Conclusão

Acredito ter passado por alguns pontos importantes sobre clean code, nesses artigos sobre o assunto, espero ter agregado em sua aprendizagem, este conteúdo pode conter erros de escritas, e foi criado com minhas interpretações sobre meu tempo de trabalho e estudos, então se você tem algo a acrescentar, ou corrigir, fique a vontade para contribuir, será um prazer receber seu feedback.

# Observação

Neste artigo não descrevi sobre tipagem de variáveis nem tratamentos de erros, acho que ja foi bem descrito no primeiro artigo, e não foquei nesta primeira versão da solução, fique a vontade para entrar em contato ou contribuir. 

# Introduction

Hello, welcome to the Clean Code study repository. If you got here, you've probably already been through the repository with details about what Clean Code is and why it's important and examples of codes that have not been applied and brief descriptions of the details.
If not, I recommend that you read the [README.md](../bad_solution/README.md) of the previous repository before continuing, it will give you a better basis for understanding what is happening here.

Now that we have aligned, I understand that you already have a basis on what Clean Code is, the idea of the article was to propose a problem and apply two solutions, one that does not follow the principles of Clean Code and another that follows, as mentioned above you must have already read the previous article, with examples of codes that do not follow the principles of Clean Code, now let's see an example of code that follows the principles of Clean Code.

# Points to be addressed:

- [1 - Naming of variables, methods, classes, etc.](#1---naming-of-variables-methods-classes-etc)
- [2 - Comments](#2---comments)
- [3 - Code structure](#3---code-structure)
- [4 - Method size](#4---method-size)
- [5 - Magic numbers](#5---magic-numbers)
- [6 - Maintainability](#6---maintainability)
- [7 - Testability](#7---testability)

Note: About how important each step is, I will not describe it because it has already been briefly described in the article with an example of code that was not applied to clean code, so if you have not read it yet, I recommend that you read it before continuing.

# 1 - Naming of variables, methods, classes, etc.

When opening the [``gas-station.ts``](gas-station.service.ts) file, it can already be seen that there have been major changes, one of them on this topic, despite the decrease in the use of variables, it can be seen that the ones that remained are clearer and already show us the value that will be assigned to it, if you navigate between the other classes you will notice that the same will happen, a cool point that can be noticed and not many times applied is about the variable ``taxesServiceList``, which as the name already induces stores a list of the classes responsible that will calculate the tax, all this because it implements an interface that will be explained in the next topics.

# 2 - Comments

In all classes we can see that the comments were practically extinguished, not that this is a rule or exactly a good practice, but think with me, if your code is well written, with names that induce understanding together with the other good practices, do you think it will really be necessary to apply comments? Well, in my view I believe not. But of course there are points that only good practices cannot solve, such as, for example, when there is a rule that depends on other external factors or the change will be made to adjust some change in components, among other points we cannot take the rule that code without comments is the perfect world, but we can use it as an analysis to refactor and apply good practices. Speaking a little more about this subject when it is necessary to use comments, always try to use types of comments necessary for each situation, seeking for example when to use ``//`` or ``/* */`` or ``/** */``.

# 3 - Code structure

On this topic I know that each one has a way of working, and each language has its documentation, but it is not about this point that I say here, but about the structure in coding, how do you organize yourself in the code, well for example, are you one of those who declares global variables at the beginning of the method or just on the line before the start of its use? I'm not saying that one way is right and the other is wrong, but depending on the complexity it can be more verbose to read, for this big companies usually create styles, guideline, or at least evaluate in code rewiews this point, the idea here is "always worry about readability", if you open a class or a project and you are already very lost right at the beginning, there is something that is not good, do you agree? So, to demonstrate this in the examples made, you can check the number of classes created by comparing with the example of not using the principles, this means more files, but at the same time more specialization for each one, if you look at the folder structure you will notice that there is a ``taxes`` folder that group the service classes responsible for the name of the folder, another point is that if you open to evaluate the codes you will notice that the structure does not have lines with more than 3 or 4 tabulations, this is an important point, not mandatory, but important, because if you have many tabulations, it means that your code could be divided into more methods or classes, whenever you see a "hadouken" block vulgarly known as demonstrated in the previous article, we can already open an alert for improvements.

# 4 - Method size

Aligned with the previous topic methods with many lines of code in addition to bringing
excess tabulations can among other things like excessive complexity, rules that could be separated into other methods, and perhaps even reused, reduction in test coverage, among other points that can weaken the code, so whenever you come across a large code try not to make it bigger and if possible even reduce it while maintaining the guaranteed functionality, I heard in some study places that the programmer should be like a camping scout, when he leaves he must leave the place cleaner than when he arrived, this applies perfectly in our context, whenever you can add applying clean code, especially related to complex methods, do it!
Now making the comparison with the presented solutions we can see the size of the change made regarding this point, as in the old one we took all the rules and imputed them in a single class and a single method, in the other solution, we divided the responsibilities between classes and methods following the single responsibility principle of solid and applying clean code, which brought us a reduction of but or less 80% of the main code, now besides that facilitate maintenance that we can work on isolated points or even divide among the devs, we will have a more consistent test coverage, not to mention the reading that will be much easier for the analyst to find the point of improvement or adjustment if necessary.

# 5 - Magic numbers

In our solution applying clean code I applied this strategy for values used globally.
A point to be observed and that can be improved is that this data was kept together with the repository class, which is not wrong, but could be more linked to the domain, but as it is not the focus of the article, and the example is only didactic, we will keep it there "at least in this first version". Taking advantage that we touched on the points about the didactics and repository it is worth mentioning that the repository in ours is only a layer that kept fixed values, because there was no need to create a database for the example, but in a real project, we must pay attention to this layer of the application so as not to conflict entities with business.

# 6 - Maintainability

Making an analogy that everything before now is past and using in the project, we can say that yesterday's code is already a "legacy", not necessarily as we say in our work about discontinued systems, or that will be replaced, or with code with very outdated versions, in the sense that all yesterday's code is subject to a change or correction today, just change some business rule or enter new demands related to that business.
Let's do a reflection, look at the 2 codes and be honest with yourself, if there is a need to include an extra fee for example a fee on maintenance of the reservoir tank, in which of the solutions would you prefer to work.
This is the point, you would probably choose the second, because when I mentioned the rule you already imagined applying the solution in the second while the first you probably passed a few times to identify the adjustment point and if they asked you which one would be easier to guarantee that it would not break another point, you would feel more comfortable in the second. Based on this we can demonstrate the advantages of applying clean code, because maintenance is easier, and safer. So it is worth spending a little more time coding at the beginning to avoid rework in the end.

# 7 - Testability

Comparing the 2 solutions quickly we can see which tests we can do and how much it would be covered, the first solution when applying a unit test we can notice that our test would only be creating an input and validating its output, that is, practically a functional test, this test would not guarantee the indirect rules that are being applied within the functionality, such as for example if the calculation of all fees are correct, because evaluating only the output and a fee that should be 0.01 was 0.02 and another that should be 0.02 was 0.01 the result could be the same. In the second solution we can cover tests exactly the calculation of a certain fee, and if there was a change we could guarantee that another point would not be affected.
With these points pointed out we can already see the applicability and importance of trying to segregate the business applying clean code.

# Conclusion

I believe I have gone through some important points about clean code, in these articles on the subject, I hope to have added to your learning, this content may contain writing errors, and was created with my interpretations about my work and study time, so if you have something to add, or correct, feel free to contribute, it will be a pleasure to receive your feedback.

# Note

In this article I did not describe about variable typing or error handling, I think it has already been well described in the first article, and I did not focus on this first version of the solution, feel free to contact or contribute.