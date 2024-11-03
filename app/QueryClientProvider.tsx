'use client';
import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider as ReactQueryClientProvider} from '@tanstack/react-query'

const QueryClientProvider = ( {children}:PropsWithChildren ) => {
    const queryClient = new QueryClient();

  return (
    <ReactQueryClientProvider client={queryClient}>
        {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider

//imported QueryClient is a class
// 'queryClient'an object contains a cashe to store the data that we get from the backend(to cashe them in the client)
//and we pass it to our component tree using the imported QueryClientProvider(named as ReactQueryClienProvider) as a wrapper to the children
//ReactQueryClienProvider uses a react-context and react-context is only available in client comps so we use the component 'QueryClientProvider' to wrap it and also to get the children
