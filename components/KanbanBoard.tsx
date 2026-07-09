"use client";

import { useState } from "react";
import { Job } from "@/lib/types";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import DroppableColumn from "@/components/DroppableColumn";
import AddJobModal from "@/components/AddJobModal";
import { updateJobStatus } from "@/app/actions/jobs";

const COLUMNS = [
    { id: "Applied", label: "APPLIED", color: "#6C63FF" },
    { id: "Interview", label: "INTERVIEW", color: "#FFD600" },
    { id: "Offer", label: "OFFER", color: "#00C897" },
    { id: "Rejected", label: "REJECTED", color: "#FF6B6B" },
];

export default function KandbanBoar({ jobs: initialJobs }: { jobs: Job[] }) {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (!over) return;

        const jobId = active.id as string;
        const newStatus = over.id as string;

        const job = jobs.find((j) => j.id === jobId);

        if (!job || job.status === newStatus) return;

        setJobs((prev) => 
            prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j)));

        await updateJobStatus(jobId, newStatus);
    }

    return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text uppercase">
          Your Applications
        </h1>
        <AddJobModal />
      </div>

      {/* Kanban Board */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {COLUMNS.map((column) => {
            const columnJobs = jobs.filter((job) => job.status === column.id);

            return (
              <DroppableColumn
                key={column.id}
                id={column.id}
                label={column.label}
                color={column.color}
                jobs={columnJobs}
              />
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}