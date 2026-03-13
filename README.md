# EZ Tax Frontend

## Execução local
Para executar o projeto localmente, siga os passos abaixo:

1. Instale as dependencias

```bash
$ npm install
```

2. Defina um arquivo `.env.development` na raiz do projeto com as seguintes variáveis

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<YOUR_CLERK_SECRET_KEY>
```

3. Execute o script de inicialização

```bash
$ npm run dev
```
