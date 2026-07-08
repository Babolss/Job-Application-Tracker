"use client";

import { useState } from "react";
import { addJob } from "@/app/actions/jobs";

export default function AddJobModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;

    await addJob({
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      status: (form.elements.namedItem("status") as HTMLSelectElement).value,
      deadline: (form.elements.namedItem("deadline") as HTMLInputElement).value,
      url: (form.elements.namedItem("url") as HTMLInputElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    });

    setLoading(false);
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-yellow-400 text-black font-bold uppercase px-4 py-2 border-2 border-black rounded"
        style={{ boxShadow: "4px 4px 0px #000000" }}
      >
        + Add Job
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white border-4 border-black rounded-xl p-6 w-full max-w-md"
        style={{ boxShadow: "8px 8px 0px #000000" }}
      >
        <h2 className="text-xl font-bold uppercase mb-4">Add New Job</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="company"
            placeholder="Company"
            required
            className="text-black border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          />
          <input
            name="role"
            placeholder="Role / Job Title"
            required
            className="text-black border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          />
          <select
            name="status"
            className="text-black border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input
            name="deadline"
            type="date"
            className="text-black border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          />
          <input
            name="url"
            placeholder="Job Posting URL (optional)"
            className="text-black border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          />
          <textarea
            name="notes"
            placeholder="Notes / Interview Prep (optional)"
            rows={3}
            className="text-black border-2 border-black rounded px-3 py-2 text-sm font-medium w-full resize-none"
          />

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-400 text-black font-bold uppercase py-2 border-2 border-black rounded"
              style={{ boxShadow: "3px 3px 0px #000000" }}
            >
              {loading ? "Adding..." : "Add Job"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 bg-white text-black font-bold uppercase py-2 border-2 border-black rounded"
              style={{ boxShadow: "3px 3px 0px #000000" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}