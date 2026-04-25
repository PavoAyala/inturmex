import { CreateDestinoData, CreateDestinoVariables, CreateCircuitoData, CreateCircuitoVariables, UpsertUserData, UpsertUserVariables, UpdateUserRoleData, UpdateUserRoleVariables, DeleteUserData, DeleteUserVariables, CreateHotelData, CreateHotelVariables, CreateTarifaData, CreateTarifaVariables, CreateItinerarioData, CreateItinerarioVariables, UpdateCircuitoData, UpdateCircuitoVariables, CreateReservacionData, CreateReservacionVariables, UpdateReservacionData, UpdateReservacionVariables, DeleteReservacionData, DeleteReservacionVariables, GetDestinosData, GetDestinoData, GetDestinoVariables, GetDestinoBySlugData, GetDestinoBySlugVariables, GetCircuitosData, GetCircuitosVariables, GetCircuitoDetailData, GetCircuitoDetailVariables, GetAllReservacionesData, GetUserByIdData, GetUserByIdVariables, ListAllUsersData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateDestino(options?: useDataConnectMutationOptions<CreateDestinoData, FirebaseError, CreateDestinoVariables>): UseDataConnectMutationResult<CreateDestinoData, CreateDestinoVariables>;
export function useCreateDestino(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDestinoData, FirebaseError, CreateDestinoVariables>): UseDataConnectMutationResult<CreateDestinoData, CreateDestinoVariables>;

export function useCreateCircuito(options?: useDataConnectMutationOptions<CreateCircuitoData, FirebaseError, CreateCircuitoVariables>): UseDataConnectMutationResult<CreateCircuitoData, CreateCircuitoVariables>;
export function useCreateCircuito(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCircuitoData, FirebaseError, CreateCircuitoVariables>): UseDataConnectMutationResult<CreateCircuitoData, CreateCircuitoVariables>;

export function useUpsertUser(options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;
export function useUpsertUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;

export function useUpdateUserRole(options?: useDataConnectMutationOptions<UpdateUserRoleData, FirebaseError, UpdateUserRoleVariables>): UseDataConnectMutationResult<UpdateUserRoleData, UpdateUserRoleVariables>;
export function useUpdateUserRole(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserRoleData, FirebaseError, UpdateUserRoleVariables>): UseDataConnectMutationResult<UpdateUserRoleData, UpdateUserRoleVariables>;

export function useDeleteUser(options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, DeleteUserVariables>): UseDataConnectMutationResult<DeleteUserData, DeleteUserVariables>;
export function useDeleteUser(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteUserData, FirebaseError, DeleteUserVariables>): UseDataConnectMutationResult<DeleteUserData, DeleteUserVariables>;

export function useCreateHotel(options?: useDataConnectMutationOptions<CreateHotelData, FirebaseError, CreateHotelVariables>): UseDataConnectMutationResult<CreateHotelData, CreateHotelVariables>;
export function useCreateHotel(dc: DataConnect, options?: useDataConnectMutationOptions<CreateHotelData, FirebaseError, CreateHotelVariables>): UseDataConnectMutationResult<CreateHotelData, CreateHotelVariables>;

export function useCreateTarifa(options?: useDataConnectMutationOptions<CreateTarifaData, FirebaseError, CreateTarifaVariables>): UseDataConnectMutationResult<CreateTarifaData, CreateTarifaVariables>;
export function useCreateTarifa(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTarifaData, FirebaseError, CreateTarifaVariables>): UseDataConnectMutationResult<CreateTarifaData, CreateTarifaVariables>;

export function useCreateItinerario(options?: useDataConnectMutationOptions<CreateItinerarioData, FirebaseError, CreateItinerarioVariables>): UseDataConnectMutationResult<CreateItinerarioData, CreateItinerarioVariables>;
export function useCreateItinerario(dc: DataConnect, options?: useDataConnectMutationOptions<CreateItinerarioData, FirebaseError, CreateItinerarioVariables>): UseDataConnectMutationResult<CreateItinerarioData, CreateItinerarioVariables>;

export function useUpdateCircuito(options?: useDataConnectMutationOptions<UpdateCircuitoData, FirebaseError, UpdateCircuitoVariables>): UseDataConnectMutationResult<UpdateCircuitoData, UpdateCircuitoVariables>;
export function useUpdateCircuito(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCircuitoData, FirebaseError, UpdateCircuitoVariables>): UseDataConnectMutationResult<UpdateCircuitoData, UpdateCircuitoVariables>;

export function useCreateReservacion(options?: useDataConnectMutationOptions<CreateReservacionData, FirebaseError, CreateReservacionVariables>): UseDataConnectMutationResult<CreateReservacionData, CreateReservacionVariables>;
export function useCreateReservacion(dc: DataConnect, options?: useDataConnectMutationOptions<CreateReservacionData, FirebaseError, CreateReservacionVariables>): UseDataConnectMutationResult<CreateReservacionData, CreateReservacionVariables>;

export function useUpdateReservacion(options?: useDataConnectMutationOptions<UpdateReservacionData, FirebaseError, UpdateReservacionVariables>): UseDataConnectMutationResult<UpdateReservacionData, UpdateReservacionVariables>;
export function useUpdateReservacion(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateReservacionData, FirebaseError, UpdateReservacionVariables>): UseDataConnectMutationResult<UpdateReservacionData, UpdateReservacionVariables>;

export function useDeleteReservacion(options?: useDataConnectMutationOptions<DeleteReservacionData, FirebaseError, DeleteReservacionVariables>): UseDataConnectMutationResult<DeleteReservacionData, DeleteReservacionVariables>;
export function useDeleteReservacion(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteReservacionData, FirebaseError, DeleteReservacionVariables>): UseDataConnectMutationResult<DeleteReservacionData, DeleteReservacionVariables>;

export function useGetDestinos(options?: useDataConnectQueryOptions<GetDestinosData>): UseDataConnectQueryResult<GetDestinosData, undefined>;
export function useGetDestinos(dc: DataConnect, options?: useDataConnectQueryOptions<GetDestinosData>): UseDataConnectQueryResult<GetDestinosData, undefined>;

export function useGetDestino(vars: GetDestinoVariables, options?: useDataConnectQueryOptions<GetDestinoData>): UseDataConnectQueryResult<GetDestinoData, GetDestinoVariables>;
export function useGetDestino(dc: DataConnect, vars: GetDestinoVariables, options?: useDataConnectQueryOptions<GetDestinoData>): UseDataConnectQueryResult<GetDestinoData, GetDestinoVariables>;

export function useGetDestinoBySlug(vars: GetDestinoBySlugVariables, options?: useDataConnectQueryOptions<GetDestinoBySlugData>): UseDataConnectQueryResult<GetDestinoBySlugData, GetDestinoBySlugVariables>;
export function useGetDestinoBySlug(dc: DataConnect, vars: GetDestinoBySlugVariables, options?: useDataConnectQueryOptions<GetDestinoBySlugData>): UseDataConnectQueryResult<GetDestinoBySlugData, GetDestinoBySlugVariables>;

export function useGetCircuitos(vars?: GetCircuitosVariables, options?: useDataConnectQueryOptions<GetCircuitosData>): UseDataConnectQueryResult<GetCircuitosData, GetCircuitosVariables>;
export function useGetCircuitos(dc: DataConnect, vars?: GetCircuitosVariables, options?: useDataConnectQueryOptions<GetCircuitosData>): UseDataConnectQueryResult<GetCircuitosData, GetCircuitosVariables>;

export function useGetCircuitoDetail(vars: GetCircuitoDetailVariables, options?: useDataConnectQueryOptions<GetCircuitoDetailData>): UseDataConnectQueryResult<GetCircuitoDetailData, GetCircuitoDetailVariables>;
export function useGetCircuitoDetail(dc: DataConnect, vars: GetCircuitoDetailVariables, options?: useDataConnectQueryOptions<GetCircuitoDetailData>): UseDataConnectQueryResult<GetCircuitoDetailData, GetCircuitoDetailVariables>;

export function useGetAllReservaciones(options?: useDataConnectQueryOptions<GetAllReservacionesData>): UseDataConnectQueryResult<GetAllReservacionesData, undefined>;
export function useGetAllReservaciones(dc: DataConnect, options?: useDataConnectQueryOptions<GetAllReservacionesData>): UseDataConnectQueryResult<GetAllReservacionesData, undefined>;

export function useGetUserById(vars: GetUserByIdVariables, options?: useDataConnectQueryOptions<GetUserByIdData>): UseDataConnectQueryResult<GetUserByIdData, GetUserByIdVariables>;
export function useGetUserById(dc: DataConnect, vars: GetUserByIdVariables, options?: useDataConnectQueryOptions<GetUserByIdData>): UseDataConnectQueryResult<GetUserByIdData, GetUserByIdVariables>;

export function useListAllUsers(options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
export function useListAllUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
