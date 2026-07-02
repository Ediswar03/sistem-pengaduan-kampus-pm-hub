import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add a new comment to a complaint
export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // complaint ID
    const { content } = req.body;
    // req.user is set by authenticate middleware
    const userId = (req as any).user.id;

    if (!content) {
      res.status(400).json({ message: 'Isi komentar tidak boleh kosong' });
      return;
    }

    // Check if complaint exists
    const complaint = await prisma.complaint.findUnique({
      where: { id: Number(id) }
    });

    if (!complaint) {
      res.status(404).json({ message: 'Pengaduan tidak ditemukan' });
      return;
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        complaintId: Number(id),
        userId: userId
      },
      include: {
        user: {
          select: {
            name: true,
            role: true
          }
        }
      }
    });

    res.status(201).json({ message: 'Komentar berhasil ditambahkan', data: newComment });
  } catch (error) {
    console.error('Error in createComment:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

// Get all comments for a complaint
export const getCommentsByComplaint = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const comments = await prisma.comment.findMany({
      where: { complaintId: Number(id) },
      include: {
        user: {
          select: {
            name: true,
            role: true
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    res.status(200).json({ data: comments });
  } catch (error) {
    console.error('Error in getCommentsByComplaint:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};
