import type { Context } from "hono";
import SkillsRepository, { type T_CreateSkill } from "../repositories/SkillsRepository";
import db from "../db/Db";
import { ERRORS, METHODS, SUCCESS } from "../constants";

const skillsRepo = new SkillsRepository(db.getPortfolio());

export default class SkillsController {
  public static async listSkills(c: Context) {
    const data = await skillsRepo.findAll();
    if (data.error) return c.json({ message: data.error }, 500);

    return c.json(data.data);
  }

  public static async getSkill(c: Context) {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ message: ERRORS.badRequest }, 400);

    const data = await skillsRepo.findOne(id);
    if (data.error === ERRORS.notFound) return c.json({ message: data.error }, 400);
    if (data.error) return c.json({ message: data.error }, 500);

    return c.json(data.data);
  }

  public static async createSkill(c: Context) {
    const body: T_CreateSkill = await c.req.json();
    if (typeof body.title !== "string" || typeof body.description !== "string" || typeof body.image !== "string") {
      return c.json({ message: ERRORS.badRequest }, 400);
    }

    const data = await skillsRepo.createOne(body);
    if (data.error) return c.json({ message: data.error }, 500);

    return c.json(data.data, 201);
  }

  public static async updateSkill(c: Context) {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ message: ERRORS.badRequest }, 400);

    const body: T_CreateSkill = await c.req.json();
    if (typeof body !== "object" || body === null) return c.json({ message: ERRORS.badRequest }, 400);

    const entries = Object.entries(body);
    if (entries.length < 1) return c.json({ message: ERRORS.badRequest }, 400);
    for (const [key, val] of entries) {
      if (typeof val !== "string" || !["title", "description", "image"].includes(key)) {
        return c.json({ message: ERRORS.badRequest }, 400);
      }
    }

    const data = await skillsRepo.updateOne(id, body);
    if (data.error === ERRORS.notFound) return c.json({ message: data.error }, 400);
    if (data.error) return c.json({ message: data.error }, 500);

    return c.json(data.data);
  }

  public static async deleteSkill(c: Context) {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.json({ message: ERRORS.badRequest }, 400);

    const data = await skillsRepo.deleteOne(id);
    if (data.error) return c.json({ message: data.error }, 500);

    return c.json({ message: SUCCESS.deleted });
  }
}
