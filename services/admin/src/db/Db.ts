import { Database } from "bun:sqlite";
import { DB_FILES, DATABASES } from "../constants";

class Db {
  private databases: Record<DATABASES, Database>;
  constructor() {
    const portfolio = new Database(DB_FILES[DATABASES.portfolio]);
    portfolio.exec("PRAGMA journal_mode = WAL;");

    this.databases = {
      [DATABASES.portfolio]: portfolio,
    };
  }

  public getPortfolio() {
    return this.databases[DATABASES.portfolio];
  }
}

const db = new Db();

export default db;
