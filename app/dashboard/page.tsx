import { getJobs } from "@/app/actions/jobs";
import KanbanBoard from "@/components/KanbanBoard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Trackify",
};



export default async function DashboardPage() {
  const jobs = await getJobs();

  // Find the most recently updated job across all jobs
  const lastUpdated = jobs.reduce((latest, job) => {
    const jobTime = new Date(job.updatedAt).getTime();
    return jobTime > latest ? jobTime : latest;
  }, 0);

  return (
    <div className="min-h-screen" style={{ background: "#FFFBE6" }}>
      <KanbanBoard
        key={`${jobs.length}-${lastUpdated}`}
        jobs={jobs}
      />
    </div>
  );
}