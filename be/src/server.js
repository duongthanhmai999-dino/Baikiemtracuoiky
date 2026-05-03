import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();

const port = Number(process.env.PORT || 4000);

const start = async () => {
  app.listen(port, () => {
    console.log(`[be] listening on http://localhost:${port}`);
    console.log("[be] auth users file:", process.env.USERS_JSON_FILE || "db/users.json");
  });
};

start().catch((err) => {
  console.error("[be] failed to start:", err);
  process.exit(1);
});
