import { prisma } from "../lib/prisma";

class NoteRepository {
  async create(data: { title: string; content: string }) {
    return prisma.note.create({ data });
  }

  async findAllActive() {
    return prisma.note.findMany({
      where: { archived: false },
      orderBy: { created_at: "desc" },
    });
  }

  async findAllArchived() {
    return prisma.note.findMany({
      where: { archived: true },
      orderBy: { created_at: "desc" },
    });
  }

  async findById(note_id: number) {
    return prisma.note.findUnique({
      where: { id: note_id },
      include: { categories: true },
    });
  }

  async update(note_id: number, data: { title?: string; content?: string }) {
    return prisma.note.update({
      where: { id: note_id },
      data,
    });
  }

  async delete(note_id: number) {
    return prisma.note.delete({
      where: { id: note_id },
    });
  }

  async archive(note_id: number) {
    return prisma.note.update({
      where: { id: note_id },
      data: { archived: true },
    });
  }

  async unarchive(note_id: number) {
    return prisma.note.update({
      where: { id: note_id },
      data: { archived: false },
    });
  }

  async addCategory(note_id: number, category_id: number) {
    return prisma.note.update({
      where: { id: note_id },
      data: {
        categories: { connect: { id: category_id } },
      },
    });
  }

  async removeCategory(note_id: number, category_id: number) {
    return prisma.note.update({
      where: { id: note_id },
      data: {
        categories: { disconnect: { id: category_id } },
      },
    });
  }

  async findNotesByCategory(category_id: number) {
    return prisma.note.findMany({
      where: {
        categories: {
          some: { id: category_id },
        },
      },
      orderBy: { created_at: "desc" },
    });
  }
}

const note_repository = new NoteRepository();
export default note_repository;
