import { prisma } from "../lib/prisma";

class CategoryRepository {
  async create(name: string) {
    return prisma.category.create({ data: { name } });
  }

  async findAll() {
    return prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  }

  async findById(id: number) {
    return prisma.category.findUnique({ where: { id } });
  }

  async delete(category_id: number) {
    return prisma.category.delete({
      where: { id: category_id },
    });
  }
}

const category_repository = new CategoryRepository();
export default category_repository;
