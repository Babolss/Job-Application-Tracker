"use server";

import {prisma} from "@/lib/prisma";;
import {auth} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";

type JobRow = {
  id: string;
  userId: string;
  company: string;
  role: string;
  status: string;
  appliedDate: Date;
  deadline: Date | null;
  url: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export async function getJobs() {
    const {userId} = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    return prisma.jobApplication.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
 }

 export async function addJob(data: {
    company: string;
    role: string;
    status: string;
    deadline?: string;
    url?: string;
    notes?: string;
 }) {
    const {userId} = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    await prisma.jobApplication.create({
        data: {
            userId: userId,
            company: data.company,
            role: data.role,
            status: data.status,
            deadline: data.deadline ? new Date(data.deadline) : null,
            url: data.url || null,
            notes: data.notes || null,
        },
    });

    revalidatePath("/dashboard");
 }

 export async function updateJob(
  id: string,
  data: {
    company?: string;
    role?: string;
    status?: string;
    deadline?: string;
    url?: string;
    notes?: string;
  }
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  await prisma.jobApplication.update({
    where: { id, userId },
    data: {
      company: data.company,
      role: data.role,
      status: data.status,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
      url: data.url,
      notes: data.notes,
    },
  });

  revalidatePath("/dashboard");
}

 export async function updateJobStatus(id:string, status: string) {
    const {userId} = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    await prisma.jobApplication.update({
        where:{id, userId},
        data:{status}
    });

    revalidatePath("/dashboard");
 }

 export async function deleteJob(id:string) {
    const {userId} = await auth();
    if (!userId) {
        throw new Error("User not authenticated");
    }

    await prisma.jobApplication.delete({
        where:{id, userId}
    });

    revalidatePath("/dashboard");
 }

export async function getStats() {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const jobs = await prisma.jobApplication.findMany({
    where: { userId },
    orderBy: { appliedDate: "asc" },
  });

  const total = jobs.length;

  // ← add : JobApplication to each filter callback
  const statusCounts = {
    Applied: jobs.filter((j: JobRow) => j.status === "Applied").length,
    Interview: jobs.filter((j: JobRow) => j.status === "Interview").length,
    Offer: jobs.filter((j: JobRow) => j.status === "Offer").length,
    Rejected: jobs.filter((j: JobRow) => j.status === "Rejected").length,
  };

  const responses = statusCounts.Interview + statusCounts.Offer + statusCounts.Rejected;
  const responseRate = total > 0 ? Math.round((responses / total) * 100) : 0;

  const monthlyData: Record<string, number> = {};
  jobs.forEach((job: JobRow) => {
    const month = new Date(job.appliedDate).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    monthlyData[month] = (monthlyData[month] || 0) + 1;
  });

  const barChartData = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    count,
  }));

  const donutData = [
    { name: "Applied", value: statusCounts.Applied, color: "#6C63FF" },
    { name: "Interview", value: statusCounts.Interview, color: "#FFD600" },
    { name: "Offer", value: statusCounts.Offer, color: "#00C897" },
    { name: "Rejected", value: statusCounts.Rejected, color: "#FF6B6B" },
  ].filter((d) => d.value > 0);

  return {
    total,
    statusCounts,
    responseRate,
    responses,
    barChartData,
    donutData,
  };
}