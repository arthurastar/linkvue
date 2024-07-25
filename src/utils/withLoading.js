import { useLoading } from '@/stores/loadingStore';

export function withLoading(fn) {
    return async function (...args) {
        const { setLoading } = useLoading();
        setLoading(true);
        try {
            const result = await fn(...args);
            return result;
        } catch (error) {
            console.error("An error occurred:", error);
            throw error; // Re-lança o erro para ser tratado onde a função for chamada
        } finally {
            setLoading(false);
        }
    };
}