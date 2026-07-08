"use server";

import {prisma} from "@/lib/prisma";;
import {auth} from "@clerk/nextjs/server";
import {revalidatePath} from "next/cache";

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
