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
        className="bg-white border-2 border-black rounded-lg p-3"
        style={{
          boxShadow: "3px 3px 0px #000000",
          borderLeft: `6px solid ${STATUS_COLORS[job.status]}`,
        }}
      >
        {/* Company + Role */}
        <h3 className="font-bold text-text text-sm">{job.company}</h3>
        <p className="text-muted text-xs mt-1">{job.role}</p>

        {/* Bottom row — badges + edit button */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
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

          {/* Edit button */}
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="text-xs font-bold uppercase px-2 py-1 bg-white border-2 border-black rounded hover:bg-yellow-400 transition-colors"
            style={{ boxShadow: "2px 2px 0px #000000" }}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Job Detail Modal */}
      {open && (
        <JobDetailModal job={job} onClose={() => setOpen(false)} />
      )}
    </>
  );
}