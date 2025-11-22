import type { FastifyInstance } from 'fastify'
import { studentController } from '../controllers/students.controller.js'

export async function studentRoutes(app: FastifyInstance) {
  app.get('/students', studentController.list)
  app.get('/students/:id', studentController.get)
  app.post('/students', studentController.create)
  app.put('/students/:id', studentController.update)
  app.delete('/students/:id', studentController.remove)
}