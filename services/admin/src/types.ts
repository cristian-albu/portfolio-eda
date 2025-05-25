import type { ERRORS } from "./constants";

export type T_OmittedCreateFields = "id" | "created_at" | "updated_at";

export type T_RepoReturn<T> = { data: T | T[] | null; error: null | ERRORS };
