export interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  createdAt: string;
}

export interface Complaint {
  id: string;
  title: string;
  category: "Akademik" | "Fasilitas" | "IT" | "Kebersihan" | "Keamanan" | "Administrasi";
  description: string;
  location: string;
  imageUrl?: string;
  status: "Diajukan" | "Diverifikasi" | "Diproses" | "Selesai" | "Ditolak";
  createdAt: string;
  reporterName: string;
  comments: Comment[];
  priority?: "Tinggi" | "Sedang" | "Rendah";
}

export interface TrelloCard {
  id: string;
  name: string;
  description: string;
  label: "Prioritas Tinggi" | "Prioritas Sedang" | "Prioritas Rendah";
  dueDate: string;
  checklist: { text: string; done: boolean }[];
  pic: string;
  status: "Backlog" | "To Do" | "In Progress" | "Review/Testing" | "Done";
}

export interface ProjectRisk {
  id: number;
  name: string;
  category: "Scope" | "Waktu" | "Data" | "Komunikasi" | "Teknis" | "User Experience" | "Biaya" | "Keamanan";
  impact: "Tinggi" | "Sedang" | "Rendah";
  probability: "Tinggi" | "Sedang" | "Rendah";
  mitigation: string;
}

export interface GanttTask {
  id: string;
  name: string;
  startWeek: number;
  endWeek: number;
  progress: number;
  resources: string[];
}

export interface PMChapter {
  id: string;
  title: string;
  sectionCode: string;
  content: string;
  interactiveComponent?: "charter" | "wbs" | "gantt" | "resources" | "budget" | "trello" | "risks" | "status" | "tests" | "innovations";
}

export interface ProjectMember {
  role: string;
  name: string;
  responsibilities: string[];
}

export interface BudgetItem {
  id: number;
  component: string;
  cost: number;
}
