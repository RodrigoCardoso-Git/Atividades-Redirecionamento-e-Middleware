import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const studentService = {
  async getAll() {
    return prisma.student.findMany()
  },

  async getById(id: number) {
    return prisma.student.findUnique({ where: { id } })
  },

  async create(data: { name: string; email: string; course: string }) {
    return prisma.student.create({ data })
  },

  async update(
    id: number,
    data: Partial<{ name: string; email: string; course: string }>
  ) {
    return prisma.student.update({ where: { id }, data })
  },

  async delete(id: number) {
    return prisma.student.delete({
      where: { id }
    })

  },
};