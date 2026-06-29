import client from "./client";
import type { Application, Stats } from "../types/index";

export const getApplications = async (): Promise<Application[]> => {
  const { data } = await client.get("/applications");
  return data;
};

export const getApplication = async (id: number): Promise<Application> => {
  const { data } = await client.get(`/applications/${id}`);
  return data;
};

export const createApplication = async (
  application: Omit<
    Application,
    "id" | "createdAt" | "notes" | "statusHistories"
  >,
): Promise<Application> => {
  const { data } = await client.post("/applications", application);
  return data;
};

export const updateApplication = async (
  id: number,
  application: Omit<
    Application,
    "id" | "createdAt" | "notes" | "statusHistories"
  >,
): Promise<void> => {
  await client.put(`/applications/${id}`, {
    company: application.company,
    role: application.role,
    status: application.status,
    jobUrl: application.jobUrl,
    appliedDate: application.appliedDate,
  });
};

export const deleteApplication = async (id: number): Promise<void> => {
  await client.delete(`/applications/${id}`);
};

export const getStats = async (): Promise<Stats> => {
  const { data } = await client.get("/applications/stats");
  return data;
};
