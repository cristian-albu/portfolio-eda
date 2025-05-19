import { Hono } from "hono";
import SkillsController from "../controllers/SkillsController";

const skills = new Hono();

skills.get("/", (c) => SkillsController.listSkills(c));
skills.get("/:id", (c) => SkillsController.getSkill(c));
skills.post("/", (c) => SkillsController.createSkill(c));
skills.patch("/:id", (c) => SkillsController.updateSkill(c));
skills.delete("/:id", (c) => SkillsController.deleteSkill(c));

export default skills;
