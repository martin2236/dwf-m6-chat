"use strict";
// GENERAR EL ARCHIVO KEY DESDE FIREBASE 
exports.__esModule = true;
exports.RTDB = exports.firestore = exports.usersCollection = exports.roomsCollection = void 0;
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");
admin.initializeApp({
    //VALIDAR LOS serviceAccount CON  as any
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dwf-m6-crud-51731-default-rtdb.firebaseio.com"
});
var firestore = admin.firestore();
exports.firestore = firestore;
var RTDB = admin.database();
exports.RTDB = RTDB;
var usersCollection = firestore.collection('/Users');
exports.usersCollection = usersCollection;
var roomsCollection = firestore.collection('/rooms');
exports.roomsCollection = roomsCollection;
