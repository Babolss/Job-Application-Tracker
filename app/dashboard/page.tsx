import { getJobs } from "@/app/actions/jobs";
import KanbanBoard from "@/components/KanbanBoard";

export default async function DashboardPage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-[#FFFBE6] p-6">
      <KanbanBoard jobs={jobs} />
    </div>
  );
}