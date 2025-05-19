import { Database } from "bun:sqlite";
import Schema from "./Schema";

export default class PortfolioSchema extends Schema {
  constructor(db: Database) {
    super(db);
  }

  private initSkills() {
    const query = `
      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    this.initTable("skills", query);
  }

  private initClients() {
    const query = `
      CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        logo TEXT NOT NULL,
        representative TEXT NOT NULL,
        representative_image TEXT NOT NULL,
        testimonial TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`;

    this.initTable("clients", query);
  }

  private initProjects() {
    const query = `
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        thumbnail TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`;

    this.initTable("prijects", query);
  }

  private initArticles() {
    const query = `
      CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        thumbnail TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`;

    this.initTable("articles", query);
  }

  private initExperience() {
    const query = `
      CREATE TABLE IF NOT EXISTS experience (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        content TEXT NOT NULL,
        start_date DATETIME NOT NULL,
        end_date DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        organization_id INTEGER,
        FOREIGN KEY (organization_id) REFERENCES clients (id) ON DELETE CASCADE
      )`;

    this.initTable("experience", query);
  }

  private initProjectSkills() {
    const query = `
      CREATE TABLE IF NOT EXISTS project_skills (
        project_id INTEGER,
        skill_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (project_id, skill_id),
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE
      )`;

    this.initTable("projectSkills", query);
  }

  private initExperienceSkills() {
    const query = `
      CREATE TABLE IF NOT EXISTS experience_skills (
        experience_id INTEGER,
        skill_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (experience_id, skill_id),
        PRIMARY KEY (experience_id, skill_id),
        FOREIGN KEY (experience_id) REFERENCES experience (id) ON DELETE CASCADE,
        FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE
      )`;

    this.initTable("experienceSkills", query);
  }

  public initializeSchema() {
    this.initSkills();
    this.initClients();
    this.initProjects();
    this.initExperience();
    this.initArticles();
    this.initExperienceSkills();
    this.initProjectSkills();
  }
}
