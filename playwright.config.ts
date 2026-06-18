import { defineConfig } from "@playwright/test";
import * as dotenv from "dotenv";

const envFile = process.env.CI ? ".env.test" : ".env.local";
dotenv.config({ path: envFile });

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "bun run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
