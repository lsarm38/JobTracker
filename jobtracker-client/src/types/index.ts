export interface Application {
  id: number;
  company: string;
  role: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  jobUrl?: string;
  appliedDate: string;
  createdAt: string;
  notes: Note[];
  statusHistories: StatusHistory[];
}

export interface Note {
  id: number;
  applicationId: number;
  content: string;
  createdAt: string;
}

export interface StatusHistory {
  id: number;
  applicationId: number;
  oldStatus: string;
  newStatus: string;
  changedAt: string;
}

export interface Stats {
  total: number;
  responseRate: number;
  byStatus: { status: string; count: number }[];
}
