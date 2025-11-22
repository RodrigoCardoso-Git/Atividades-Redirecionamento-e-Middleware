import Fastify from 'fastify'
import fs from 'fs'
import { loginRoutes } from './routes/login.route.js'
import cookie from '@fastify/cookie' 

// Cria a pasta /logs se ela não existir
if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs")
}

const app = Fastify({
    logger: true,
    ajv: {
        customOptions: {
            removeAdditional: 'all',
            useDefaults: true,
            coerceTypes: true,
        },
    },
})

// Tipagem para adicionar a propriedade de tempo de início na requisição
declare module 'fastify' {
    interface FastifyRequest {
        startTime?: bigint // Usado para calcular o TEMPO (5)
    }
}

// Essencial para que a rota /login consiga ler o header 'Cookie' e acessar 'req.cookies'
app.register(cookie) 

// TAREFA 1

// onRequest: Captura o início da requisição e registra a hora inicial (R1)
app.addHook("onRequest", async (req, reply) => { 
    req.startTime = process.hrtime.bigint() 
})

// onResponse: Captura o fim, calcula o tempo e registra o log no arquivo (R1, R2)
app.addHook("onResponse", async (req, reply) => { 
    
    // 5. Cálculo do Tempo total
    const endTime = process.hrtime.bigint()
    const diff = endTime - (req.startTime ?? endTime)
    const timeMs = (Number(diff) / 1_000_000).toFixed(2)

    // 3. Timestamp exato
    const timestamp = new Date().toISOString()
    
    // 4. IP do cliente (ou simulado se estiver local)
    const ip = req.ip 

    // 1. Método HTTP, 2. URL acessada
    const method = req.method
    const url = req.url

    // 6. Código de status da resposta
    const status = reply.statusCode

    // Formato do log 
    const logLine = `[${timestamp}] IP: ${ip} | ${method} ${url} | STATUS: ${status} | TEMPO: ${timeMs}ms\n`

    // 7. Registrar em um arquivo .log (R2)
    fs.appendFileSync("logs/access.log", logLine)
    
    // Log no console para feedback imediato
    console.log(`[LOG AUDITORIA] ${logLine.trim()}`) 
})


// TAREFA 2
app.register(loginRoutes)

// Rotas de teste para garantir que o middleware está funcionando
app.get('/test', async (req, reply) => {
    return { message: "Rota de teste OK" }
})

// Inicializa o servidor
async function start() {
    try {
        await app.listen({ port: 3000 })
        console.log(`Servidor rodando em http://localhost:3000`)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()