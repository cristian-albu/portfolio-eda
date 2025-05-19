import { DB_FILES, DATABASES } from "../src/constants";

try {
  const file = Bun.file(DB_FILES[DATABASES.portfolio]);
  await file.delete();
  console.log("✅ Portfolio db file deleted successfully");
} catch (error) {
  console.error("❌ Error while deleting the portfolio db file");
}
