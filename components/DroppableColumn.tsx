"use client";

import { useDroppable } from "@dnd-kit/core";
import { Job } from "@/lib/types";
import DraggableJobCard from "@/components/DraggableJobCard";

type Props = {
  id: string;
  label: string;
  color: string;
  jobs: Job[];
};

export default function DroppableColumn({ id, label, color, jobs }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      className="bg-white border-2 border-black rounded-lg overflow-hidden"
      style={{ boxShadow: "4px 4px 0px #000000" }}
    >
      {/* Column Header */}
      <div
        className="p-3 border-b-2 border-black"
        style={{ backgroundColor: color }}
      >
        <h2 className="font-bold text-sm uppercase tracking-wide">
          {label}
        </h2>
        <span className="text-xs font-bold">{jobs.length} jobs</span>
      </div>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className="p-3 flex flex-col gap-3 min-h-48 transition-colors"
        style={{
          backgroundColor: isOver ? "rgba(108, 99, 255, 0.05)" : "transparent",
        }}
      >
        {jobs.length === 0 ? (
          <p className="text-muted text-sm text-center mt-4">
            {isOver ? "Drop here!" : "No applications yet"}
          </p>
        ) : (
          jobs.map((job) => (
            <DraggableJobCard key={job.id} job={job} />
          ))
        )}
      </div>
    </div>
  );
}