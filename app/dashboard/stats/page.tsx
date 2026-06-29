import {
  BarChart3,
  Briefcase,
  Clock,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { COLUMNS, STATUS_CONFIG, type Job } from "../../../lib/types";

const jobs: Job[] = [
  {
    id: "1",
    company: "Nova Labs",
    role: "Senior Frontend Engineer",
    status: "applied",
    dateApplied: "2026-05-28",
    deadline: "2026-06-30",
  },
  {
    id: "2",
    company: "Northstar",
    role: "Product Designer",
    status: "applied",
    dateApplied: "2026-06-02",
    deadline: "2026-07-01",
  },
  {
    id: "3",
    company: "Acme Analytics",
    role: "Data Analyst",
    status: "interview",
    dateApplied: "2026-06-08",
    deadline: "2026-07-03",
  },
  {
    id: "4",
    company: "Platformly",
    role: "Platform Engineer",
    status: "interview",
    dateApplied: "2026-06-12",
    deadline: "2026-07-02",
  },
  {
    id: "5",
    company: "Orbit Stack",
    role: "Staff Full Stack Engineer",
    status: "offer",
    dateApplied: "2026-06-15",
    deadline: "2026-07-05",
  },
  {
    id: "6",
    company: "Brightside",
    role: "QA Engineer",
    status: "rejected",
    dateApplied: "2026-05-30",
    deadline: "Closed",
  },
  {
    id: "7",
    company: "Vertex",
    role: "Backend Developer",
    status: "applied",
    dateApplied: "2026-06-18",
    deadline: "2026-07-09",
  },
  {
    id: "8",
    company: "Lumen",
    role: "Growth PM",
    status: "interview",
    dateApplied: "2026-06-20",
    deadline: "2026-07-08",
  },
];

const REFERENCE_DATE = new Date("2026-06-28T00:00:00Z");

type MonthlyData = { month: string; count: number };
type StatusData = { status: Job["status"]; label: string; count: number; color: string };

function buildMonthlyData(items: Job[]): MonthlyData[] {
  const bucketMap = new Map<string, number>();

  for (const job of items) {
    const month = new Intl.DateTimeFormat("en", {
      month: "short",
      year: "2-digit",
    }).format(new Date(job.dateApplied));

    bucketMap.set(month, (bucketMap.get(month) ?? 0) + 1);
  }

  return Array.from(bucketMap.entries())
    .sort(([left], [right]) => new Date(`1 ${left}`).getTime() - new Date(`1 ${right}`).getTime())
    .map(([month, count]) => ({ month, count }));
}

function buildStatusData(items: Job[]): StatusData[] {
  return COLUMNS.map((status) => ({
    status,
    label: STATUS_CONFIG[status].label,
    count: items.filter((job) => job.status === status).length,
    color: STATUS_CONFIG[status].color,
  }));
}

function ResponseRing({ rate }: { rate: number }) {
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (rate / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#6C63FF"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-bold text-[#F1F5F9]">{rate}%</span>
          <span className="text-xs text-[#94A3B8]">response rate</span>
        </div>
      </div>
    </div>
  );
}

export default function StatsPage() {
  const total = jobs.length;
  const responded = jobs.filter((job) => job.status !== "applied").length;
  const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

  const averageDaysToHearBack = (() => {
    const heardBack = jobs.filter((job) => job.status !== "applied");
    if (heardBack.length === 0) return 0;

    const totalDays = heardBack.reduce((sum, job) => {
      const appliedDate = new Date(job.dateApplied);
      const deltaDays = Math.max(1, Math.round((REFERENCE_DATE.getTime() - appliedDate.getTime()) / 86400000));
      return sum + deltaDays;
    }, 0);

    return Math.round(totalDays / heardBack.length);
  })();

  const monthlyData = buildMonthlyData(jobs);
  const statusData = buildStatusData(jobs);
  const maxMonthlyCount = Math.max(...monthlyData.map((entry) => entry.count), 1);
  const totalStatusCount = statusData.reduce((sum, entry) => sum + entry.count, 0) || 1;
  const statusGradient = statusData.reduce<{ gradient: string; runningTotal: number }>(
    (result, entry) => {
      const startPercent = (result.runningTotal / totalStatusCount) * 100;
      const runningTotal = result.runningTotal + entry.count;
      const endPercent = (runningTotal / totalStatusCount) * 100;

      return {
        gradient: `${result.gradient}${result.gradient ? ", " : ""}${entry.color} ${startPercent}% ${endPercent}%`,
        runningTotal,
      };
    },
    { gradient: "", runningTotal: 0 }
  ).gradient;

  const topStats = [
    {
      label: "Total Applications",
      value: total,
      icon: Briefcase,
      color: "#6C63FF",
    },
    {
      label: "Response Rate",
      value: `${responseRate}%`,
      icon: TrendingUp,
      color: "#22C55E",
    },
    {
      label: "Avg. Days to Hear Back",
      value: averageDaysToHearBack > 0 ? `${averageDaysToHearBack}d` : "—",
      icon: Clock,
      color: "#F59E0B",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#F1F5F9]">Your Job Search Stats</h1>
        <p className="text-sm text-[#94A3B8] mt-1">Track your progress and stay motivated</p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {topStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl p-5 flex items-center gap-4"
              style={{
                backgroundColor: "#1A1D27",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
              >
                <Icon size={18} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#F1F5F9]">{stat.value}</p>
                <p className="text-xs text-[#94A3B8] mt-0.5 leading-snug">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </section>

      <div className="flex flex-col gap-6">
        <section
          className="rounded-2xl p-6"
          style={{ backgroundColor: "#1A1D27", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={16} style={{ color: "#6C63FF" }} />
            <h2 className="text-base font-semibold text-[#F1F5F9]">Applications Sent Over Time</h2>
          </div>
          <p className="text-xs text-[#94A3B8] mb-6">Monthly volume of applications submitted</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {monthlyData.map((entry) => (
              <div
                key={entry.month}
                className="rounded-xl p-4"
                style={{ backgroundColor: "#202434", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-end justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs text-[#94A3B8]">{entry.month}</p>
                    <p className="text-xl font-bold text-[#F1F5F9]">{entry.count}</p>
                  </div>
                  <span className="text-xs text-[#94A3B8]">apps</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(entry.count / maxMonthlyCount) * 100}%`,
                      background: "linear-gradient(135deg, #6C63FF, #4F46E5)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section
            className="rounded-2xl p-6"
            style={{ backgroundColor: "#1A1D27", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <h2 className="text-base font-semibold text-[#F1F5F9] mb-1">Status Breakdown</h2>
            <p className="text-xs text-[#94A3B8] mb-4">Distribution of your applications by stage</p>

            <div className="flex items-center gap-6">
              <div className="relative shrink-0">
                <div
                  className="w-40 h-40 rounded-full"
                  style={{
                    background: `conic-gradient(${statusGradient})`,
                  }}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#1A1D27", transform: "scale(0.72)" }}
                  >
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#F1F5F9]">{total}</p>
                      <p className="text-xs text-[#94A3B8]">total</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                {statusData.map((entry) => (
                  <div key={entry.status} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                      <span className="text-xs text-[#94A3B8]">{entry.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#F1F5F9]">{entry.count}</span>
                      <span className="text-xs text-[#94A3B8]">({Math.round((entry.count / totalStatusCount) * 100)}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            className="rounded-2xl p-6 flex flex-col"
            style={{ backgroundColor: "#1A1D27", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <h2 className="text-base font-semibold text-[#F1F5F9] mb-1">Response Rate</h2>
            <p className="text-xs text-[#94A3B8] mb-6">How many of your applications got any reply</p>

            <div className="flex-1 flex items-center justify-center gap-10">
              <ResponseRing rate={responseRate} />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-[#F1F5F9]">{responded}</span>
                  <span className="text-xs text-[#94A3B8]">Responses received</span>
                </div>
                <div className="w-24 h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-[#F1F5F9]">{total - responded}</span>
                  <span className="text-xs text-[#94A3B8]">Awaiting reply</span>
                </div>
              </div>
            </div>

            <div
              className="mt-6 rounded-lg px-3 py-2.5 flex items-start gap-2"
              style={{
                backgroundColor: "rgba(108,99,255,0.08)",
                border: "1px solid rgba(108,99,255,0.15)",
              }}
            >
              <Sparkles size={12} className="shrink-0 mt-0.5" style={{ color: "#6C63FF" }} />
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Industry average response rate is <span style={{ color: "#A89CFF" }}>20–30%</span>. {responseRate >= 30 ? "You're above average — keep it up!" : "Tailoring your resume per role can help improve this."}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
