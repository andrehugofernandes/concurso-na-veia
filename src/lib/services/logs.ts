export const logsService = {
    getStats: async () => {
        return {
            logsToday: 15,
            logsByLevel: { info: 10, warn: 3, error: 2 },
            recentLogs: []
        };
    },
    getRecentLogs: async () => {
        return [];
    },
    log: async (level: string, message: string, meta?: any) => {
        console.log(`[LOG:${level}] ${message}`, meta);
    }
};
