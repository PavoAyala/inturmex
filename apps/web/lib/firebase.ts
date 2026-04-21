import { initializeApp, getApps, getApp } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import { connectorConfig } from "../src/dataconnect-generated";

const firebaseConfig = {
  projectId: "inturmex-c511a",
  appId: "1:445623660658:web:a967d917389dcaec7092eb",
  storageBucket: "inturmex-c511a.firebasestorage.app",
  apiKey: "AIzaSyCtwZZ-tzbATvkAEuD4eoKiszUdNWJJI8k",
  authDomain: "inturmex-c511a.firebaseapp.com",
  messagingSenderId: "445623660658",
  measurementId: "G-C8Z231YPXK"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Data Connect
export const dataconnect = getDataConnect(app, connectorConfig);
