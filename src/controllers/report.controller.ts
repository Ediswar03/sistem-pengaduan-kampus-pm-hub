import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import PDFDocument from 'pdfkit';

export const exportReportPDF = async (req: Request, res: Response): Promise<void> => {
  try {
    const complaints = await prisma.complaint.findMany({
      include: {
        category: true,
        student: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Rekap_Pengaduan_Kampus.pdf"');

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc.fontSize(20).text('Laporan Rekapitulasi Pengaduan Kampus', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`, { align: 'right' });
    doc.moveDown();

    complaints.forEach((c, index) => {
      doc.fontSize(12).font('Helvetica-Bold').text(`${index + 1}. [${c.priority || 'UNSET'}] ${c.title}`);
      doc.font('Helvetica').fontSize(10)
         .text(`Status: ${c.status}`)
         .text(`Kategori: ${c.category?.name || '-'}`)
         .text(`Pelapor: ${c.student?.name || '-'}`)
         .text(`Tanggal: ${c.createdAt.toLocaleDateString('id-ID')}`)
         .moveDown(0.5);
    });

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Gagal membuat dokumen PDF" });
    }
  }
};
