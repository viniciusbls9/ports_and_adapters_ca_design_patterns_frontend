import { createContext, PropsWithChildren, useContext } from "react"
import TodoGateway from "src/gateways/TodoGateway"
import TodoHttpGateway from "src/gateways/TodoHttpGateway"
import AxiosAdapter from "src/infra/AxiosAdapter"

const httpClientInstance = new AxiosAdapter()

export type HttpClientType = {
    todoGateway: TodoGateway
}

const defaultContext: HttpClientType = {
    todoGateway: new TodoHttpGateway(httpClientInstance, 'http://localhost:3001')
}

export const HttpClientContext = createContext(defaultContext)

export const HttpClientProvider = ({ children }: PropsWithChildren) => {
    const todoGateway = new TodoHttpGateway(httpClientInstance, 'http://localhost:3001')

    return (
        <HttpClientContext.Provider value={{ todoGateway }}>
            {children}
        </HttpClientContext.Provider>
    )
}

export const useHttpClient = () => {
    return useContext(HttpClientContext);
}