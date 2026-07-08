"use client";

import { useState } from "react";
import { Job } from "@/lib/types";
import JobDetailModal from "@/components/JobDetailModal";

const STATUS_COLORS: Record<string, string> = {
  Applied: "#6C63FF",
  Interview: "#FFD600",
  Offer: "#00C897",
  Rejected: "#FF6B6B",
};

const STATUS_TEXT: Record<string, string> = {
  Applied: "text-white",
  Interview: "text-black",
  Offer: "text-black",
  Rejected: "text-white",
};

export default function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);

  const isOverdue =
    job.deadline && new Date(job.deadline) < new Date();

  const daysLeft = job.deadline
    ? Math.ceil(
        (new Date(job.deadline).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-[#1A1D27] border-2 border-black rounded-lg p-3 cursor-pointer"
        style={{
          boxShadow: "3px 3px 0px #000000",
          borderLeft: `6px solid ${STATUS_COLORS[job.status]}`,
        }}
      >
        {/* Company + Role */}
        <h3 className="text-white font-bold text-text text-sm">{job.company}</h3>
        <p className="text-white text-xs mt-1">{job.role}</p>

        {/* Bottom badges */}
        <div className="flex items-center justify-between mt-3">
          {/* Status badge */}
          <span
            className={`text-xs font-bold uppercase px-2 py-1 rounded border border-black ${STATUS_TEXT[job.status]}`}
            style={{ backgroundColor: STATUS_COLORS[job.status] }}
          >
            {job.status}
          </span>

          {/* Deadline badge */}
          {job.deadline && (
            <span
              className={`text-xs font-bold px-2 py-1 rounded border border-black ${
                isOverdue
                  ? "bg-danger text-white"
                  : "bg-warning text-black"
              }`}
            >
              {isOverdue
                ? "Overdue"
                : daysLeft === 0
                ? "Today"
                : `${daysLeft}d left`}
            </span>
          )}
        </div>
      </div>

      {/* Job Detail Modal */}
      {open && (
        <JobDetailModal
          job={job}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

/* "use client";

import { ArrowRight, Calendar } from "lucide-react";
import type { JobApplication as Job } from "@prisma/client";
import { DeadlineBadge } from "./shared";

type StatusKey = "Applied" | "Interview" | "Offer" | "Rejected";

const STATUS_CONFIG: Record<StatusKey, { border: string; color: string; bg: string; label: string }> = {
  Applied: {
    label: "Applied",
    color: "#6C63FF",
    bg: "rgba(108, 99, 255, 0.12)",
    border: "#6C63FF",
  },
  Interview: {
    label: "Interview",
    color: "#3B82F6",
    bg: "rgba(59, 130, 246, 0.12)",
    border: "#3B82F6",
  },
  Offer: {
    label: "Offer",
    color: "#22C55E",
    bg: "rgba(34, 197, 94, 0.12)",
    border: "#22C55E",
  },
  Rejected: {
    label: "Rejected",
    color: "#F97316",
    bg: "rgba(249, 115, 22, 0.12)",
    border: "#F97316",
  },
};

function normalizeStatus(status: string): StatusKey {
  switch (status.toLowerCase()) {
    case "interview":
      return "Interview";
    case "offer":
      return "Offer";
    case "rejected":
      return "Rejected";
    default:
      return "Applied";
  }
}

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

// ─── JobCard (Kanban tile) ────────────────────────────────────────────────────

export function JobCard({ job, onClick }: { job: Job; onClick: () => void }) {
  const cfg = STATUS_CONFIG[normalizeStatus(job.status)];
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl p-4 transition-all duration-150 group"
      style={{
        backgroundColor: "#1A1D27",
        borderLeft: `3px solid ${cfg.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#1E2233";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.35)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#1A1D27";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.25)";
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="text-sm font-semibold text-[#F1F5F9] leading-tight">
            {job.company}
          </p>
          <p className="text-xs text-[#94A3B8] mt-0.5 leading-snug">{job.role}</p>
        </div>
        <ArrowRight
          size={14}
          className="text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity mt-0.5"
        />
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs text-[#94A3B8] flex items-center gap-1">
          <Calendar size={10} />
          {formatDate(job.appliedDate)}
        </span>
        <DeadlineBadge deadline={job.deadline ? formatDate(job.deadline) : "No deadline"} />
      </div>
    </button>
  );
}
 */
// ─── KanbanColumn ─────────────────────────────────────────────────────────────

/* export function KanbanColumn({
  status,
  jobs,
  onCardClick,
}: {
  status: StatusKey;
  jobs: Job[];
  onCardClick: (job: Job) => void;
}) {
  const cfg = STATUS_CONFIG[status];
  return (
    <div
      className="flex flex-col rounded-xl"
      style={{ backgroundColor: "#161820", minHeight: 480 }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: cfg.color }}
          />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
            {cfg.label}
          </span>
        </div>
        <span
          className="text-xs font-medium rounded-full px-2 py-0.5"
          style={{ color: cfg.color, backgroundColor: cfg.bg }}
        >
          {jobs.length}
        </span>
      </div>
      <div className="flex flex-col gap-3 p-3 flex-1">
        {jobs.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xs text-center text-[#94A3B8]/50 leading-relaxed px-4">
              No applications here yet —{"\n"}add one to get started
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => onCardClick(job)} />
          ))
        )}
      </div>
    </div>

    
  );
} */
