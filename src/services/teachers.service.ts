import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const teacherService = {
  async getAll() {
    return prisma.teacher.findMany()
  },

  async getById(id: number) {
    return prisma.teacher.findUnique({ where: { id } })
  },

  async create(data: { name: string; email: string; course: string }) {
    return prisma.teacher.create({ data })
  },

  async update(
    id: number,
    data: Partial<{name: string; email: string; course: string}>
  ){
    return prisma.teacher.update({ where: { id }, data })
  },

  async delete(id: number) {
    return prisma.teacher.delete({ where: { id } })
  },
}
