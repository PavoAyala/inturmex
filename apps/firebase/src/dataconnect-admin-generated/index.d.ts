import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Circuito_Key {
  id: UUIDString;
  __typename?: 'Circuito_Key';
}

export interface CreateCircuitoData {
  circuito_insert: Circuito_Key;
}

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

export interface CreateDestinoData {
  destino_insert: Destino_Key;
}

export interface CreateDestinoVariables {
  id: string;
  nombre: string;
  slug: string;
  activo: boolean;
  imagenUrl?: string | null;
  descripcion?: string | null;
  orden?: number | null;
}

export interface CreateHotelData {
  hotel_insert: Hotel_Key;
}

export interface CreateHotelVariables {
  circuitoId: UUIDString;
  nombre: string;
  ciudad?: string | null;
  tipo?: string | null;
  pais?: string | null;
}

export interface CreateItinerarioData {
  itinerario_insert: Itinerario_Key;
}

export interface CreateItinerarioVariables {
  circuitoId: UUIDString;
  dia: number;
  titulo: string;
  descripcion: string;
}

export interface CreateReservacionData {
  reservacion_insert: Reservacion_Key;
}

export interface CreateReservacionVariables {
  usuarioId: string;
  circuitoId?: UUIDString | null;
  fechaViaje: DateString;
  numPersonas: number;
  precioTotalUsd: number;
  estatus: string;
  tipoHabitacion?: string | null;
  notas?: string | null;
}

export interface CreateTarifaData {
  tarifa_insert: Tarifa_Key;
}

export interface CreateTarifaVariables {
  circuitoId: UUIDString;
  tipo: string;
  precioUsd: number;
  impuestosUsd?: number | null;
  anio?: number | null;
}

export interface DeleteReservacionData {
  reservacion_delete?: Reservacion_Key | null;
}

export interface DeleteReservacionVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface DeleteUserVariables {
  id: string;
}

export interface Destino_Key {
  id: string;
  __typename?: 'Destino_Key';
}

export interface GetAllReservacionesData {
  reservacions: ({
    id: UUIDString;
    fechaViaje: DateString;
    numPersonas: number;
    precioTotalUsd: number;
    estatus: string;
    usuario?: {
      displayName: string;
      email?: string | null;
    };
      circuito?: {
        nombre: string;
      };
        paquete?: {
          nombre: string;
        };
  } & Reservacion_Key)[];
}

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

export interface GetCircuitoDetailVariables {
  id: UUIDString;
}

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

export interface GetCircuitosVariables {
  destinoId?: string | null;
}

export interface GetDestinoBySlugData {
  destinos: ({
    id: string;
    nombre: string;
    imagenUrl?: string | null;
    descripcion?: string | null;
  } & Destino_Key)[];
}

export interface GetDestinoBySlugVariables {
  slug: string;
}

export interface GetDestinoData {
  destino?: {
    id: string;
    nombre: string;
    imagenUrl?: string | null;
    descripcion?: string | null;
  } & Destino_Key;
}

export interface GetDestinoVariables {
  id: string;
}

export interface GetDestinosData {
  destinos: ({
    id: string;
    nombre: string;
    slug: string;
    imagenUrl?: string | null;
    descripcion?: string | null;
  } & Destino_Key)[];
}

export interface GetUserByIdData {
  user?: {
    id: string;
    displayName: string;
    email?: string | null;
    role?: string | null;
    photoUrl?: string | null;
  } & User_Key;
}

export interface GetUserByIdVariables {
  id: string;
}

export interface Hotel_Key {
  id: UUIDString;
  __typename?: 'Hotel_Key';
}

export interface Itinerario_Key {
  id: UUIDString;
  __typename?: 'Itinerario_Key';
}

export interface ListAllUsersData {
  users: ({
    id: string;
    displayName: string;
    email?: string | null;
    role?: string | null;
    createdAt: TimestampString;
  } & User_Key)[];
}

export interface Paquete_Key {
  id: UUIDString;
  __typename?: 'Paquete_Key';
}

export interface Promocion_Key {
  id: UUIDString;
  __typename?: 'Promocion_Key';
}

export interface Reservacion_Key {
  id: UUIDString;
  __typename?: 'Reservacion_Key';
}

export interface Tarifa_Key {
  id: UUIDString;
  __typename?: 'Tarifa_Key';
}

export interface UpdateCircuitoData {
  circuito_update?: Circuito_Key | null;
}

export interface UpdateCircuitoVariables {
  id: UUIDString;
  nombre?: string | null;
  imagenUrl?: string | null;
  descripcion?: string | null;
  paises?: string | null;
  ciudades?: string | null;
}

export interface UpdateReservacionData {
  reservacion_update?: Reservacion_Key | null;
}

export interface UpdateReservacionVariables {
  id: UUIDString;
  estatus?: string | null;
  numPersonas?: number | null;
  tipoHabitacion?: string | null;
  notas?: string | null;
}

export interface UpdateUserRoleData {
  user_update?: User_Key | null;
}

export interface UpdateUserRoleVariables {
  id: string;
  role: string;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  id: string;
  displayName: string;
  email?: string | null;
  photoUrl?: string | null;
  role?: string | null;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

/** Generated Node Admin SDK operation action function for the 'CreateDestino' Mutation. Allow users to execute without passing in DataConnect. */
export function createDestino(dc: DataConnect, vars: CreateDestinoVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateDestinoData>>;
/** Generated Node Admin SDK operation action function for the 'CreateDestino' Mutation. Allow users to pass in custom DataConnect instances. */
export function createDestino(vars: CreateDestinoVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateDestinoData>>;

/** Generated Node Admin SDK operation action function for the 'CreateCircuito' Mutation. Allow users to execute without passing in DataConnect. */
export function createCircuito(dc: DataConnect, vars: CreateCircuitoVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateCircuitoData>>;
/** Generated Node Admin SDK operation action function for the 'CreateCircuito' Mutation. Allow users to pass in custom DataConnect instances. */
export function createCircuito(vars: CreateCircuitoVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateCircuitoData>>;

/** Generated Node Admin SDK operation action function for the 'UpsertUser' Mutation. Allow users to execute without passing in DataConnect. */
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertUserData>>;
/** Generated Node Admin SDK operation action function for the 'UpsertUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function upsertUser(vars: UpsertUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertUserData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateUserRole' Mutation. Allow users to execute without passing in DataConnect. */
export function updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateUserRoleData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateUserRole' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateUserRole(vars: UpdateUserRoleVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateUserRoleData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteUser' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteUser(dc: DataConnect, vars: DeleteUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteUserData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteUser(vars: DeleteUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteUserData>>;

/** Generated Node Admin SDK operation action function for the 'CreateHotel' Mutation. Allow users to execute without passing in DataConnect. */
export function createHotel(dc: DataConnect, vars: CreateHotelVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateHotelData>>;
/** Generated Node Admin SDK operation action function for the 'CreateHotel' Mutation. Allow users to pass in custom DataConnect instances. */
export function createHotel(vars: CreateHotelVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateHotelData>>;

/** Generated Node Admin SDK operation action function for the 'CreateTarifa' Mutation. Allow users to execute without passing in DataConnect. */
export function createTarifa(dc: DataConnect, vars: CreateTarifaVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTarifaData>>;
/** Generated Node Admin SDK operation action function for the 'CreateTarifa' Mutation. Allow users to pass in custom DataConnect instances. */
export function createTarifa(vars: CreateTarifaVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateTarifaData>>;

/** Generated Node Admin SDK operation action function for the 'CreateItinerario' Mutation. Allow users to execute without passing in DataConnect. */
export function createItinerario(dc: DataConnect, vars: CreateItinerarioVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateItinerarioData>>;
/** Generated Node Admin SDK operation action function for the 'CreateItinerario' Mutation. Allow users to pass in custom DataConnect instances. */
export function createItinerario(vars: CreateItinerarioVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateItinerarioData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateCircuito' Mutation. Allow users to execute without passing in DataConnect. */
export function updateCircuito(dc: DataConnect, vars: UpdateCircuitoVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateCircuitoData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateCircuito' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateCircuito(vars: UpdateCircuitoVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateCircuitoData>>;

/** Generated Node Admin SDK operation action function for the 'CreateReservacion' Mutation. Allow users to execute without passing in DataConnect. */
export function createReservacion(dc: DataConnect, vars: CreateReservacionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateReservacionData>>;
/** Generated Node Admin SDK operation action function for the 'CreateReservacion' Mutation. Allow users to pass in custom DataConnect instances. */
export function createReservacion(vars: CreateReservacionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateReservacionData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateReservacion' Mutation. Allow users to execute without passing in DataConnect. */
export function updateReservacion(dc: DataConnect, vars: UpdateReservacionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateReservacionData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateReservacion' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateReservacion(vars: UpdateReservacionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateReservacionData>>;

/** Generated Node Admin SDK operation action function for the 'DeleteReservacion' Mutation. Allow users to execute without passing in DataConnect. */
export function deleteReservacion(dc: DataConnect, vars: DeleteReservacionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteReservacionData>>;
/** Generated Node Admin SDK operation action function for the 'DeleteReservacion' Mutation. Allow users to pass in custom DataConnect instances. */
export function deleteReservacion(vars: DeleteReservacionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<DeleteReservacionData>>;

/** Generated Node Admin SDK operation action function for the 'GetDestinos' Query. Allow users to execute without passing in DataConnect. */
export function getDestinos(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetDestinosData>>;
/** Generated Node Admin SDK operation action function for the 'GetDestinos' Query. Allow users to pass in custom DataConnect instances. */
export function getDestinos(options?: OperationOptions): Promise<ExecuteOperationResponse<GetDestinosData>>;

/** Generated Node Admin SDK operation action function for the 'GetDestino' Query. Allow users to execute without passing in DataConnect. */
export function getDestino(dc: DataConnect, vars: GetDestinoVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetDestinoData>>;
/** Generated Node Admin SDK operation action function for the 'GetDestino' Query. Allow users to pass in custom DataConnect instances. */
export function getDestino(vars: GetDestinoVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetDestinoData>>;

/** Generated Node Admin SDK operation action function for the 'GetDestinoBySlug' Query. Allow users to execute without passing in DataConnect. */
export function getDestinoBySlug(dc: DataConnect, vars: GetDestinoBySlugVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetDestinoBySlugData>>;
/** Generated Node Admin SDK operation action function for the 'GetDestinoBySlug' Query. Allow users to pass in custom DataConnect instances. */
export function getDestinoBySlug(vars: GetDestinoBySlugVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetDestinoBySlugData>>;

/** Generated Node Admin SDK operation action function for the 'GetCircuitos' Query. Allow users to execute without passing in DataConnect. */
export function getCircuitos(dc: DataConnect, vars?: GetCircuitosVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCircuitosData>>;
/** Generated Node Admin SDK operation action function for the 'GetCircuitos' Query. Allow users to pass in custom DataConnect instances. */
export function getCircuitos(vars?: GetCircuitosVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCircuitosData>>;

/** Generated Node Admin SDK operation action function for the 'GetCircuitoDetail' Query. Allow users to execute without passing in DataConnect. */
export function getCircuitoDetail(dc: DataConnect, vars: GetCircuitoDetailVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCircuitoDetailData>>;
/** Generated Node Admin SDK operation action function for the 'GetCircuitoDetail' Query. Allow users to pass in custom DataConnect instances. */
export function getCircuitoDetail(vars: GetCircuitoDetailVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCircuitoDetailData>>;

/** Generated Node Admin SDK operation action function for the 'GetAllReservaciones' Query. Allow users to execute without passing in DataConnect. */
export function getAllReservaciones(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetAllReservacionesData>>;
/** Generated Node Admin SDK operation action function for the 'GetAllReservaciones' Query. Allow users to pass in custom DataConnect instances. */
export function getAllReservaciones(options?: OperationOptions): Promise<ExecuteOperationResponse<GetAllReservacionesData>>;

/** Generated Node Admin SDK operation action function for the 'GetUserById' Query. Allow users to execute without passing in DataConnect. */
export function getUserById(dc: DataConnect, vars: GetUserByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserByIdData>>;
/** Generated Node Admin SDK operation action function for the 'GetUserById' Query. Allow users to pass in custom DataConnect instances. */
export function getUserById(vars: GetUserByIdVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserByIdData>>;

/** Generated Node Admin SDK operation action function for the 'ListAllUsers' Query. Allow users to execute without passing in DataConnect. */
export function listAllUsers(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<ListAllUsersData>>;
/** Generated Node Admin SDK operation action function for the 'ListAllUsers' Query. Allow users to pass in custom DataConnect instances. */
export function listAllUsers(options?: OperationOptions): Promise<ExecuteOperationResponse<ListAllUsersData>>;

