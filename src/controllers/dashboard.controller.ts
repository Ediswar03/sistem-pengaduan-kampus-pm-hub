import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getDashboardSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const statusSummary = await prisma.complaint.groupBy({
      by: ['status'],
      _count: { id: true }
    });

    const categorySummary = await prisma.complaint.groupBy({
      by: ['categoryId'],
      _count: { id: true }
    });

    const categories = await prisma.category.findMany();
    const formattedCategorySummary = categorySummary.map(item => ({
      category: categories.find(c => c.id === item.categoryId)?.name || 'Unknown',
      count: item._count.id
    }));

    const prioritySummary = await prisma.complaint.groupBy({
      by: ['priority'],
      _count: { id: true },
      where: {
        priority: { not: null }
      }
    });

    res.status(200).json({
      message: "Data dashboard berhasil dimuat",
      data: {
        byStatus: statusSummary.map(s => ({ status: s.status, count: s._count.id })),
        byCategory: formattedCategorySummary,
        byPriority: prioritySummary.map(p => ({ priority: p.priority, count: p._count.id }))
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
};
