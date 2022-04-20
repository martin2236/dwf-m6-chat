"use strict";
exports.__esModule = true;
var express = require("express");
var DBCon_1 = require("./DBCon");
var cors = require("cors");
var nanoid_1 = require("nanoid");
require("dotenv/config");
console.log(process.env.NODE_ENV);
var app = express();
//probar exportar port y asignarlo a la variable API_BASE_URL
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
app.get("/", function (req, res) {
    res.send("funciona");
});
app.get("/env", function (req, res) {
    res.json({ enviorement: req.body });
});
//SINGUP
app.post("/signup", function (req, res) {
    var email = req.body.email;
    var userName = req.body.userName;
    var password = req.body.password;
    //buscamos valores en la bd usando la FS where y le pasamos los 3 params para que busque
    if (userName != '' && email != '' && password != '') {
        DBCon_1.usersCollection.where('userName', '==', userName)
            .get()
            .then(function (data) {
            //comprobamos si el email existe usando .empty y sino existe creamos un usuario
            if (data.empty) {
                DBCon_1.usersCollection.add({
                    email: email,
                    userName: userName,
                    password: password
                }).then(function (newUserRef) {
                    res.json({
                        newUserId: newUserRef.id
                    });
                });
            }
            else {
                //si la funcion where encontro un email ya registrado en la BD no crea el usuario
                //la funcion where siempre debuelve un array por eso siempre hay que indicar la posicion
                // del dato que queremos usar dentro de ese array
                var datos = DBCon_1.usersCollection.doc(data.docs[0].id);
                datos.get()
                    .then(function (user) {
                    var usuario = user.data();
                    res.status(400).json({ message: "el nombre de usuario " + usuario.userName + " ya se encuentra registrado" });
                });
            }
        });
    }
    else {
        console.log('error');
    }
});
//LOGIN
app.post("/login", function (req, res) {
    console.log;
    var userName = req.body.userName;
    var password = req.body.password;
    DBCon_1.usersCollection.where('userName', '==', userName)
        .get()
        .then(function (data) {
        if (data.empty) {
            res.status(400).json({ message: "not Found " });
        }
        else {
            //comprobar que la contraseña ingresada req.body sea igual a la de la db
            DBCon_1.usersCollection.doc(data.docs[0].id)
                .get()
                .then(function (user) {
                var usuario = user.data();
                if (password.toString() === usuario.password) {
                    res.status(200).json({ userId: data.docs[0].id });
                }
                else {
                    res.status(400).json({
                        message: "la contraseña ingresada es incorrecta"
                    });
                }
            });
        }
    });
});
app.post("/rooms", function (req, res) {
    var userId = req.body.userId;
    //verifica que la collection con el id del usuario existe, si existe crea una sala en la rtdb que va atener el nombre del id del usuario
    //y una propiedad para los mensajes
    //IMPORTANTE convertir el valor de userid a string para que no falle
    DBCon_1.usersCollection.doc(userId.toString())
        .get()
        .then(function (doc) {
        if (doc.exists) {
            // al trabajar con la rtdb siempre crear una referencia        
            var roomRef_1 = DBCon_1.RTDB.ref("rooms/" + (0, nanoid_1.nanoid)());
            roomRef_1.set({
                messages: [],
                owner: userId
            }).then(function () {
                // una vez que creamos la sala en la rtdb creamos el doc dentro de firestore que va  a tener 
                // el id amigable 
                var longId = roomRef_1.key;
                var roomId = 1000 + Math.floor(Math.random() * 999);
                //IMPORTANTE convertir el id a string        
                DBCon_1.roomsCollection.doc(roomId.toString()).set({
                    rtdbRoomId: longId
                }).then(function () {
                    res.json({
                        roomId: roomId.toString()
                    });
                });
            });
        }
        else {
            res.status(401).json({ message: "el usuario con el que intenta crear la sala no existe" });
        }
    });
});
// para poder obtener el id dinamico que nos pasan como parametro el metodo get
// a diferencia del metodo post que usa el req.body utiliza el req.query
app.get("/rooms/:roomid", function (req, res) {
    var userid = req.query.userid;
    var roomid = req.params.roomid;
    DBCon_1.usersCollection
        .doc(userid.toString())
        .get()
        .then(function (doc) {
        if (doc.exists) {
            DBCon_1.roomsCollection.doc(roomid)
                .get()
                .then(function (snap) {
                var data = snap.data();
                res.json({ data: data });
            });
        }
        else {
            res.status(401).json({ message: "el usuario con el que intenta crear la sala no existe" });
        }
    });
});
app.post("/messages", function (req, res) {
    console.log(req.body);
    var from = req.body.from;
    var message = req.body.message;
    var roomId = req.body.roomId;
    //hacemos la referencia a la parte de la rtbd a la que quermos acceder
    var chatRoomRef = DBCon_1.RTDB.ref("/rooms/" + roomId + "/messages");
    //hacemos el push del req.boy que trar los datos del state en el front
    chatRoomRef.push({
        from: from,
        message: message
    }, function () {
        res.json("funciona");
    });
});
app.listen(port, function () {
    console.log("http://localhost:".concat(port));
});
