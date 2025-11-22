import type { FastifyReply, FastifyRequest } from
  "fastify"
import { studentService } from
  "../services/students.service.js"

export const studentController = {
  //Listar todos os alunos
  async list(_req: FastifyRequest, reply: FastifyReply) {
    const students = await studentService.getAll()
    return reply.send(students)
  },

  //Buscar aluno por ID
  async get(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }

    const student = await studentService.getById(Number(id))

    if (!student) {
      return reply.status(404).send({
        error:

          "Aluno não encontrado"
      })
    }
    return reply.send(student)
  },

  //Criar novo aluno
  async create(req: FastifyRequest, reply: FastifyReply) {
    const { name, email, course, enrollmentYear }
      = req.body as any

    try {
      const newStudent = await studentService.create({ name, email, course })
      return reply.status(201).send(newStudent)
    } catch (error: any) {
      // Tratamento de erros (ex: email duplicado)
      return reply.status(400).send({
        error:
          error.message
      })
    }
  },

  // Atualizar aluno
  async update(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string }
    const data = req.body as any

    try {
      const updated = await studentService.update(Number(id), data)
      return reply.send(updated)
    } catch (error: any) {
      return reply.status(404).send({
        error:
          "Aluno não encontrado"
      })
    }
  },

  // Remover aluno
  async remove(req: FastifyRequest, reply: FastifyReply) {

    const { id } = req.params as { id: string }

    try {
      await studentService.delete(Number(id))
      return reply.status(204).send()
    } catch (error: any) {
      return reply.status(404).send({
        error:
          "Aluno não encontrado"
      })
    }
  },
}