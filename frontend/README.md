# FrontEnd with Ports and Adapters, Clean Arch and Design Patterns

## Infra
- HttpClient
    - Create a http contract, library independent

- AxiosAdapter
    - Create a http methods using axios, but uncoupled and and being able to use another library

## Context
- HttpClientContext
    - Create HttpClientContext to abstract AxiosAdapter instance