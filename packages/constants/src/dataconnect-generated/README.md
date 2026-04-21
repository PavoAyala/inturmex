# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetDestinos*](#getdestinos)
  - [*GetDestinoBySlug*](#getdestinobyslug)
  - [*GetCircuitos*](#getcircuitos)
  - [*GetCircuitoDetail*](#getcircuitodetail)
- [**Mutations**](#mutations)
  - [*CreateDestino*](#createdestino)
  - [*CreateCircuito*](#createcircuito)
  - [*UpsertUser*](#upsertuser)
  - [*CreateHotel*](#createhotel)
  - [*CreateTarifa*](#createtarifa)
  - [*CreateItinerario*](#createitinerario)
  - [*UpdateCircuito*](#updatecircuito)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetDestinos
You can execute the `GetDestinos` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDestinos(options?: ExecuteQueryOptions): QueryPromise<GetDestinosData, undefined>;

interface GetDestinosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetDestinosData, undefined>;
}
export const getDestinosRef: GetDestinosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDestinos(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetDestinosData, undefined>;

interface GetDestinosRef {
  ...
  (dc: DataConnect): QueryRef<GetDestinosData, undefined>;
}
export const getDestinosRef: GetDestinosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDestinosRef:
```typescript
const name = getDestinosRef.operationName;
console.log(name);
```

### Variables
The `GetDestinos` query has no variables.
### Return Type
Recall that executing the `GetDestinos` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDestinosData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetDestinosData {
  destinos: ({
    id: string;
    nombre: string;
    slug: string;
    imagenUrl?: string | null;
    descripcion?: string | null;
  } & Destino_Key)[];
}
```
### Using `GetDestinos`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDestinos } from '@dataconnect/generated';


// Call the `getDestinos()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDestinos();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDestinos(dataConnect);

console.log(data.destinos);

// Or, you can use the `Promise` API.
getDestinos().then((response) => {
  const data = response.data;
  console.log(data.destinos);
});
```

### Using `GetDestinos`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDestinosRef } from '@dataconnect/generated';


// Call the `getDestinosRef()` function to get a reference to the query.
const ref = getDestinosRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDestinosRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.destinos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.destinos);
});
```

## GetDestinoBySlug
You can execute the `GetDestinoBySlug` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getDestinoBySlug(vars: GetDestinoBySlugVariables, options?: ExecuteQueryOptions): QueryPromise<GetDestinoBySlugData, GetDestinoBySlugVariables>;

interface GetDestinoBySlugRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDestinoBySlugVariables): QueryRef<GetDestinoBySlugData, GetDestinoBySlugVariables>;
}
export const getDestinoBySlugRef: GetDestinoBySlugRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDestinoBySlug(dc: DataConnect, vars: GetDestinoBySlugVariables, options?: ExecuteQueryOptions): QueryPromise<GetDestinoBySlugData, GetDestinoBySlugVariables>;

interface GetDestinoBySlugRef {
  ...
  (dc: DataConnect, vars: GetDestinoBySlugVariables): QueryRef<GetDestinoBySlugData, GetDestinoBySlugVariables>;
}
export const getDestinoBySlugRef: GetDestinoBySlugRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDestinoBySlugRef:
```typescript
const name = getDestinoBySlugRef.operationName;
console.log(name);
```

### Variables
The `GetDestinoBySlug` query requires an argument of type `GetDestinoBySlugVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDestinoBySlugVariables {
  slug: string;
}
```
### Return Type
Recall that executing the `GetDestinoBySlug` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDestinoBySlugData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetDestinoBySlugData {
  destinos: ({
    id: string;
    nombre: string;
    imagenUrl?: string | null;
    descripcion?: string | null;
  } & Destino_Key)[];
}
```
### Using `GetDestinoBySlug`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDestinoBySlug, GetDestinoBySlugVariables } from '@dataconnect/generated';

// The `GetDestinoBySlug` query requires an argument of type `GetDestinoBySlugVariables`:
const getDestinoBySlugVars: GetDestinoBySlugVariables = {
  slug: ..., 
};

// Call the `getDestinoBySlug()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDestinoBySlug(getDestinoBySlugVars);
// Variables can be defined inline as well.
const { data } = await getDestinoBySlug({ slug: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDestinoBySlug(dataConnect, getDestinoBySlugVars);

console.log(data.destinos);

// Or, you can use the `Promise` API.
getDestinoBySlug(getDestinoBySlugVars).then((response) => {
  const data = response.data;
  console.log(data.destinos);
});
```

### Using `GetDestinoBySlug`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDestinoBySlugRef, GetDestinoBySlugVariables } from '@dataconnect/generated';

// The `GetDestinoBySlug` query requires an argument of type `GetDestinoBySlugVariables`:
const getDestinoBySlugVars: GetDestinoBySlugVariables = {
  slug: ..., 
};

// Call the `getDestinoBySlugRef()` function to get a reference to the query.
const ref = getDestinoBySlugRef(getDestinoBySlugVars);
// Variables can be defined inline as well.
const ref = getDestinoBySlugRef({ slug: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDestinoBySlugRef(dataConnect, getDestinoBySlugVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.destinos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.destinos);
});
```

## GetCircuitos
You can execute the `GetCircuitos` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCircuitos(vars?: GetCircuitosVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircuitosData, GetCircuitosVariables>;

interface GetCircuitosRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetCircuitosVariables): QueryRef<GetCircuitosData, GetCircuitosVariables>;
}
export const getCircuitosRef: GetCircuitosRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCircuitos(dc: DataConnect, vars?: GetCircuitosVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircuitosData, GetCircuitosVariables>;

interface GetCircuitosRef {
  ...
  (dc: DataConnect, vars?: GetCircuitosVariables): QueryRef<GetCircuitosData, GetCircuitosVariables>;
}
export const getCircuitosRef: GetCircuitosRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCircuitosRef:
```typescript
const name = getCircuitosRef.operationName;
console.log(name);
```

### Variables
The `GetCircuitos` query has an optional argument of type `GetCircuitosVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCircuitosVariables {
  destinoId?: string | null;
}
```
### Return Type
Recall that executing the `GetCircuitos` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCircuitosData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCircuitosData {
  circuitos: ({
    id: UUIDString;
    nombre: string;
    paises?: string | null;
    ciudades?: string | null;
    duracionDias: number;
    precioUsd: number;
    impuestosUsd: number;
    imagenUrl?: string | null;
    destacado: boolean;
  } & Circuito_Key)[];
}
```
### Using `GetCircuitos`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCircuitos, GetCircuitosVariables } from '@dataconnect/generated';

// The `GetCircuitos` query has an optional argument of type `GetCircuitosVariables`:
const getCircuitosVars: GetCircuitosVariables = {
  destinoId: ..., // optional
};

// Call the `getCircuitos()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCircuitos(getCircuitosVars);
// Variables can be defined inline as well.
const { data } = await getCircuitos({ destinoId: ..., });
// Since all variables are optional for this query, you can omit the `GetCircuitosVariables` argument.
const { data } = await getCircuitos();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCircuitos(dataConnect, getCircuitosVars);

console.log(data.circuitos);

// Or, you can use the `Promise` API.
getCircuitos(getCircuitosVars).then((response) => {
  const data = response.data;
  console.log(data.circuitos);
});
```

### Using `GetCircuitos`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCircuitosRef, GetCircuitosVariables } from '@dataconnect/generated';

// The `GetCircuitos` query has an optional argument of type `GetCircuitosVariables`:
const getCircuitosVars: GetCircuitosVariables = {
  destinoId: ..., // optional
};

// Call the `getCircuitosRef()` function to get a reference to the query.
const ref = getCircuitosRef(getCircuitosVars);
// Variables can be defined inline as well.
const ref = getCircuitosRef({ destinoId: ..., });
// Since all variables are optional for this query, you can omit the `GetCircuitosVariables` argument.
const ref = getCircuitosRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCircuitosRef(dataConnect, getCircuitosVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circuitos);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circuitos);
});
```

## GetCircuitoDetail
You can execute the `GetCircuitoDetail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCircuitoDetail(vars: GetCircuitoDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircuitoDetailData, GetCircuitoDetailVariables>;

interface GetCircuitoDetailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircuitoDetailVariables): QueryRef<GetCircuitoDetailData, GetCircuitoDetailVariables>;
}
export const getCircuitoDetailRef: GetCircuitoDetailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCircuitoDetail(dc: DataConnect, vars: GetCircuitoDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircuitoDetailData, GetCircuitoDetailVariables>;

interface GetCircuitoDetailRef {
  ...
  (dc: DataConnect, vars: GetCircuitoDetailVariables): QueryRef<GetCircuitoDetailData, GetCircuitoDetailVariables>;
}
export const getCircuitoDetailRef: GetCircuitoDetailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCircuitoDetailRef:
```typescript
const name = getCircuitoDetailRef.operationName;
console.log(name);
```

### Variables
The `GetCircuitoDetail` query requires an argument of type `GetCircuitoDetailVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCircuitoDetailVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetCircuitoDetail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCircuitoDetailData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCircuitoDetailData {
  circuito?: {
    id: UUIDString;
    nombre: string;
    paises?: string | null;
    ciudades?: string | null;
    duracionDias: number;
    precioUsd: number;
    impuestosUsd: number;
    tipoHabitacion?: string | null;
    imagenUrl?: string | null;
    descripcion?: string | null;
    itinerarios_on_circuito: ({
      dia: number;
      titulo: string;
      descripcion: string;
    })[];
      hotels_on_circuito: ({
        nombre: string;
        ciudad?: string | null;
        tipo?: string | null;
      })[];
        tarifas_on_circuito: ({
          tipo: string;
          precioUsd: number;
        })[];
  } & Circuito_Key;
}
```
### Using `GetCircuitoDetail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCircuitoDetail, GetCircuitoDetailVariables } from '@dataconnect/generated';

// The `GetCircuitoDetail` query requires an argument of type `GetCircuitoDetailVariables`:
const getCircuitoDetailVars: GetCircuitoDetailVariables = {
  id: ..., 
};

// Call the `getCircuitoDetail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCircuitoDetail(getCircuitoDetailVars);
// Variables can be defined inline as well.
const { data } = await getCircuitoDetail({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCircuitoDetail(dataConnect, getCircuitoDetailVars);

console.log(data.circuito);

// Or, you can use the `Promise` API.
getCircuitoDetail(getCircuitoDetailVars).then((response) => {
  const data = response.data;
  console.log(data.circuito);
});
```

### Using `GetCircuitoDetail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCircuitoDetailRef, GetCircuitoDetailVariables } from '@dataconnect/generated';

// The `GetCircuitoDetail` query requires an argument of type `GetCircuitoDetailVariables`:
const getCircuitoDetailVars: GetCircuitoDetailVariables = {
  id: ..., 
};

// Call the `getCircuitoDetailRef()` function to get a reference to the query.
const ref = getCircuitoDetailRef(getCircuitoDetailVars);
// Variables can be defined inline as well.
const ref = getCircuitoDetailRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCircuitoDetailRef(dataConnect, getCircuitoDetailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circuito);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circuito);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateDestino
You can execute the `CreateDestino` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDestino(vars: CreateDestinoVariables): MutationPromise<CreateDestinoData, CreateDestinoVariables>;

interface CreateDestinoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDestinoVariables): MutationRef<CreateDestinoData, CreateDestinoVariables>;
}
export const createDestinoRef: CreateDestinoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDestino(dc: DataConnect, vars: CreateDestinoVariables): MutationPromise<CreateDestinoData, CreateDestinoVariables>;

interface CreateDestinoRef {
  ...
  (dc: DataConnect, vars: CreateDestinoVariables): MutationRef<CreateDestinoData, CreateDestinoVariables>;
}
export const createDestinoRef: CreateDestinoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDestinoRef:
```typescript
const name = createDestinoRef.operationName;
console.log(name);
```

### Variables
The `CreateDestino` mutation requires an argument of type `CreateDestinoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateDestinoVariables {
  id: string;
  nombre: string;
  slug: string;
  activo: boolean;
  imagenUrl?: string | null;
  descripcion?: string | null;
  orden?: number | null;
}
```
### Return Type
Recall that executing the `CreateDestino` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDestinoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDestinoData {
  destino_insert: Destino_Key;
}
```
### Using `CreateDestino`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDestino, CreateDestinoVariables } from '@dataconnect/generated';

// The `CreateDestino` mutation requires an argument of type `CreateDestinoVariables`:
const createDestinoVars: CreateDestinoVariables = {
  id: ..., 
  nombre: ..., 
  slug: ..., 
  activo: ..., 
  imagenUrl: ..., // optional
  descripcion: ..., // optional
  orden: ..., // optional
};

// Call the `createDestino()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDestino(createDestinoVars);
// Variables can be defined inline as well.
const { data } = await createDestino({ id: ..., nombre: ..., slug: ..., activo: ..., imagenUrl: ..., descripcion: ..., orden: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDestino(dataConnect, createDestinoVars);

console.log(data.destino_insert);

// Or, you can use the `Promise` API.
createDestino(createDestinoVars).then((response) => {
  const data = response.data;
  console.log(data.destino_insert);
});
```

### Using `CreateDestino`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDestinoRef, CreateDestinoVariables } from '@dataconnect/generated';

// The `CreateDestino` mutation requires an argument of type `CreateDestinoVariables`:
const createDestinoVars: CreateDestinoVariables = {
  id: ..., 
  nombre: ..., 
  slug: ..., 
  activo: ..., 
  imagenUrl: ..., // optional
  descripcion: ..., // optional
  orden: ..., // optional
};

// Call the `createDestinoRef()` function to get a reference to the mutation.
const ref = createDestinoRef(createDestinoVars);
// Variables can be defined inline as well.
const ref = createDestinoRef({ id: ..., nombre: ..., slug: ..., activo: ..., imagenUrl: ..., descripcion: ..., orden: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDestinoRef(dataConnect, createDestinoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.destino_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.destino_insert);
});
```

## CreateCircuito
You can execute the `CreateCircuito` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCircuito(vars: CreateCircuitoVariables): MutationPromise<CreateCircuitoData, CreateCircuitoVariables>;

interface CreateCircuitoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCircuitoVariables): MutationRef<CreateCircuitoData, CreateCircuitoVariables>;
}
export const createCircuitoRef: CreateCircuitoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCircuito(dc: DataConnect, vars: CreateCircuitoVariables): MutationPromise<CreateCircuitoData, CreateCircuitoVariables>;

interface CreateCircuitoRef {
  ...
  (dc: DataConnect, vars: CreateCircuitoVariables): MutationRef<CreateCircuitoData, CreateCircuitoVariables>;
}
export const createCircuitoRef: CreateCircuitoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCircuitoRef:
```typescript
const name = createCircuitoRef.operationName;
console.log(name);
```

### Variables
The `CreateCircuito` mutation requires an argument of type `CreateCircuitoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCircuitoVariables {
  nombre: string;
  destinoId: string;
  duracionDias: number;
  precioUsd: number;
  impuestosUsd: number;
  activo: boolean;
  destacado: boolean;
  paises?: string | null;
  ciudades?: string | null;
  tipoHabitacion?: string | null;
  imagenUrl?: string | null;
  descripcion?: string | null;
}
```
### Return Type
Recall that executing the `CreateCircuito` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCircuitoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCircuitoData {
  circuito_insert: Circuito_Key;
}
```
### Using `CreateCircuito`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCircuito, CreateCircuitoVariables } from '@dataconnect/generated';

// The `CreateCircuito` mutation requires an argument of type `CreateCircuitoVariables`:
const createCircuitoVars: CreateCircuitoVariables = {
  nombre: ..., 
  destinoId: ..., 
  duracionDias: ..., 
  precioUsd: ..., 
  impuestosUsd: ..., 
  activo: ..., 
  destacado: ..., 
  paises: ..., // optional
  ciudades: ..., // optional
  tipoHabitacion: ..., // optional
  imagenUrl: ..., // optional
  descripcion: ..., // optional
};

// Call the `createCircuito()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCircuito(createCircuitoVars);
// Variables can be defined inline as well.
const { data } = await createCircuito({ nombre: ..., destinoId: ..., duracionDias: ..., precioUsd: ..., impuestosUsd: ..., activo: ..., destacado: ..., paises: ..., ciudades: ..., tipoHabitacion: ..., imagenUrl: ..., descripcion: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCircuito(dataConnect, createCircuitoVars);

console.log(data.circuito_insert);

// Or, you can use the `Promise` API.
createCircuito(createCircuitoVars).then((response) => {
  const data = response.data;
  console.log(data.circuito_insert);
});
```

### Using `CreateCircuito`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCircuitoRef, CreateCircuitoVariables } from '@dataconnect/generated';

// The `CreateCircuito` mutation requires an argument of type `CreateCircuitoVariables`:
const createCircuitoVars: CreateCircuitoVariables = {
  nombre: ..., 
  destinoId: ..., 
  duracionDias: ..., 
  precioUsd: ..., 
  impuestosUsd: ..., 
  activo: ..., 
  destacado: ..., 
  paises: ..., // optional
  ciudades: ..., // optional
  tipoHabitacion: ..., // optional
  imagenUrl: ..., // optional
  descripcion: ..., // optional
};

// Call the `createCircuitoRef()` function to get a reference to the mutation.
const ref = createCircuitoRef(createCircuitoVars);
// Variables can be defined inline as well.
const ref = createCircuitoRef({ nombre: ..., destinoId: ..., duracionDias: ..., precioUsd: ..., impuestosUsd: ..., activo: ..., destacado: ..., paises: ..., ciudades: ..., tipoHabitacion: ..., imagenUrl: ..., descripcion: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCircuitoRef(dataConnect, createCircuitoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circuito_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circuito_insert);
});
```

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserRef:
```typescript
const name = upsertUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserVariables {
  id: string;
  displayName: string;
  email?: string | null;
  photoUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@dataconnect/generated';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  id: ..., 
  displayName: ..., 
  email: ..., // optional
  photoUrl: ..., // optional
};

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ id: ..., displayName: ..., email: ..., photoUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(dataConnect, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@dataconnect/generated';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  id: ..., 
  displayName: ..., 
  email: ..., // optional
  photoUrl: ..., // optional
};

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ id: ..., displayName: ..., email: ..., photoUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(dataConnect, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## CreateHotel
You can execute the `CreateHotel` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createHotel(vars: CreateHotelVariables): MutationPromise<CreateHotelData, CreateHotelVariables>;

interface CreateHotelRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateHotelVariables): MutationRef<CreateHotelData, CreateHotelVariables>;
}
export const createHotelRef: CreateHotelRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createHotel(dc: DataConnect, vars: CreateHotelVariables): MutationPromise<CreateHotelData, CreateHotelVariables>;

interface CreateHotelRef {
  ...
  (dc: DataConnect, vars: CreateHotelVariables): MutationRef<CreateHotelData, CreateHotelVariables>;
}
export const createHotelRef: CreateHotelRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createHotelRef:
```typescript
const name = createHotelRef.operationName;
console.log(name);
```

### Variables
The `CreateHotel` mutation requires an argument of type `CreateHotelVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateHotelVariables {
  circuitoId: UUIDString;
  nombre: string;
  ciudad?: string | null;
  tipo?: string | null;
  pais?: string | null;
}
```
### Return Type
Recall that executing the `CreateHotel` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateHotelData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateHotelData {
  hotel_insert: Hotel_Key;
}
```
### Using `CreateHotel`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createHotel, CreateHotelVariables } from '@dataconnect/generated';

// The `CreateHotel` mutation requires an argument of type `CreateHotelVariables`:
const createHotelVars: CreateHotelVariables = {
  circuitoId: ..., 
  nombre: ..., 
  ciudad: ..., // optional
  tipo: ..., // optional
  pais: ..., // optional
};

// Call the `createHotel()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createHotel(createHotelVars);
// Variables can be defined inline as well.
const { data } = await createHotel({ circuitoId: ..., nombre: ..., ciudad: ..., tipo: ..., pais: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createHotel(dataConnect, createHotelVars);

console.log(data.hotel_insert);

// Or, you can use the `Promise` API.
createHotel(createHotelVars).then((response) => {
  const data = response.data;
  console.log(data.hotel_insert);
});
```

### Using `CreateHotel`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createHotelRef, CreateHotelVariables } from '@dataconnect/generated';

// The `CreateHotel` mutation requires an argument of type `CreateHotelVariables`:
const createHotelVars: CreateHotelVariables = {
  circuitoId: ..., 
  nombre: ..., 
  ciudad: ..., // optional
  tipo: ..., // optional
  pais: ..., // optional
};

// Call the `createHotelRef()` function to get a reference to the mutation.
const ref = createHotelRef(createHotelVars);
// Variables can be defined inline as well.
const ref = createHotelRef({ circuitoId: ..., nombre: ..., ciudad: ..., tipo: ..., pais: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createHotelRef(dataConnect, createHotelVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.hotel_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.hotel_insert);
});
```

## CreateTarifa
You can execute the `CreateTarifa` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTarifa(vars: CreateTarifaVariables): MutationPromise<CreateTarifaData, CreateTarifaVariables>;

interface CreateTarifaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTarifaVariables): MutationRef<CreateTarifaData, CreateTarifaVariables>;
}
export const createTarifaRef: CreateTarifaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTarifa(dc: DataConnect, vars: CreateTarifaVariables): MutationPromise<CreateTarifaData, CreateTarifaVariables>;

interface CreateTarifaRef {
  ...
  (dc: DataConnect, vars: CreateTarifaVariables): MutationRef<CreateTarifaData, CreateTarifaVariables>;
}
export const createTarifaRef: CreateTarifaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTarifaRef:
```typescript
const name = createTarifaRef.operationName;
console.log(name);
```

### Variables
The `CreateTarifa` mutation requires an argument of type `CreateTarifaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateTarifaVariables {
  circuitoId: UUIDString;
  tipo: string;
  precioUsd: number;
  impuestosUsd?: number | null;
  anio?: number | null;
}
```
### Return Type
Recall that executing the `CreateTarifa` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTarifaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTarifaData {
  tarifa_insert: Tarifa_Key;
}
```
### Using `CreateTarifa`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTarifa, CreateTarifaVariables } from '@dataconnect/generated';

// The `CreateTarifa` mutation requires an argument of type `CreateTarifaVariables`:
const createTarifaVars: CreateTarifaVariables = {
  circuitoId: ..., 
  tipo: ..., 
  precioUsd: ..., 
  impuestosUsd: ..., // optional
  anio: ..., // optional
};

// Call the `createTarifa()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTarifa(createTarifaVars);
// Variables can be defined inline as well.
const { data } = await createTarifa({ circuitoId: ..., tipo: ..., precioUsd: ..., impuestosUsd: ..., anio: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTarifa(dataConnect, createTarifaVars);

console.log(data.tarifa_insert);

// Or, you can use the `Promise` API.
createTarifa(createTarifaVars).then((response) => {
  const data = response.data;
  console.log(data.tarifa_insert);
});
```

### Using `CreateTarifa`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTarifaRef, CreateTarifaVariables } from '@dataconnect/generated';

// The `CreateTarifa` mutation requires an argument of type `CreateTarifaVariables`:
const createTarifaVars: CreateTarifaVariables = {
  circuitoId: ..., 
  tipo: ..., 
  precioUsd: ..., 
  impuestosUsd: ..., // optional
  anio: ..., // optional
};

// Call the `createTarifaRef()` function to get a reference to the mutation.
const ref = createTarifaRef(createTarifaVars);
// Variables can be defined inline as well.
const ref = createTarifaRef({ circuitoId: ..., tipo: ..., precioUsd: ..., impuestosUsd: ..., anio: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTarifaRef(dataConnect, createTarifaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tarifa_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tarifa_insert);
});
```

## CreateItinerario
You can execute the `CreateItinerario` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createItinerario(vars: CreateItinerarioVariables): MutationPromise<CreateItinerarioData, CreateItinerarioVariables>;

interface CreateItinerarioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateItinerarioVariables): MutationRef<CreateItinerarioData, CreateItinerarioVariables>;
}
export const createItinerarioRef: CreateItinerarioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createItinerario(dc: DataConnect, vars: CreateItinerarioVariables): MutationPromise<CreateItinerarioData, CreateItinerarioVariables>;

interface CreateItinerarioRef {
  ...
  (dc: DataConnect, vars: CreateItinerarioVariables): MutationRef<CreateItinerarioData, CreateItinerarioVariables>;
}
export const createItinerarioRef: CreateItinerarioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createItinerarioRef:
```typescript
const name = createItinerarioRef.operationName;
console.log(name);
```

### Variables
The `CreateItinerario` mutation requires an argument of type `CreateItinerarioVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateItinerarioVariables {
  circuitoId: UUIDString;
  dia: number;
  titulo: string;
  descripcion: string;
}
```
### Return Type
Recall that executing the `CreateItinerario` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateItinerarioData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateItinerarioData {
  itinerario_insert: Itinerario_Key;
}
```
### Using `CreateItinerario`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createItinerario, CreateItinerarioVariables } from '@dataconnect/generated';

// The `CreateItinerario` mutation requires an argument of type `CreateItinerarioVariables`:
const createItinerarioVars: CreateItinerarioVariables = {
  circuitoId: ..., 
  dia: ..., 
  titulo: ..., 
  descripcion: ..., 
};

// Call the `createItinerario()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createItinerario(createItinerarioVars);
// Variables can be defined inline as well.
const { data } = await createItinerario({ circuitoId: ..., dia: ..., titulo: ..., descripcion: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createItinerario(dataConnect, createItinerarioVars);

console.log(data.itinerario_insert);

// Or, you can use the `Promise` API.
createItinerario(createItinerarioVars).then((response) => {
  const data = response.data;
  console.log(data.itinerario_insert);
});
```

### Using `CreateItinerario`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createItinerarioRef, CreateItinerarioVariables } from '@dataconnect/generated';

// The `CreateItinerario` mutation requires an argument of type `CreateItinerarioVariables`:
const createItinerarioVars: CreateItinerarioVariables = {
  circuitoId: ..., 
  dia: ..., 
  titulo: ..., 
  descripcion: ..., 
};

// Call the `createItinerarioRef()` function to get a reference to the mutation.
const ref = createItinerarioRef(createItinerarioVars);
// Variables can be defined inline as well.
const ref = createItinerarioRef({ circuitoId: ..., dia: ..., titulo: ..., descripcion: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createItinerarioRef(dataConnect, createItinerarioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.itinerario_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.itinerario_insert);
});
```

## UpdateCircuito
You can execute the `UpdateCircuito` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCircuito(vars: UpdateCircuitoVariables): MutationPromise<UpdateCircuitoData, UpdateCircuitoVariables>;

interface UpdateCircuitoRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCircuitoVariables): MutationRef<UpdateCircuitoData, UpdateCircuitoVariables>;
}
export const updateCircuitoRef: UpdateCircuitoRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCircuito(dc: DataConnect, vars: UpdateCircuitoVariables): MutationPromise<UpdateCircuitoData, UpdateCircuitoVariables>;

interface UpdateCircuitoRef {
  ...
  (dc: DataConnect, vars: UpdateCircuitoVariables): MutationRef<UpdateCircuitoData, UpdateCircuitoVariables>;
}
export const updateCircuitoRef: UpdateCircuitoRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCircuitoRef:
```typescript
const name = updateCircuitoRef.operationName;
console.log(name);
```

### Variables
The `UpdateCircuito` mutation requires an argument of type `UpdateCircuitoVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCircuitoVariables {
  id: UUIDString;
  nombre?: string | null;
  imagenUrl?: string | null;
  descripcion?: string | null;
  paises?: string | null;
  ciudades?: string | null;
}
```
### Return Type
Recall that executing the `UpdateCircuito` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCircuitoData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCircuitoData {
  circuito_update?: Circuito_Key | null;
}
```
### Using `UpdateCircuito`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCircuito, UpdateCircuitoVariables } from '@dataconnect/generated';

// The `UpdateCircuito` mutation requires an argument of type `UpdateCircuitoVariables`:
const updateCircuitoVars: UpdateCircuitoVariables = {
  id: ..., 
  nombre: ..., // optional
  imagenUrl: ..., // optional
  descripcion: ..., // optional
  paises: ..., // optional
  ciudades: ..., // optional
};

// Call the `updateCircuito()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCircuito(updateCircuitoVars);
// Variables can be defined inline as well.
const { data } = await updateCircuito({ id: ..., nombre: ..., imagenUrl: ..., descripcion: ..., paises: ..., ciudades: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCircuito(dataConnect, updateCircuitoVars);

console.log(data.circuito_update);

// Or, you can use the `Promise` API.
updateCircuito(updateCircuitoVars).then((response) => {
  const data = response.data;
  console.log(data.circuito_update);
});
```

### Using `UpdateCircuito`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCircuitoRef, UpdateCircuitoVariables } from '@dataconnect/generated';

// The `UpdateCircuito` mutation requires an argument of type `UpdateCircuitoVariables`:
const updateCircuitoVars: UpdateCircuitoVariables = {
  id: ..., 
  nombre: ..., // optional
  imagenUrl: ..., // optional
  descripcion: ..., // optional
  paises: ..., // optional
  ciudades: ..., // optional
};

// Call the `updateCircuitoRef()` function to get a reference to the mutation.
const ref = updateCircuitoRef(updateCircuitoVars);
// Variables can be defined inline as well.
const ref = updateCircuitoRef({ id: ..., nombre: ..., imagenUrl: ..., descripcion: ..., paises: ..., ciudades: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCircuitoRef(dataConnect, updateCircuitoVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circuito_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circuito_update);
});
```

