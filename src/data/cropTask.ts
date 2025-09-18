// src/data/cropTasks.ts

type Task = {
  day: number;
  crop: string;
  task: string;
};

const cropTasks: Task[] = [
  { day: 1, crop: "Rice", task: "Soil preparation and leveling" },
  { day: 2, crop: "Rice", task: "Seed sowing" },
  { day: 5, crop: "Rice", task: "Irrigation check" },
  { day: 7, crop: "Rice", task: "Weeding" },
  { day: 10, crop: "Rice", task: "Fertilizer application" },
  { day: 15, crop: "Rice", task: "Pest monitoring" }
];

// Helper functions
export const getTasksForDay = (day: number): Task[] => {
  return cropTasks.filter(task => task.day === day);
};

export const getUpcomingTasks = (day: number): Task[] => {
  return cropTasks.filter(task => task.day > day).slice(0, 3);
};

export const getCropTasks = (crop: string): Task[] => {
  return cropTasks.filter(task => task.crop.toLowerCase() === crop.toLowerCase());
};
