import { object, string } from "zod";

export const env = object({
  EMAIL_FROM: string(),
  DATABASE_URL: string(),
}).parse(process.env);