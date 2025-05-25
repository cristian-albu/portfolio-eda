import { Database } from "bun:sqlite";
import { ERRORS } from "../../constants";
import type { T_RepoReturn } from "../../types";

export interface I_Repository<T> {
  findOne: (id: number) => Promise<T_RepoReturn<T>>;
  findAll: () => Promise<T_RepoReturn<T>>;
  createOne: (data: T) => Promise<T_RepoReturn<T>>;
  updateOne: (id: number, data: Partial<T>) => Promise<T_RepoReturn<T>>;
  deleteOne: (id: number) => Promise<T_RepoReturn<T>>;
}

export abstract class ModelRepository<T> implements I_Repository<T> {
  protected db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  protected async execute(fn: () => Promise<T_RepoReturn<T>>) {
    try {
      const data = await fn();

      return data;
    } catch (error) {
      console.error(error);
      return { data: null, error: ERRORS.serverError };
    }
  }

  abstract findOne(id: number): Promise<T_RepoReturn<T>>;
  abstract findAll(): Promise<T_RepoReturn<T>>;
  abstract createOne(data: T): Promise<T_RepoReturn<T>>;
  abstract updateOne(id: number, data: Partial<T>): Promise<T_RepoReturn<T>>;
  abstract deleteOne(id: number): Promise<T_RepoReturn<T>>;
}
