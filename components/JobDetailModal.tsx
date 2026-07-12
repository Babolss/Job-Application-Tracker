"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Job } from "@/lib/types";
import { updateJob, deleteJob } from "@/app/actions/jobs";
import { useRouter } from "next/navigation";
import { BrutalInput, BrutalTextarea, BrutalSelect } from "./FormFields";
import { BrutalBtn } from "./ui/BrutalBtn";

export default function JobDetailModal({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

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

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;

    await updateJob(job.id, {
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      status: (form.elements.namedItem("status") as HTMLSelectElement).value,
      deadline: (form.elements.namedItem("deadline") as HTMLInputElement).value,
      url: (form.elements.namedItem("url") as HTMLInputElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    });

    setLoading(false);
    router.refresh();
    onClose();
    
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this application?")) return;
    setDeleting(true);
    await deleteJob(job.id);
    setDeleting(false);
    router.refresh();
    onClose();
  }

  const modal = (
    <div
      className=""
      style={{
        position: "fixed" as const,
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className=""
        style={{
          background: C.surface,
          border: C.bd,
          boxShadow: C.shLg,
          width: "100%",
          maxWidth: "540px",
          maxHeight: "90vh",
          overflowY: "auto" as const,
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: "1.3rem",
            textTransform: "uppercase" as const,
            letterSpacing: "-0.3px",
            margin: 0,
            color: C.text,
            padding: "22px 24px 0",
            marginBottom: "20px",
          }}
        >
          <h2 className="text-xl font-bold uppercase mb-1">{job.company}</h2>
          <p className="text-black text-sm mb-4">{job.role}</p>
        </div>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-2 gap-2"
          style={{ padding: "0 24px 24px" }}
        >
          <div className="col-span-2">
            <BrutalInput
              label="Company"
              name="company"
              defaultValue={job.company}
              required
            />
          </div>

          <div className="col-span-2">
            <BrutalInput
              label="Role"
              name="role"
              defaultValue={job.role}
              required
            />
          </div>

          <div>
            <BrutalSelect
              label="Status"
              name="status"
              options={["Applied", "Interview", "Offer", "Rejected"]}
              defaultValue={job.status}
            />
          </div>

          <div>
            <BrutalInput
              label="Deadline"
              name="deadline"
              type="date"
              defaultValue={
                job.deadline
                  ? new Date(job.deadline).toISOString().split("T")[0]
                  : ""
              }
            />
          </div>

          <div className="col-span-2">
            <BrutalInput
              label="Job Posting URL (optional)"
              name="url"
              defaultValue={job.url || ""}
              placeholder="Job Posting URL (optional)"
            />
          </div>

          <div className="col-span-2">
            <BrutalTextarea
              label="Notes / Interview Prep"
              name="notes"
              defaultValue={job.notes || ""}
              placeholder="Notes / Interview Prep"
            />
          </div>

          <div className="col-span-full">
            <div className="flex gap-3 mt-2">
              <BrutalBtn
                type="submit"
                disabled={loading}
                color="bg-[#6C63FF]"
                full
              >
                {loading ? "Saving..." : "Save Changes"}
              </BrutalBtn>
              <BrutalBtn
                full
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                color="bg-[#FF6B6B]"
              >
                {deleting ? "Deleting..." : "Delete"}
              </BrutalBtn>
            </div>
          </div>

          <div className="col-span-full">
            <BrutalBtn
              type="button"
              onClick={onClose}
              color="bg-[#FFFFFF]"
              full
            >
              Cancel
            </BrutalBtn>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
