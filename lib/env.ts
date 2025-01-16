import { object, string } from "zod";

const env = object({
  db: string(),
  email_from: string(),
}).parse(process.env);

export default env;