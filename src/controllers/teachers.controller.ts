import type { FastifyReply, FastifyRequest } from "fastify"
import { teacherService } from "../services/teachers.service"

export const teacherController = {
  //Listar todos os professores
  async list(_req: FastifyRequest, reply: FastifyReply) {
    const teachers = await teacherService.getAll();
    return reply.send(teachers);
  },

  //Buscar professor por ID
  async get(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    
    const teachers = await teacherService.getById(Number(id))

    if (!teachers) {
      return reply.status(404).send({error: "Professor não encontrado"})
    }
    return reply.send(teachers)
  },

  //Criar novo professor
  async create(req: FastifyRequest, reply: FastifyReply) {
    const { name, email, course}
      = req.body as any

    try {
      const newTeacher = await

        teacherService.create({ name, email, course })
      return reply.status(201).send(newTeacher)
    } catch (error: any) {
      // Tratamento de erros (ex: email duplicado)
      return reply.status(400).send({
        error:
          error.message
      })
    }
  },

  // Atualizar professor
  async update(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const data = req.body as any

    try {
      const updated = await teacherService.update(Number(id), data)

      return reply.send(updated)
    } catch (error: any) {
      return reply.status(404).send({
        error:
          "Professor não encontrado"
      })
    }
  },

  // Remover professor
  async remove(req: FastifyRequest, reply: FastifyReply) {

    const { id } = req.params as { id: string }

    try {
      await teacherService.delete(Number(id))
      return reply.status(204).send()
    } catch (error: any) {
      return reply.status(404).send({
        error:
          "Professor não encontrado"
      })
    }
  },
}