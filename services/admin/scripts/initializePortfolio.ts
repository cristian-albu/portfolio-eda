import db from "../src/db/Db";
import PortfolioSchema from "../src/db/PortfolioSchema";

try {
  const currDb = db.getPortfolio();
  const schema = new PortfolioSchema(currDb);

  schema.initializeSchema();
  currDb.close();
  console.log("✅ Portfolio schema initialized successfully");
} catch (error) {
  console.error("❌ Portfolio schema could not be initialized");
}
