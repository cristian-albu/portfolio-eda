import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { skills } from "./src/routes";

const app = new Hono();

app.use("/public/*", serveStatic({ root: "./" }));

app.route("/skills", skills);

export default {
  port: 3000,
  fetch: app.fetch,
};
