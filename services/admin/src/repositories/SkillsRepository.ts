import { Database } from "bun:sqlite";
import { ModelRepository } from "./utils";
import { ERRORS } from "../constants";
import type { T_OmittedCreateFields } from "../types";
import SkillsEvents from "../events/SkillsEvents";

export type T_Skill = {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
};

export type T_CreateSkill = Omit<T_Skill, T_OmittedCreateFields>;

export default class SkillsRepository extends ModelRepository<T_Skill> {
  constructor(db: Database) {
    super(db);
  }

  public async findAll() {
    const query = "SELECT * FROM skills";

    return this.execute(async () => {
      const data = this.db.query<T_Skill, null>(query).all(null);

      return { data: data, error: null };
    });
  }

  public async findOne(id: number) {
    const query = "SELECT * FROM skills WHERE id = ?";

    return this.execute(async () => {
      const data = this.db.query<T_Skill, number>(query).get(id);

      if (data === null) {
        return { data: null, error: ERRORS.notFound };
      }

      return { data: data, error: null };
    });
  }

  public async createOne(data: T_CreateSkill) {
    const query = "INSERT INTO skills (title, description, image) VALUES ($title, $description, $image)";

    return this.execute(async () => {
      const result = this.db.prepare(query).run({
        $title: data.title,
        $description: data.description,
        $image: data.image,
      });

      if (result.changes === 0) {
        console.error(`Create skill table affected ${result} rows`);
        return { data: null, error: ERRORS.serverError };
      }

      if (result.changes > 1) {
        console.error(`Create skill table affected ${result} rows`);
      }

      const row = await this.findOne(Number(result.lastInsertRowid));

      if (row.error) {
        return { data: null, error: ERRORS.serverError };
      }

      SkillsEvents.publishSkillCreated(row.data);

      return row;
    });
  }

  public async updateOne(id: number, data: Partial<T_CreateSkill>) {
    const fields = [];
    const statementFields: Record<string, string | number> = {
      $id: id,
    };

    if (data.title !== undefined) {
      fields.push("title = $title");
      statementFields["$title"] = data.title;
    }

    if (data.description !== undefined) {
      fields.push("description = $description");
      statementFields["$description"] = data.description;
    }

    if (data.image !== undefined) {
      fields.push("image = $image");
      statementFields["$image"] = data.image;
    }

    if (fields.length === 0) {
      return { data: null, error: ERRORS.badRequest };
    }

    const query = `UPDATE skills SET ${fields.join(", ")} WHERE id = $id`;

    return this.execute(async () => {
      const result = this.db.prepare(query).run(statementFields);

      if (result.changes === 0) {
        console.error(`Update skill table affected ${result} rows`);
        return { data: null, error: ERRORS.serverError };
      }

      if (result.changes > 1) {
        console.error(`Update skill table affected ${result} rows`);
      }

      const row = await this.findOne(id);

      return row;
    });
  }

  public async deleteOne(id: number) {
    const query = "DELETE FROM skills WHERE id = ?";

    return this.execute(async () => {
      const result = this.db.prepare(query).run(id);

      if (result.changes === 0) {
        console.error(`Delete skill table affected ${result} rows`);
        return { data: null, error: ERRORS.serverError };
      }

      if (result.changes > 1) {
        console.error(`Delete skill table affected ${result} rows`);
      }

      return { data: null, error: null };
    });
  }
}
