import { salvarProgressoAction, getProgressoAction } from "@/lib/actions/progresso";

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
            const result = await salvarProgressoAction({
                lessonId: data.lessonId,
                moduleId: data.moduleId,
                data: {
                    score: data.score,
                    completed: data.completed,
                    read_percentage: data.readPercentage
                }
            });
            
            if (result.status === 'error') {
                console.error('Failed to save progress via action:', result.error);
            }
        } catch (error) {
            console.error('Failed to save progress:', error);
        }
    },

    getProgress: async (lessonId?: string): Promise<LessonProgress[]> => {
        try {
            const result = await getProgressoAction(lessonId);
            
            if (result.status === 'error') {
                console.error('Failed to fetch progress via action:', result.error);
                throw new Error(result.error);
            }

            const data = result.data || [];

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
