import { AsyncResponse, AsyncFunction } from "./types";



type Cache = Map<string, any>;

const cache: Cache = new Map();

const createAsyncAction = async <T>(
    asyncFunction: AsyncFunction<T>,
    asyncActionCallback: (asyncResponse: AsyncResponse<T>) => any,
    payload?: any
) => {
    const cacheKey = JSON.stringify(payload);
    if (cache.has(cacheKey)) {
        const data = cache.get(cacheKey);
        asyncActionCallback({
            data,
            isLoading: false,
            isError: false,
            error: null,
        });
    } else {
        asyncActionCallback({
            data: null,
            isLoading: true,
            isError: false,
            error: null,
        });

        try {
            const data = await asyncFunction(payload);
            cache.set(cacheKey, data);
            asyncActionCallback({
                data,
                isLoading: false,
                isError: false,
                error: null,
            });
        } catch (error: unknown) {
            asyncActionCallback({
                data: null,
                isLoading: false,
                isError: true,
                error: error as unknown as Error | null,
            });
        }
    }
};

export default createAsyncAction;
