import { Hono } from "hono";
import { skills } from "./src/routes";

const app = new Hono();

app.route("/skills", skills);

export default {
  port: 3000,
  fetch: app.fetch,
};
