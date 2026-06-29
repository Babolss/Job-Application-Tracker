export type Status = "applied" | "interview" | "offer" | "rejected";

export type View = "landing" | "dashboard" | "stats";

export type Job = {
  id: string;
  company: string;
  role: string;
  status: Status;
  dateApplied: string;
  deadline: string;
};

type StatusConfig = {
  label: string;
  color: string;
  bg: string;
  border: string;
};

export const STATUS_CONFIG: Record<Status, StatusConfig> = {
  applied: {
    label: "Applied",
    color: "#6C63FF",
    bg: "rgba(108, 99, 255, 0.12)",
    border: "#6C63FF",
  },
  interview: {
    label: "Interview",
    color: "#3B82F6",
    bg: "rgba(59, 130, 246, 0.12)",
    border: "#3B82F6",
  },
  offer: {
    label: "Offer",
    color: "#22C55E",
    bg: "rgba(34, 197, 94, 0.12)",
    border: "#22C55E",
  },
  rejected: {
    label: "Rejected",
    color: "#F97316",
    bg: "rgba(249, 115, 22, 0.12)",
    border: "#F97316",
  },
};

export const COLUMNS: Status[] = ["applied", "interview", "offer", "rejected"];

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}