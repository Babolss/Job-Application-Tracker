"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Job } from "@/lib/types";
import { updateJob, deleteJob } from "@/app/actions/jobs";

export default function JobDetailModal({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
    onClose();
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this application?")) return;
    setDeleting(true);
    await deleteJob(job.id);
    setDeleting(false);
    onClose();
  }

  const modal = (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-white border-4 border-black rounded-xl p-6 w-full max-w-md"
        style={{ boxShadow: "8px 8px 0px #000000" }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold uppercase mb-1">{job.company}</h2>
        <p className="text-muted text-sm mb-4">{job.role}</p>

        <form onSubmit={handleUpdate} className="flex flex-col gap-3">
          <input
            name="company"
            defaultValue={job.company}
            required
            className="border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          />
          <input
            name="role"
            defaultValue={job.role}
            required
            className="border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          />
          <select
            name="status"
            defaultValue={job.status}
            className="border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input
            name="deadline"
            type="date"
            defaultValue={
              job.deadline
                ? new Date(job.deadline).toISOString().split("T")[0]
                : ""
            }
            className="border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          />
          <input
            name="url"
            defaultValue={job.url || ""}
            placeholder="Job Posting URL (optional)"
            className="border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          />
          <textarea
            name="notes"
            defaultValue={job.notes || ""}
            placeholder="Notes / Interview Prep"
            rows={3}
            className="border-2 border-black rounded px-3 py-2 text-sm font-medium w-full resize-none"
          />

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-white font-bold uppercase py-2 border-2 border-black rounded"
              style={{ boxShadow: "3px 3px 0px #000000" }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 bg-danger text-white font-bold uppercase py-2 border-2 border-black rounded"
              style={{ boxShadow: "3px 3px 0px #000000" }}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-white text-black font-bold uppercase py-2 border-2 border-black rounded mt-1"
            style={{ boxShadow: "3px 3px 0px #000000" }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}