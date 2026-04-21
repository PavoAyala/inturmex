const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'inturmex-c511a-service',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider()
  }
};
exports.dataConnectSettings = dataConnectSettings;

const createDestinoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDestino', inputVars);
}
createDestinoRef.operationName = 'CreateDestino';
exports.createDestinoRef = createDestinoRef;

exports.createDestino = function createDestino(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createDestinoRef(dcInstance, inputVars));
}
;

const createCircuitoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCircuito', inputVars);
}
createCircuitoRef.operationName = 'CreateCircuito';
exports.createCircuitoRef = createCircuitoRef;

exports.createCircuito = function createCircuito(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createCircuitoRef(dcInstance, inputVars));
}
;

const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';
exports.upsertUserRef = upsertUserRef;

exports.upsertUser = function upsertUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertUserRef(dcInstance, inputVars));
}
;

const createHotelRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateHotel', inputVars);
}
createHotelRef.operationName = 'CreateHotel';
exports.createHotelRef = createHotelRef;

exports.createHotel = function createHotel(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createHotelRef(dcInstance, inputVars));
}
;

const createTarifaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTarifa', inputVars);
}
createTarifaRef.operationName = 'CreateTarifa';
exports.createTarifaRef = createTarifaRef;

exports.createTarifa = function createTarifa(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTarifaRef(dcInstance, inputVars));
}
;

const createItinerarioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateItinerario', inputVars);
}
createItinerarioRef.operationName = 'CreateItinerario';
exports.createItinerarioRef = createItinerarioRef;

exports.createItinerario = function createItinerario(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createItinerarioRef(dcInstance, inputVars));
}
;

const updateCircuitoRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCircuito', inputVars);
}
updateCircuitoRef.operationName = 'UpdateCircuito';
exports.updateCircuitoRef = updateCircuitoRef;

exports.updateCircuito = function updateCircuito(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateCircuitoRef(dcInstance, inputVars));
}
;

const getDestinosRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDestinos');
}
getDestinosRef.operationName = 'GetDestinos';
exports.getDestinosRef = getDestinosRef;

exports.getDestinos = function getDestinos(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getDestinosRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getDestinoBySlugRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDestinoBySlug', inputVars);
}
getDestinoBySlugRef.operationName = 'GetDestinoBySlug';
exports.getDestinoBySlugRef = getDestinoBySlugRef;

exports.getDestinoBySlug = function getDestinoBySlug(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getDestinoBySlugRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getCircuitosRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCircuitos', inputVars);
}
getCircuitosRef.operationName = 'GetCircuitos';
exports.getCircuitosRef = getCircuitosRef;

exports.getCircuitos = function getCircuitos(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(getCircuitosRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getCircuitoDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCircuitoDetail', inputVars);
}
getCircuitoDetailRef.operationName = 'GetCircuitoDetail';
exports.getCircuitoDetailRef = getCircuitoDetailRef;

exports.getCircuitoDetail = function getCircuitoDetail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCircuitoDetailRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;
