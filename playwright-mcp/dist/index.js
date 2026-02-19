import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema, ErrorCode, McpError, } from "@modelcontextprotocol/sdk/types.js";
import { chromium } from "playwright";
class PlaywrightServer {
    server;
    browser = null;
    page = null;
    constructor() {
        this.server = new Server({
            name: "playwright-mcp-local",
            version: "1.0.0",
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupTools();
    }
    async getPage() {
        if (!this.browser) {
            console.error("Tentando iniciar Chrome do sistema...");
            this.browser = await chromium.launch({
                headless: false,
                channel: "chrome"
            });
        }
        if (!this.page) {
            this.page = await this.browser.newPage();
        }
        return this.page;
    }
    setupTools() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: "playwright_navigate",
                    description: "Navegar para uma URL",
                    inputSchema: {
                        type: "object",
                        properties: {
                            url: { type: "string" },
                        },
                        required: ["url"],
                    },
                },
                {
                    name: "playwright_screenshot",
                    description: "Tirar screenshot",
                    inputSchema: {
                        type: "object",
                        properties: {
                            name: { type: "string" },
                        },
                        required: ["name"],
                    },
                }
            ],
        }));
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const page = await this.getPage();
            if (request.params.name === "playwright_navigate") {
                const { url } = request.params.arguments;
                await page.goto(url);
                return { content: [{ type: "text", text: `Navegou para ${url}` }] };
            }
            if (request.params.name === "playwright_screenshot") {
                const { name } = request.params.arguments;
                await page.screenshot({ path: `${name}.png` });
                return { content: [{ type: "text", text: `Screenshot salvo` }] };
            }
            throw new McpError(ErrorCode.MethodNotFound, "Não encontrado");
        });
    }
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
    }
}
const server = new PlaywrightServer();
server.run().catch(console.error);
