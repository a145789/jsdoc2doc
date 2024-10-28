#!/usr/bin/env node

import { cli } from "cleye"
import { name, description, version } from "../package.json"
import { generateDoc } from "."

cli(
  {
    name,

    version,

    flags: {
      entry: {
        type: String,
        description: "entry file",
        default: "src/index.ts",
      },
      output: {
        type: String,
        description: "output directory",
        default: "docs",
      },
    },

    help: {
      description,
    },
  },
  (argv) => {
    generateDoc({
      // entry: "./example/fixtures/src",
      // output: "./example/docs",
      entry: argv.flags.entry,
      output: argv.flags.output,
    })
  },
)
