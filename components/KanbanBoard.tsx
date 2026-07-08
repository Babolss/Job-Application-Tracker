"use client";

import type { JobApplication as Job } from "@prisma/client";
import JobCard from "@/components/JobCard";
import AddJobModal from "@/components/AddJobModal";

const COLUMNS = [
  { id: "Applied", label: "APPLIED", color: "#6C63FF" },
  { id: "Interview", label: "INTERVIEW", color: "#FFD600" },
  { id: "Offer", label: "OFFER", color: "#00C897" },
  { id: "Rejected", label: "REJECTED", color: "#FF6B6B" },
];

export default function KanbanBoard({ jobs }: { jobs: Job[] }) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text">Your Applications</h1>
        <AddJobModal />
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map((column) => {
          const columnJobs = jobs.filter(
            (job) => job.status.toLowerCase() === column.id.toLowerCase()
          );

          return (
            <div
              key={column.id}
              className="bg-background border-2 border-black rounded-lg overflow-hidden"
              style={{ boxShadow: "4px 4px 0px #000000" }}
            >
              {/* Column Header */}
              <div
                className="p-3 border-b-2 border-black"
                style={{ backgroundColor: column.color }}
              >
                <h2 className="font-bold text-sm uppercase tracking-wide">
                  {column.label}
                </h2>
                <span className="text-xs font-bold">
                  {columnJobs.length} jobs
                </span>
              </div>

              {/* Cards */}
              <div className="p-3 flex flex-col gap-3 min-h-48">
                {columnJobs.length === 0 ? (
                  <p className="text-muted text-sm text-center mt-4">
                    No applications here yet
                  </p>
                ) : (
                  columnJobs.map((job) => (
                    <JobCard key={job.id} job={job}/>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}