"use client";

import { useState } from "react";
import { Job } from "@/lib/types";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import DroppableColumn from "@/components/DroppableColumn";
import AddJobModal from "@/components/AddJobModal";
import { updateJobStatus } from "@/app/actions/jobs";
import { useRouter } from "next/navigation";

const COLUMNS = [
    { id: "Applied", label: "APPLIED", color: "#6C63FF", color2: "#FFFFFF"},
    { id: "Interview", label: "INTERVIEW", color: "#FFD600", color2: "#000000"},
    { id: "Offer", label: "OFFER", color: "#00C897", color2: "#000000"},
    { id: "Rejected", label: "REJECTED", color: "#FF6B6B", color2: "#FFFFFF"},
];

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

export default function KandbanBoar({ jobs: initialJobs }: { jobs: Job[] }) {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);
    const router = useRouter();

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const jobId = active.id as string;
        const newStatus = over.id as string;

        const job = jobs.find((j) => j.id === jobId);

        if (!job || job.status === newStatus) return;

        setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
        );

        await updateJobStatus(jobId, newStatus);
        router.refresh();
    }

    return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
            <h2 style={{ fontWeight: 900, fontSize: "2rem", margin: 0, letterSpacing: "-1px", color: C.text }}>
              Dashboard
            </h2>
            <p style={{ fontWeight: 600, color: C.gray, margin: "4px 0 0", fontSize: "0.88rem" }}>
              {jobs.length} application{jobs.length !== 1 ? "s" : ""} tracked
            </p>
          </div>
        <AddJobModal />
      </div>

      {/* Kanban Board */}
      <DndContext id="kanban-board" collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {COLUMNS.map((column) => {
            const columnJobs = jobs.filter((job) => job.status === column.id);

            return (
              <DroppableColumn
                key={column.id}
                id={column.id}
                label={column.label}
                color={column.color}
                color2={column.color2}
                jobs={columnJobs}
              />
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}