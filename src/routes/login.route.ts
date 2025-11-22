import { FastifyInstance } from "fastify"

export async function loginRoutes(app: FastifyInstance) {

    // Rota /dashboard - Destino do redirecionamento
    app.get("/dashboard", async (req, reply) => {
        const { source } = req.query as { source: string } 
        return { 
            message: `Bem-vindo ao Dashboard!`,
            authenticated_via: source ?? 'desconhecido'
        }
    })

    /**
     * Rota /login com Redirecionamento Condicional 
     */
    app.get("/login", async (req, reply) => {
        // Token válido de exemplo (Regra 1)
        const VALID_TOKEN = "Bearer 12345"

        // 1. Verificar Token válido nos headers (Authorization)
        const authHeader = req.headers.authorization
        if (authHeader === VALID_TOKEN) {
            console.log("Redirecionamento via Header Token")
            // Redirecionar para /dashboard?source=token
            return reply.redirect("/dashboard?source=token")
        }

        // 2. Verificar o parâmetro ?auth=true 
        const { auth } = req.query as { auth?: string } 
        if (auth === "true") {
            console.log("Redirecionamento via Query Parameter")
            // Redirecionar para /dashboard?source=query
            return reply.redirect("/dashboard?source=query")
        }

        // 3. Verificar o cookie chamado session=ok 
        
        // Exemplo: 'session=ok' no header Cookie
        const cookies = req.headers.cookie 
        if (cookies && cookies.includes("session=ok")) {
             console.log("Redirecionamento via Cookie")
             
            // Redirecionar para /dashboard?source=cookie
            return reply.redirect("/dashboard?source=cookie")
        }

        // 4. Se nenhuma forma de autenticação for válida (Regra 4)
        console.log("Acesso negado")
        reply.status(401)
        return {
            "error": "Acesso negado. Nenhuma forma de autenticação encontrada."
        }
    })
}