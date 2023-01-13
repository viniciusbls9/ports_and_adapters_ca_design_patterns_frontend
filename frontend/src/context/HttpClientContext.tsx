import { createContext, PropsWithChildren, useContext } from "react"
import AxiosAdapter from "src/infra/AxiosAdapter"
import HttpClient from "src/infra/HttpClient"

export type HttpClientType = {
    httpClient: HttpClient
}

const defaultContext: HttpClientType = {
    httpClient: new AxiosAdapter()
}

export const HttpClientContext = createContext(defaultContext)

export const HttpClientProvider = ({ children }: PropsWithChildren) => {
    const httpClient = new AxiosAdapter()

    return (
        <HttpClientContext.Provider value={{ httpClient }}>
            {children}
        </HttpClientContext.Provider>
    )
}

export const HttpClient = () => {
    return useContext(HttpClientContext);
}