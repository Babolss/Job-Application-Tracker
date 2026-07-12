"use client";

import { useState } from "react";
import { Job } from "@/lib/types";
import JobDetailModal from "@/components/JobDetailModal";

const C = {
  bg: "#FFFBE6",
  surface: "#FFFFFF",
  input: "#FFFBE6",
  text: "#0A0A0A",
  gray: "#666666",
  purple: "#6C63FF",
  yellow: "#FFD600",
  mint: "#00C897",
  coral: "#FF6B6B",
  black: "#000000",
  ink: "#000000",
  bd: "3px solid #000",
  bd2: "2px solid #000",
  sh: "4px 4px 0px #000",
  shSm: "2px 2px 0px #000",
  shLg: "6px 6px 0px #000",
  cream: "#FFFBE6",
  white: "#FFFFFF",
};

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

  const isOverdue = job.deadline && new Date(job.deadline) < new Date();

  const daysLeft = job.deadline
    ? Math.ceil(
        (new Date(job.deadline).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : null;

  const [hov, setHov] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="bg-white border-2 border-black p-3"
        style={{
          background: C.surface,
          borderLeft: `6px solid ${STATUS_COLORS[job.status]}`,
          boxShadow: hov ? C.shSm : C.sh,
          transform: hov ? "translate(2px,2px)" : "none",
          transition: "transform 0.1s, box-shadow 0.1s",
          cursor: "pointer",
          padding: "14px 14px 12px",
          marginBottom: "10px",
        }}
      >
        {/* Company + Role */}
        <h3
          className="font-extrabold text-[0.95rem] mb-0.75"
          style={{ color: C.text }}
        >
          {job.company}
        </h3>
        <p className="font-medium text-[0.8rem] mb-3" style={{ color: C.gray }}>
          {job.role}
        </p>

        {/* Bottom row — badges + edit button */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            {/* Status badge */}
            <span
              style={{
                backgroundColor: STATUS_COLORS[job.status],
                color: STATUS_TEXT[job.status],
                border: C.bd2,
                boxShadow: `1px 1px 0px ${C.ink}`,
                padding: "2px 8px",
                fontSize: "0.68rem",
                fontWeight: 800,
                textTransform: "uppercase" as const,
                display: "inline-block",
              }}
            >
              {job.status}
            </span>

            {/* Deadline badge */}
            {job.deadline && (
              <span
                className={` text-black text-xs font-bold px-2 py-1 border border-black ${
                  isOverdue ? "bg-danger text-black" : "bg-warning text-black"
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

          {/* Edit button */}
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="text-black text-xs font-bold uppercase px-2 py-0.75 bg-white border-2 border-black hover:bg-yellow-400 transition-colors"
            
          >
            Edit
          </button>
        </div>
      </div>

      {/* Job Detail Modal */}
      {open && <JobDetailModal job={job} onClose={() => setOpen(false)} />}
    </>
  );
}
