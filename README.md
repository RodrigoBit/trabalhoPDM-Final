# Almox · Controle de estoque

Aplicativo de almoxarifado desenvolvido com Expo, React Native e TypeScript. O operador entra com credenciais de demonstração, cadastra produtos, consulta o inventário e registra retiradas.

## Executar no navegador

Na pasta do projeto, com Node.js 22 LTS ou 24 e pnpm instalado, execute os comandos abaixo.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Abra [o aplicativo na porta 8081](http://localhost:8081). Use o botão **Preencher** ou digite o e-mail `admin@almox.app` e a senha `Almox123`.

## Conferir o fluxo e as evidências

1. Abra o login e entre com a conta de teste. A tela apresenta um indicador de carregamento durante a autenticação simulada.
2. Em **Cadastro**, registre “Papel kraft” por R$ 18,90 com 8 unidades.
3. Em **Estoque**, confira o preço, o código gerado e o saldo de 8 unidades.
4. Em **Saída**, busque “kraft”, abra o seletor e escolha “Papel kraft”. Uma retirada de 9 unidades exibe o erro de saldo insuficiente. Registre a retirada de 3.
5. Confira o recibo da baixa e volte ao estoque. O saldo passa a 5 unidades e o indicador muda para **Baixo**.

| Tela ou operação | Captura da versão web |
| --- | --- |
| Login | [Abrir print](docs/prints/01-login.png) |
| Cadastro preenchido | [Abrir print](docs/prints/02-cadastro.png) |
| Estoque após a baixa | [Abrir print](docs/prints/03-estoque.png) |
| Busca e seletor aberto | [Abrir print](docs/prints/04-saida-busca.png) |
| Confirmação da baixa | [Abrir print](docs/prints/05-baixa-registrada.png) |

Com o servidor em execução, abra outro terminal na mesma pasta para repetir o teste e gerar os cinco PNGs. O teste usa um perfil temporário do Chromium.

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

## Estado e arquitetura

O estoque começa com quatro materiais de exemplo. Saldos de 1 a 5 unidades recebem o indicador **Baixo** e o saldo zero aparece como **Esgotado**. A Context API compartilha os produtos entre abas e atualiza o saldo após cada operação. Na web, o navegador guarda os produtos em armazenamento local. Em Android e iOS, o estoque dura pela sessão do aplicativo. O login é simulado e deve ser refeito ao reiniciar.

- `src/pages/` reúne as quatro telas. Cada tela tem um arquivo `styles.ts` ao lado de `index.tsx`.
- `src/components/` reúne campos, botões, cabeçalho, painéis e mensagens reutilizáveis com estilos isolados.
- `src/routes/` define a pilha de autenticação e o navegador inferior tipado. O login e a saída da sessão reiniciam a pilha de rotas.
- `src/context/` gerencia a sessão e as operações compartilhadas de estoque.
- `src/models/` contém os tipos de domínio, os dados iniciais e as regras de quantidade, preço e status.
- `src/global/` define a paleta e os valores visuais compartilhados.

Para verificar a tipagem e exportar a versão web para `dist/`, execute os dois comandos.

```bash
pnpm check
pnpm build
```

## Publicar a entrega no GitHub

Em um terminal autenticado com o GitHub CLI, execute os comandos na pasta do projeto para criar o repositório público e obter o link de entrega. Para conectar a conta pela primeira vez, use `gh auth login`.

```bash
git init -b main
git add .
git commit -m "Entrega do aplicativo Almox com evidências"
gh repo create trabalhoPDM-Final --public --source=. --remote=origin --push
gh repo view --json url --jq .url
```
