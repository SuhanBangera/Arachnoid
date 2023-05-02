import React, { FC, ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

export interface SpyStoreProviderProps {
    children: ReactNode
}

const SpyStoreProvider: FC<SpyStoreProviderProps> = ({children}) => {
    const query = new QueryClient()

    return (
        <QueryClientProvider
            client={query}
        >
            {children}
        </QueryClientProvider>
    )
}

export default SpyStoreProvider;