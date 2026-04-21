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

export interface Destino_Key {
  id: string;
  __typename?: 'Destino_Key';
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

export interface GetDestinosData {
  destinos: ({
    id: string;
    nombre: string;
    slug: string;
    imagenUrl?: string | null;
    descripcion?: string | null;
  } & Destino_Key)[];
}

export interface Hotel_Key {
  id: UUIDString;
  __typename?: 'Hotel_Key';
}

export interface Itinerario_Key {
  id: UUIDString;
  __typename?: 'Itinerario_Key';
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

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  id: string;
  displayName: string;
  email?: string | null;
  photoUrl?: string | null;
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

