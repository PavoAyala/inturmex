# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createDestino, createCircuito, upsertUser, updateUserRole, deleteUser, createHotel, createTarifa, createItinerario, updateCircuito, createReservacion } from '@dataconnect/generated';


// Operation CreateDestino:  For variables, look at type CreateDestinoVars in ../index.d.ts
const { data } = await CreateDestino(dataConnect, createDestinoVars);

// Operation CreateCircuito:  For variables, look at type CreateCircuitoVars in ../index.d.ts
const { data } = await CreateCircuito(dataConnect, createCircuitoVars);

// Operation UpsertUser:  For variables, look at type UpsertUserVars in ../index.d.ts
const { data } = await UpsertUser(dataConnect, upsertUserVars);

// Operation UpdateUserRole:  For variables, look at type UpdateUserRoleVars in ../index.d.ts
const { data } = await UpdateUserRole(dataConnect, updateUserRoleVars);

// Operation DeleteUser:  For variables, look at type DeleteUserVars in ../index.d.ts
const { data } = await DeleteUser(dataConnect, deleteUserVars);

// Operation CreateHotel:  For variables, look at type CreateHotelVars in ../index.d.ts
const { data } = await CreateHotel(dataConnect, createHotelVars);

// Operation CreateTarifa:  For variables, look at type CreateTarifaVars in ../index.d.ts
const { data } = await CreateTarifa(dataConnect, createTarifaVars);

// Operation CreateItinerario:  For variables, look at type CreateItinerarioVars in ../index.d.ts
const { data } = await CreateItinerario(dataConnect, createItinerarioVars);

// Operation UpdateCircuito:  For variables, look at type UpdateCircuitoVars in ../index.d.ts
const { data } = await UpdateCircuito(dataConnect, updateCircuitoVars);

// Operation CreateReservacion:  For variables, look at type CreateReservacionVars in ../index.d.ts
const { data } = await CreateReservacion(dataConnect, createReservacionVars);


```