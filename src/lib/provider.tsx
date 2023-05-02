import React, { FC, ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

import type { SpyStoreProviderProps } from "./types";


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