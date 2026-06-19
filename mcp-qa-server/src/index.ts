import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const server = new Server(
  {
    name: "mcp-qa-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register Tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "run_security_tests",
        description: "Run vitest security and authorization tests",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "run_security_tests") {
    try {
      // Runs the tests on the parent directory
      const { stdout, stderr } = await execAsync("pnpm exec vitest run", { cwd: "../" });
      return {
        content: [
          {
            type: "text",
            text: `Tests passed successfully:\n${stdout}\n${stderr}`,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Tests failed:\n${error.message}\nSTDOUT:\n${error.stdout}\nSTDERR:\n${error.stderr}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Tool not found: ${request.params.name}`);
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("QA MCP Server running on stdio");
}

run().catch(console.error);
