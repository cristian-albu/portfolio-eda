import { Database } from "bun:sqlite";

export default abstract class Schema {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  protected initTable(tableName: string, query: string) {
    try {
      this.db.run(query);
      console.log(`init ${tableName} table was executed successfully`);
    } catch (error) {
      console.error(`init ${tableName} table did not execute correctly`);
    }
  }

  public abstract initializeSchema(): void;
}
