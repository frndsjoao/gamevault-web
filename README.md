# GameVault Web 🎮

Aplicação web moderna para gerenciar sua coleção de jogos. Organize, avalie e acompanhe o progresso dos seus jogos favoritos em uma interface intuitiva e responsiva.

![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-cyan)

## 📋 Features

### Gerenciamento de Jogos
- ✅ **Dashboard Organizado** - Visualize seus jogos separados por status (Backlog, Jogando, Finalizados)
- ✅ **Busca Integrada** - Pesquise jogos diretamente da base de dados IGDB
- ✅ **Quick Add** - Adicione jogos rapidamente ao seu backlog
- ✅ **Multiplataforma** - Suporte para PC, PlayStation, Xbox e Nintendo Switch
- ✅ **Sistema de Rating** - Avalie seus jogos com estrelas (0-5)
- ✅ **Tracking de Conquistas** - Marque jogos platinados
- ✅ **Datas de Conclusão** - Registre quando finalizou cada jogo

### Categorias de Status
- **Backlog** - Jogos que você quer jogar
- **Playing** - Jogos que está jogando atualmente
- **Finished** - Jogos completados
- **Replay** - Jogos que está rejogando
- **Abandoned** - Jogos que parou de jogar

### Experiência do Usuário
- 🎨 Interface dark mode otimizada
- 📱 Design totalmente responsivo (mobile-first)
- 🎉 Animações de celebração ao completar jogos
- ⚡ Performance otimizada com cache inteligente
- 🔔 Notificações toast para feedback instantâneo

## 🚀 Tecnologias

### Core
- **React 19.1.1** - Biblioteca UI com as últimas features
- **TypeScript 5.9.3** - Type safety e melhor DX
- **Vite 7.1.7** - Build tool extremamente rápido com HMR

### State Management
- **TanStack React Query 5.90.5** - Server state, cache e sincronização
- **Zustand 5.0.8** - Client state management leve e simples

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Componentes acessíveis e headless
- **Lucide React** - Biblioteca de ícones moderna
- **React Icons** - Ícones adicionais (plataformas de games)

### Forms & Validation
- **React Hook Form 7.65.0** - Formulários performáticos
- **Zod 4.1.12** - Schema validation TypeScript-first

### Utilities
- **Axios 1.12.2** - Cliente HTTP
- **Date-fns 4.1.0** - Manipulação de datas
- **React Toastify 11.0.5** - Sistema de notificações
- **Canvas Confetti 1.9.4** - Animações de celebração

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Backend API rodando (GameVault API)

### Setup

1. **Clone o repositório**
```bash
git clone <repository-url>
cd gamevault-web
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
# URL da API backend
VITE_API_DEVURL=http://localhost:3000

# Chaves para localStorage (pode usar qualquer string)
VITE_LOCALSTORAGE_TOKEN=gamevault_token
VITE_LOCALSTORAGE_EMAIL=gamevault_email

# Ambiente
VITE_ENV=development
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🏗️ Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Linting do código
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── @types/           # Definições de tipos TypeScript
│   ├── game.ts       # Interfaces de jogos
│   ├── user.ts       # Interfaces de usuário
│   └── apiError.ts   # Tipos de erro da API
│
├── components/       # Componentes React
│   ├── common/       # Componentes reutilizáveis
│   ├── layout/       # Componentes de layout e modais
│   └── ui/           # Primitivos Radix UI
│
├── pages/            # Páginas da aplicação
│   ├── Dashboard.tsx
│   ├── Gamelist.tsx
│   ├── Login.tsx
│   └── SignUp.tsx
│
├── hooks/            # Custom hooks
│   ├── queries/      # React Query hooks (GET)
│   └── mutations/    # React Query hooks (POST/PUT/DELETE)
│
├── services/         # Comunicação com API
│   ├── api/          # Cliente Axios e endpoints
│   ├── auth.service.ts
│   ├── games.service.ts
│   └── user.service.ts
│
├── store/            # Zustand stores
│   └── user.ts       # Estado global do usuário
│
├── schemas/          # Schemas de validação Zod
│   ├── authSchema.ts
│   └── gameFormSchema.ts
│
├── utils/            # Funções utilitárias
│   ├── localStorage.ts
│   ├── platforms.ts
│   └── status.ts
│
├── styles/           # Estilos globais
│   ├── colors.ts
│   └── global.css
│
└── routes/           # Configuração de rotas
    ├── index.tsx
    └── PrivateRoute.tsx
```

## 🔑 Principais Features Técnicas

### Optimistic Updates
O app utiliza React Query para implementar **optimistic updates**, garantindo que a UI atualize instantaneamente mesmo antes da resposta do servidor:

```typescript
// Exemplo em useUpdateGameQuery
onMutate: async ({ id, game }) => {
  // Atualiza cache imediatamente
  queryClient.setQueryData(['dashboard'], (old) => {
    // Lógica de atualização otimista
  })
}
```

### Cache Inteligente
React Query gerencia automaticamente o cache de dados, evitando requisições desnecessárias e melhorando a performance.

### Validação de Formulários
Todos os formulários usam Zod + React Hook Form para validação type-safe em tempo real.

### Autenticação
Sistema de autenticação JWT com:
- Token armazenado em localStorage
- Interceptors Axios para adicionar Bearer token
- Logout automático em caso de 401
- Rotas protegidas com PrivateRoute

## 🎨 Personalização

### Cores
As cores são configuradas em [src/styles/colors.ts](src/styles/colors.ts) e podem ser personalizadas no Tailwind:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#22d3ee',
      // ... suas cores
    }
  }
}
```

### Componentes UI
Os componentes Radix UI podem ser customizados em `src/components/ui/`. A configuração está em [components.json](components.json).

## 🔒 Segurança

- **Content Security Policy** configurada
- **Validação de entrada** em todos os formulários
- **Sanitização de dados** da API
- **Rotas protegidas** com verificação de token

## 📱 Responsividade

O design é mobile-first com breakpoints:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para abrir issues ou pull requests.

## 📄 Licença

Este projeto é privado e de uso pessoal.

## 🙏 Agradecimentos

- **IGDB** - Base de dados de jogos
- **Radix UI** - Componentes acessíveis
- **TanStack Query** - State management incrível
- **Tailwind CSS** - Styling sem dor de cabeça

---

**Desenvolvido com ❤️ para gamers que amam organização**
