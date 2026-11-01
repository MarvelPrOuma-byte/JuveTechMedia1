import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { env as processEnv } from "node:process";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  processEnv["MAILCHIMP_API_KEY"] ??= env["MAILCHIMP_API_KEY"];
  processEnv["MAILCHIMP_AUDIENCE_ID"] ??= env["MAILCHIMP_AUDIENCE_ID"];

  return {
    resolve: { tsconfigPaths: true },
    plugins: [tanstackStart({ server: { entry: "server" } }), react(), tailwindcss()],
  };
});
