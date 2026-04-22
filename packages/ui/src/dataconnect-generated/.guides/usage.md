# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateDestino, useCreateCircuito, useUpsertUser, useCreateHotel, useCreateTarifa, useCreateItinerario, useUpdateCircuito, useGetDestinos, useGetDestino, useGetDestinoBySlug } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateDestino(createDestinoVars);

const { data, isPending, isSuccess, isError, error } = useCreateCircuito(createCircuitoVars);

const { data, isPending, isSuccess, isError, error } = useUpsertUser(upsertUserVars);

const { data, isPending, isSuccess, isError, error } = useCreateHotel(createHotelVars);

const { data, isPending, isSuccess, isError, error } = useCreateTarifa(createTarifaVars);

const { data, isPending, isSuccess, isError, error } = useCreateItinerario(createItinerarioVars);

const { data, isPending, isSuccess, isError, error } = useUpdateCircuito(updateCircuitoVars);

const { data, isPending, isSuccess, isError, error } = useGetDestinos();

const { data, isPending, isSuccess, isError, error } = useGetDestino(getDestinoVars);

const { data, isPending, isSuccess, isError, error } = useGetDestinoBySlug(getDestinoBySlugVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createDestino, createCircuito, upsertUser, createHotel, createTarifa, createItinerario, updateCircuito, getDestinos, getDestino, getDestinoBySlug } from '@dataconnect/generated';


// Operation CreateDestino:  For variables, look at type CreateDestinoVars in ../index.d.ts
const { data } = await CreateDestino(dataConnect, createDestinoVars);

// Operation CreateCircuito:  For variables, look at type CreateCircuitoVars in ../index.d.ts
const { data } = await CreateCircuito(dataConnect, createCircuitoVars);

// Operation UpsertUser:  For variables, look at type UpsertUserVars in ../index.d.ts
const { data } = await UpsertUser(dataConnect, upsertUserVars);

// Operation CreateHotel:  For variables, look at type CreateHotelVars in ../index.d.ts
const { data } = await CreateHotel(dataConnect, createHotelVars);

// Operation CreateTarifa:  For variables, look at type CreateTarifaVars in ../index.d.ts
const { data } = await CreateTarifa(dataConnect, createTarifaVars);

// Operation CreateItinerario:  For variables, look at type CreateItinerarioVars in ../index.d.ts
const { data } = await CreateItinerario(dataConnect, createItinerarioVars);

// Operation UpdateCircuito:  For variables, look at type UpdateCircuitoVars in ../index.d.ts
const { data } = await UpdateCircuito(dataConnect, updateCircuitoVars);

// Operation GetDestinos: 
const { data } = await GetDestinos(dataConnect);

// Operation GetDestino:  For variables, look at type GetDestinoVars in ../index.d.ts
const { data } = await GetDestino(dataConnect, getDestinoVars);

// Operation GetDestinoBySlug:  For variables, look at type GetDestinoBySlugVars in ../index.d.ts
const { data } = await GetDestinoBySlug(dataConnect, getDestinoBySlugVars);


```