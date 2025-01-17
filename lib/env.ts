import { object, string } from "zod";

const env = object({
  EMAIL_FROM: string(),
}).parse(process.env);

export default env;