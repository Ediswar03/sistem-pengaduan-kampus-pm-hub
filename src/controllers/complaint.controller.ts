import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../utils/prisma';

export const createComplaint = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, location, categoryId } = req.body;
    const studentId = req.user?.id;
    
    if (!studentId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const attachmentUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !description || !categoryId) {
      res.status(400).json({ error: "Judul, deskripsi, dan kategori wajib diisi" });
      return;
    }

    const newComplaint = await prisma.complaint.create({
      data: {
        title,
        description,
        location,
        attachmentUrl,
        categoryId: parseInt(categoryId),
        studentId: studentId,
        status: 'DIAJUKAN',
      }
    });

    res.status(201).json({
      message: "Pengaduan berhasil diajukan",
      data: newComplaint
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

export const getComplaints = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userRole = req.user?.role;
    const userId = req.user?.id;
    const unitId = req.user?.unitId;

    let whereClause = {};

    if (userRole === 'MAHASISWA') {
      whereClause = { studentId: userId };
    } else if (userRole === 'PETUGAS') {
      whereClause = { unitId: unitId }; // or assigneeId
    }
    // ADMIN dan PIMPINAN can see all

    const complaints = await prisma.complaint.findMany({
      where: whereClause,
      include: {
        category: true,
        student: { select: { name: true } },
        unit: true,
        assignee: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ data: complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

export const getComplaintById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const complaint = await prisma.complaint.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        student: { select: { name: true } },
        unit: true,
        assignee: { select: { name: true } },
        comments: {
          include: { user: { select: { name: true, role: true } } }
        }
      }
    });

    if (!complaint) {
      res.status(404).json({ error: "Pengaduan tidak ditemukan" });
      return;
    }

    res.json({ data: complaint });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

export const updateComplaintStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // In a real app we'd check if the user is authorized for this specific complaint
    const updated = await prisma.complaint.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.json({ message: "Status berhasil diperbarui", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

export const verifyComplaint = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { priority, categoryId, status } = req.body;

    const updated = await prisma.complaint.update({
      where: { id: parseInt(id) },
      data: {
        priority,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        status: status || 'DIVERIFIKASI'
      }
    });

    res.json({ message: "Pengaduan berhasil diverifikasi", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};

export const assignComplaint = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { unitId, assigneeId } = req.body;

    const updated = await prisma.complaint.update({
      where: { id: parseInt(id) },
      data: {
        unitId: unitId ? parseInt(unitId) : undefined,
        assigneeId: assigneeId ? parseInt(assigneeId) : undefined,
        status: 'DIPROSES'
      }
    });

    res.json({ message: "Pengaduan berhasil didistribusikan", data: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};
