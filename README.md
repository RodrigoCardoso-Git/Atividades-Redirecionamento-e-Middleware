# 🚀 Atividades - Redirecionamento e Middleware (Fastify)

## ✨ Descrição

Este projeto implementa conceitos essenciais de desenvolvimento de APIs utilizando o framework **Fastify** com **TypeScript**. O foco está em duas funcionalidades cruciais no fluxo de requisição:

1.  **Middleware Global de Logs (Auditoria):** Utilização dos *hooks* `onRequest` e `onResponse` do Fastify para criar um sistema de auditoria que registra informações avançadas de todas as requisições (tempo de processamento, IP, status, etc.) em um arquivo `logs/access.log`.
2.  **Redirecionamento Condicional:** Implementação de uma rota `/login` que simula uma lógica de autenticação dinâmica. A rota verifica a validade da credencial através de três fontes distintas (Header, Query Parameter e Cookie) e, em caso de sucesso, redireciona automaticamente para a rota `/dashboard`.

## 🛠️ Tecnologias

* **Framework:** [Fastify](https://www.fastify.io/)
* **Linguagem:** TypeScript
* **Plugins:** `@fastify/cookie`
* **Módulos Node.js:** `fs` (para manipulação de arquivos de log)
* **Ferramentas:** `ts-node`
