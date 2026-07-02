import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { 
  createComplaint, 
  getComplaints, 
  getComplaintById, 
  updateComplaintStatus, 
  verifyComplaint, 
  assignComplaint 
} from '../controllers/complaint.controller';
import { getDashboardSummary } from '../controllers/dashboard.controller';
import { exportReportPDF } from '../controllers/report.controller';
import { createComment, getCommentsByComplaint } from '../controllers/comment.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'public/uploads/' });

// Auth Routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Complaint Routes
router.post('/complaints', authenticate, authorize(['MAHASISWA']), upload.single('attachment'), createComplaint);
router.get('/complaints', authenticate, getComplaints);
router.get('/complaints/:id', authenticate, getComplaintById);

// Comments Routes
router.post('/complaints/:id/comments', authenticate, createComment);
router.get('/complaints/:id/comments', authenticate, getCommentsByComplaint);

// Admin Routes for Complaints
router.put('/complaints/:id/verify', authenticate, authorize(['ADMIN']), verifyComplaint);
router.put('/complaints/:id/assign', authenticate, authorize(['ADMIN']), assignComplaint);

// Petugas Routes for Complaints
router.put('/complaints/:id/status', authenticate, authorize(['PETUGAS', 'ADMIN']), updateComplaintStatus);

// Dashboard & Report (Pimpinan)
router.get('/dashboard/summary', authenticate, authorize(['PIMPINAN', 'ADMIN']), getDashboardSummary);
router.get('/reports/export', authenticate, authorize(['PIMPINAN', 'ADMIN']), exportReportPDF);

export default router;
