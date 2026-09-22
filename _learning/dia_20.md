# MVC

Em uma visão "grosseira" do BE, o fluxo começa no **controller**, o local onde entra a requisição do usuário, o controller não serve para computar nada, ele apenas usa as ferramentas que estão "disponíveis" nos **models** (caixa de ferramenta).

> Controller (entra a requisição) -> Model (computa) -> Controller -> View

Controllers coordenam as operações entre 1 ou mais Models que executam as ações, enquanto as Views devolvem os dados para os consumidores.

1. Por que criar uma abstração a mais de model?

- Re-aproveitamento de código;
- Manutenção de código;
