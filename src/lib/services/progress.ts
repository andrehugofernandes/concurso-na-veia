
export interface LessonProgress {
    lessonId: string;
    moduleId: string;
    score?: number;
    completed: boolean;
    readPercentage: number;
    updatedAt: string;
}

export const progressService = {
    saveProgress: async (data: { lessonId: string, moduleId: string, score?: number, completed?: boolean, readPercentage?: number }) => {
        try {
            await fetch('/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lessonId: data.lessonId,
                    moduleId: data.moduleId,
                    data: {
                        score: data.score,
                        completed: data.completed,
                        read_percentage: data.readPercentage
                    }
                })
            });
        } catch (error) {
            console.error('Failed to save progress:', error);
        }
    },

    getProgress: async (lessonId?: string): Promise<LessonProgress[]> => {
        try {
            const query = lessonId ? `?lessonId=${lessonId}` : '';
            const response = await fetch(`/api/progress${query}`);
            if (!response.ok) {
                let errorMsg = 'Failed to fetch progress';
                try {
                    const errorText = await response.text();
                    errorMsg = `${errorMsg}: ${response.status} ${errorText}`;
                } catch (e) {
                    errorMsg = `${errorMsg}: ${response.status}`;
                }
                console.error(errorMsg);
                throw new Error(errorMsg);
            }

            const data = await response.json();

            // Map Snake Case from DB to Camel Case for Frontend
            return data.map((item: any) => ({
                lessonId: item.lesson_id,
                moduleId: item.module_id,
                score: item.score,
                completed: item.completed,
                readPercentage: item.read_percentage,
                updatedAt: item.updated_at
            }));

        } catch (error) {
            console.error('Failed to get progress:', error);
            return [];
        }
    }
};
