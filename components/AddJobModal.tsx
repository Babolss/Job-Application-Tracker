"use client";

import { useState } from "react";
import { addJob } from "@/app/actions/jobs";
import { useRouter } from "next/navigation";
import { BrutalBtn } from "@/components/ui/BrutalBtn";
import { BrutalInput, BrutalTextarea, BrutalSelect } from "./FormFields";

export default function AddJobModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
    router.refresh();
  }

  if (!open) {
    return (
      <BrutalBtn
        disabled={false}
        color="bg-yellow-400"
        onClick={() => setOpen(true)}
      >
        + Add Job
      </BrutalBtn>
    );
  }

  return (
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
      >
        <h2
          className=""
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
          Add New Job
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-x-2"
          style={{ padding: "0 24px 24px" }}
        >
          <div className="col-span-2">
            <BrutalInput
              label="Company"
              name="company"
              placeholder="Company Name"
              required
            />
          </div>

          {/* <input
            name="company"
            placeholder="Company"
            required
            className="text-black border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          /> */}

          <div className="col-span-2">
            <BrutalInput
              label="Role"
              name="role"
              placeholder="Role / Job Title"
              required
            />
          </div>

          {/* <input
            name="role"
            placeholder="Role / Job Title"
            required
            className="text-black border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          /> */}

          <div className="col-span-1">
            <BrutalSelect
              label="Status"
              name="status"
              options={["Applied", "Interview", "Offer", "Rejected"]}
            />
          </div>

          {/* <select
            name="status"
            className="text-black border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select> */}
          <div className="col-span-1">
            <BrutalInput label="Deadline" name="deadline" type="date" />
          </div>

          {/* <input
            name="deadline"
            type="date"
            className="text-black border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          /> */}
          <div className="col-span-2">
            <BrutalInput
              label="Job Posting URL (optional)"
              name="url"
              placeholder="Job Posting URL (optional)"
            />
          </div>

          {/* <input
            name="url"
            placeholder="Job Posting URL (optional)"
            className="text-black border-2 border-black rounded px-3 py-2 text-sm font-medium w-full"
          /> */}
          <div className="col-span-2">
            <BrutalTextarea
              label="Notes / Interview Prep"
              name="notes"
              placeholder="Notes / Interview Prep (optional)"
            />
          </div>

          {/* <textarea
            name="notes"
            placeholder="Notes / Interview Prep (optional)"
            rows={3}
            className="text-black border-2 border-black rounded px-3 py-2 text-sm font-medium w-full resize-none"
          /> */}
          <div className="col-span-2">
            <div className="flex gap-3 mt-2">
              <BrutalBtn disabled={loading} type="submit" full>
                {loading ? "Adding..." : "Add Job"}
              </BrutalBtn>
              <BrutalBtn
                type="button"
                onClick={() => setOpen(false)}
                color="bg-white"
              >
                Cancel
              </BrutalBtn>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
