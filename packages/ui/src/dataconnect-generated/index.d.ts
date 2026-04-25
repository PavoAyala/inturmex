import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

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

interface CreateDestinoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDestinoVariables): MutationRef<CreateDestinoData, CreateDestinoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateDestinoVariables): MutationRef<CreateDestinoData, CreateDestinoVariables>;
  operationName: string;
}
export const createDestinoRef: CreateDestinoRef;

export function createDestino(vars: CreateDestinoVariables): MutationPromise<CreateDestinoData, CreateDestinoVariables>;
export function createDestino(dc: DataConnect, vars: CreateDestinoVariables): MutationPromise<CreateDestinoData, CreateDestinoVariables>;

interface CreateCircuitoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCircuitoVariables): MutationRef<CreateCircuitoData, CreateCircuitoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCircuitoVariables): MutationRef<CreateCircuitoData, CreateCircuitoVariables>;
  operationName: string;
}
export const createCircuitoRef: CreateCircuitoRef;

export function createCircuito(vars: CreateCircuitoVariables): MutationPromise<CreateCircuitoData, CreateCircuitoVariables>;
export function createCircuito(dc: DataConnect, vars: CreateCircuitoVariables): MutationPromise<CreateCircuitoData, CreateCircuitoVariables>;

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpdateUserRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  operationName: string;
}
export const updateUserRoleRef: UpdateUserRoleRef;

export function updateUserRole(vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;
export function updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteUserVariables): MutationRef<DeleteUserData, DeleteUserVariables>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;
export function deleteUser(dc: DataConnect, vars: DeleteUserVariables): MutationPromise<DeleteUserData, DeleteUserVariables>;

interface CreateHotelRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateHotelVariables): MutationRef<CreateHotelData, CreateHotelVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateHotelVariables): MutationRef<CreateHotelData, CreateHotelVariables>;
  operationName: string;
}
export const createHotelRef: CreateHotelRef;

export function createHotel(vars: CreateHotelVariables): MutationPromise<CreateHotelData, CreateHotelVariables>;
export function createHotel(dc: DataConnect, vars: CreateHotelVariables): MutationPromise<CreateHotelData, CreateHotelVariables>;

interface CreateTarifaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTarifaVariables): MutationRef<CreateTarifaData, CreateTarifaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTarifaVariables): MutationRef<CreateTarifaData, CreateTarifaVariables>;
  operationName: string;
}
export const createTarifaRef: CreateTarifaRef;

export function createTarifa(vars: CreateTarifaVariables): MutationPromise<CreateTarifaData, CreateTarifaVariables>;
export function createTarifa(dc: DataConnect, vars: CreateTarifaVariables): MutationPromise<CreateTarifaData, CreateTarifaVariables>;

interface CreateItinerarioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateItinerarioVariables): MutationRef<CreateItinerarioData, CreateItinerarioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateItinerarioVariables): MutationRef<CreateItinerarioData, CreateItinerarioVariables>;
  operationName: string;
}
export const createItinerarioRef: CreateItinerarioRef;

export function createItinerario(vars: CreateItinerarioVariables): MutationPromise<CreateItinerarioData, CreateItinerarioVariables>;
export function createItinerario(dc: DataConnect, vars: CreateItinerarioVariables): MutationPromise<CreateItinerarioData, CreateItinerarioVariables>;

interface UpdateCircuitoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCircuitoVariables): MutationRef<UpdateCircuitoData, UpdateCircuitoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCircuitoVariables): MutationRef<UpdateCircuitoData, UpdateCircuitoVariables>;
  operationName: string;
}
export const updateCircuitoRef: UpdateCircuitoRef;

export function updateCircuito(vars: UpdateCircuitoVariables): MutationPromise<UpdateCircuitoData, UpdateCircuitoVariables>;
export function updateCircuito(dc: DataConnect, vars: UpdateCircuitoVariables): MutationPromise<UpdateCircuitoData, UpdateCircuitoVariables>;

interface CreateReservacionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReservacionVariables): MutationRef<CreateReservacionData, CreateReservacionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateReservacionVariables): MutationRef<CreateReservacionData, CreateReservacionVariables>;
  operationName: string;
}
export const createReservacionRef: CreateReservacionRef;

export function createReservacion(vars: CreateReservacionVariables): MutationPromise<CreateReservacionData, CreateReservacionVariables>;
export function createReservacion(dc: DataConnect, vars: CreateReservacionVariables): MutationPromise<CreateReservacionData, CreateReservacionVariables>;

interface UpdateReservacionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateReservacionVariables): MutationRef<UpdateReservacionData, UpdateReservacionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateReservacionVariables): MutationRef<UpdateReservacionData, UpdateReservacionVariables>;
  operationName: string;
}
export const updateReservacionRef: UpdateReservacionRef;

export function updateReservacion(vars: UpdateReservacionVariables): MutationPromise<UpdateReservacionData, UpdateReservacionVariables>;
export function updateReservacion(dc: DataConnect, vars: UpdateReservacionVariables): MutationPromise<UpdateReservacionData, UpdateReservacionVariables>;

interface DeleteReservacionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteReservacionVariables): MutationRef<DeleteReservacionData, DeleteReservacionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteReservacionVariables): MutationRef<DeleteReservacionData, DeleteReservacionVariables>;
  operationName: string;
}
export const deleteReservacionRef: DeleteReservacionRef;

export function deleteReservacion(vars: DeleteReservacionVariables): MutationPromise<DeleteReservacionData, DeleteReservacionVariables>;
export function deleteReservacion(dc: DataConnect, vars: DeleteReservacionVariables): MutationPromise<DeleteReservacionData, DeleteReservacionVariables>;

interface GetDestinosRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetDestinosData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetDestinosData, undefined>;
  operationName: string;
}
export const getDestinosRef: GetDestinosRef;

export function getDestinos(options?: ExecuteQueryOptions): QueryPromise<GetDestinosData, undefined>;
export function getDestinos(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetDestinosData, undefined>;

interface GetDestinoRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDestinoVariables): QueryRef<GetDestinoData, GetDestinoVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDestinoVariables): QueryRef<GetDestinoData, GetDestinoVariables>;
  operationName: string;
}
export const getDestinoRef: GetDestinoRef;

export function getDestino(vars: GetDestinoVariables, options?: ExecuteQueryOptions): QueryPromise<GetDestinoData, GetDestinoVariables>;
export function getDestino(dc: DataConnect, vars: GetDestinoVariables, options?: ExecuteQueryOptions): QueryPromise<GetDestinoData, GetDestinoVariables>;

interface GetDestinoBySlugRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDestinoBySlugVariables): QueryRef<GetDestinoBySlugData, GetDestinoBySlugVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDestinoBySlugVariables): QueryRef<GetDestinoBySlugData, GetDestinoBySlugVariables>;
  operationName: string;
}
export const getDestinoBySlugRef: GetDestinoBySlugRef;

export function getDestinoBySlug(vars: GetDestinoBySlugVariables, options?: ExecuteQueryOptions): QueryPromise<GetDestinoBySlugData, GetDestinoBySlugVariables>;
export function getDestinoBySlug(dc: DataConnect, vars: GetDestinoBySlugVariables, options?: ExecuteQueryOptions): QueryPromise<GetDestinoBySlugData, GetDestinoBySlugVariables>;

interface GetCircuitosRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetCircuitosVariables): QueryRef<GetCircuitosData, GetCircuitosVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: GetCircuitosVariables): QueryRef<GetCircuitosData, GetCircuitosVariables>;
  operationName: string;
}
export const getCircuitosRef: GetCircuitosRef;

export function getCircuitos(vars?: GetCircuitosVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircuitosData, GetCircuitosVariables>;
export function getCircuitos(dc: DataConnect, vars?: GetCircuitosVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircuitosData, GetCircuitosVariables>;

interface GetCircuitoDetailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircuitoDetailVariables): QueryRef<GetCircuitoDetailData, GetCircuitoDetailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCircuitoDetailVariables): QueryRef<GetCircuitoDetailData, GetCircuitoDetailVariables>;
  operationName: string;
}
export const getCircuitoDetailRef: GetCircuitoDetailRef;

export function getCircuitoDetail(vars: GetCircuitoDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircuitoDetailData, GetCircuitoDetailVariables>;
export function getCircuitoDetail(dc: DataConnect, vars: GetCircuitoDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircuitoDetailData, GetCircuitoDetailVariables>;

interface GetAllReservacionesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllReservacionesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAllReservacionesData, undefined>;
  operationName: string;
}
export const getAllReservacionesRef: GetAllReservacionesRef;

export function getAllReservaciones(options?: ExecuteQueryOptions): QueryPromise<GetAllReservacionesData, undefined>;
export function getAllReservaciones(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetAllReservacionesData, undefined>;

interface GetUserByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
  operationName: string;
}
export const getUserByIdRef: GetUserByIdRef;

export function getUserById(vars: GetUserByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdData, GetUserByIdVariables>;
export function getUserById(dc: DataConnect, vars: GetUserByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface ListAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
  operationName: string;
}
export const listAllUsersRef: ListAllUsersRef;

export function listAllUsers(options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;
export function listAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

