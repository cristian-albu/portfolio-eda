import type { ERRORS } from "./constants";

export type T_OmittedCreateFields = "id" | "createdAt" | "updatedAt";

export type T_RepoReturn<T> = { data: T | T[] | null; error: null | ERRORS };
