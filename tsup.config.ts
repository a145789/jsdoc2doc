import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  splitting: true,
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
  outDir: "dist",
})
