import { Hono } from "hono";
import SkillsController from "../controllers/SkillsController";
import SkillsViews from "../views/skills";
import serveSkillsPage from "../views/skills";

const skills = new Hono();

skills.get("/", (c) => serveSkillsPage(c));
skills.get("/api", (c) => SkillsController.listSkills(c));
skills.get("/api/:id", (c) => SkillsController.getSkill(c));
skills.post("/api", (c) => SkillsController.createSkill(c));
skills.patch("/api/:id", (c) => SkillsController.updateSkill(c));
skills.delete("/api/:id", (c) => SkillsController.deleteSkill(c));

export default skills;
