"use client";

import { useDroppable } from "@dnd-kit/core";
import { Job } from "@/lib/types";
import DraggableJobCard from "@/components/DraggableJobCard";

type Props = {
  id: string;
  label: string;
  color: string;
  color2: string;
  jobs: Job[];
};

const C = {
  gray: "#666666",
};

export default function DroppableColumn({ id, label, color, color2, jobs }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      className="flex flex-col gap-3"
    >
      {/* Column Header */}
      {/* <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: color,
          border: "3px solid #000",
          boxShadow: hov ? "2px 2px 0px #000" : "4px 4px 0px #000",
          transform: hov ? "translate(2px,2px)" : "none",
          transition: "transform 0.1s, box-shadow 0.1s",
          padding: "20px 22px",
        }}
      ></div> */}

      <div style={{
        background: color, border: "3px solid #000", borderBottom: "3px solid #000",
        padding: "10px 14px", marginBottom: "10px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontWeight: 900, fontSize: "0.82rem", textTransform: "uppercase" as const, color: color2, letterSpacing: "0.07em" }}>
          {label}
        </span>
        <span style={{
          background: "#FFFFFF", border: "2px solid #000",
          width: "26px", height: "26px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: "0.8rem", color: "#0A0A0A",
        }}>
          {jobs.length}
        </span>
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
          <div style={{
            border: `2px dashed ${C.gray}`, padding: "24px",
            textAlign: "center" as const, color: C.gray,
            fontWeight: 600, fontSize: "0.82rem",
          }}>
            Drop jobs here
          </div>
        ) : (
          jobs.map((job) => <DraggableJobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}
