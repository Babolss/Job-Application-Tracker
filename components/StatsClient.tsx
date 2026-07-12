"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useState } from "react";

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

type Stats = {
  total: number;
  statusCounts: {
    Applied: number;
    Interview: number;
    Offer: number;
    Rejected: number;
  };
  responseRate: number;
  responses: number;
  barChartData: { month: string; count: number }[];
  donutData: { name: string; value: number; color: string }[];
};

export default function StatsClient({ stats }: { stats: Stats }) {
  if (stats.total === 0) {
    return (
      <div
        className="bg-white border-4 border-black rounded-xl p-12 text-center"
        style={{ boxShadow: "6px 6px 0px #000000" }}
      >
        <p className="text-4xl mb-4">📋</p>
        <h2 className="text-2xl font-black uppercase mb-2">No data yet</h2>
        <p className="text-gray-600">
          Add more applications to start seeing your stats
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Stat Cards Row */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Total Applications"
          value={stats.total}
          color="#6C63FF"
        />
        <StatCard
          label="Got a Response"
          value={stats.responses}
          color="#00C897"
        />
        <StatCard
          label="Response Rate"
          value={`${stats.responseRate}%`}
          color="#FFD600"
          darkText
        />
      </div>

      {/* Status Breakdown Cards */}
      <div className="grid grid-cols-4 gap-4">
        <MiniStatCard label="Applied" value={stats.statusCounts.Applied} color="#6C63FF" light />
        <MiniStatCard label="Interview" value={stats.statusCounts.Interview} color="#FFD600" />
        <MiniStatCard label="Offer" value={stats.statusCounts.Offer} color="#00C897" />
        <MiniStatCard label="Rejected" value={stats.statusCounts.Rejected} color="#FF6B6B" light />
      </div>

      {/* Bar Chart — Applications Over Time */}
      <div
        className="bg-white border-3 border-black rounded-xl p-6"
        style={{ border: "3px solid black", boxShadow: "6px 6px 0px #000000" }}
      >
        <h2 className="text-lg font-black uppercase mb-4">
          Applications Over Time
        </h2>
        {stats.barChartData.length === 0 ? (
          <p className="text-muted text-sm">Not enough data yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.barChartData}>
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fontWeight: 700 }}
                axisLine={{ stroke: "#000" }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fontWeight: 700 }}
                axisLine={{ stroke: "#000" }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  border: "2px solid black",
                  borderRadius: "8px",
                  fontWeight: 700,
                  boxShadow: "3px 3px 0px #000",
                }}
              />
              <Bar
                dataKey="count"
                fill="#6C63FF"
                stroke="#000"
                strokeWidth={2}
                radius={[4, 4, 0, 0]}
                name="Applications"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Donut Chart + Response Rate */}
      <div className="grid grid-cols-2 gap-4">

        {/* Donut Chart */}
        <div
          className="bg-white rounded-xl p-6"
          style={{ border: "3px solid black", boxShadow: "6px 6px 0px #000000" }}
        >
          <h2 className="text-lg font-black uppercase mb-4">
            Status Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={stats.donutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                stroke="#000"
                strokeWidth={2}
              >
                {stats.donutData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                iconType="circle"
                formatter={(value: string) => (
                  <span style={{ fontWeight: 700, fontSize: 12 }}>{value}</span>
                )}
              />
              <Tooltip
                contentStyle={{
                  border: "2px solid black",
                  borderRadius: "8px",
                  fontWeight: 700,
                  boxShadow: "3px 3px 0px #000",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Response Rate */}
        <div
          className="bg-white rounded-xl p-6 flex flex-col items-center justify-center"
          style={{ border: "3px solid black", boxShadow: "6px 6px 0px #000000" }}
        >
          <h2 className="text-lg font-black uppercase mb-6">
            Response Rate
          </h2>

          {/* Progress Ring */}
          <div className="relative flex items-center justify-center">
            <svg width="160" height="160" viewBox="0 0 160 160">
              {/* Background ring */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="16"
              />
              {/* Progress ring */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke="#6C63FF"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 60}`}
                strokeDashoffset={`${2 * Math.PI * 60 * (1 - stats.responseRate / 100)}`}
                transform="rotate(-90 80 80)"
                style={{ transition: "stroke-dashoffset 0.5s ease" }}
              />
              {/* Black border ring */}
              <circle
                cx="80"
                cy="80"
                r="68"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
              <circle
                cx="80"
                cy="80"
                r="52"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
            </svg>

            {/* Center text */}
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black">
                {stats.responseRate}%
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm font-bold mt-4 text-center">
            of applications got a response
          </p>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  label,
  value,
  color,
  darkText,
}: {
  label: string;
  value: string | number;
  color: string;
  darkText?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <div
    onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: color, border: C.bd,
        boxShadow: hov ? C.shSm : C.sh,
        transform: hov ? "translate(2px,2px)" : "none",
        transition: "transform 0.1s, box-shadow 0.1s",
        padding: "20px 22px",
      }}
      className="rounded-xl p-6 border-3 border-black"
    >
      <p className={`text-4xl font-black ${darkText ? "text-black" : "text-white"}`}>
        {value}
      </p>
      <p className={`text-sm font-bold uppercase mt-1 ${darkText ? "text-black" : "text-white"}`}>
        {label}
      </p>
    </div>
  );
}

// Mini Stat Card Component
function MiniStatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
  light?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    
    <div
    onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="bg-white rounded-xl p-4 border-2 border-black"
      style={{
        border: C.bd,
        boxShadow: hov ? C.shSm : C.sh,
        transform: hov ? "translate(2px,2px)" : "none",
        transition: "transform 0.1s, box-shadow 0.1s",
        padding: "20px 22px",
      }}
    >
      <div
        className="w-3 h-3 rounded-full border border-black mb-2"
        style={{ backgroundColor: color }}
      />
      <p className={`text-2xl font-black ${"text-black"}`}>{value}</p>
      <p className={`text-xs font-bold uppercase ${"text-gray-600"}`}>{label}</p>
    </div>
  );
}