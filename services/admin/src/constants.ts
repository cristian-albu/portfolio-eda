export const ORIGIN = "http://localhost:3000";

export const PUBLIC_PATH = `${ORIGIN}/public`;

export enum DATABASES {
  portfolio = "portfolio",
}

export const DB_FILES = {
  [DATABASES.portfolio]: "data/portfolio.sqlite",
};

export enum METHODS {
  get = "GET",
  post = "POST",
  patch = "PATCH",
  put = "PUT",
  delete = "DELETE",
}

export enum ERRORS {
  serverError = "Something went wrong",
  notFound = "Resource not found",
  badRequest = "Bad request",
  methodNotAllowed = "Method not allowed",
}

export enum SUCCESS {
  deleted = "Deleted resource successfully",
}
