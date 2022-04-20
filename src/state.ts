const API_BASE_URL = "http://localhost:3000"
import { RTDB } from './rtdb';
import { ref, set, onValue } from "firebase/database";
import map from "lodash/map"
type Message ={
    from:string,
    message:string
}
const state ={
    data:{
        conected:Boolean,
        user:{
          userName:'',
          userId:''
        },
        message:'',
        roomId:'',
        longRoomId:'',
        messages:[]
    },
    listeners:[],
    getState(){
        return this.data;
    },
    setState(newState){
        this.data = newState;
          for (const cb of this.listeners){
              cb();
          }
     },
    init(){
        // comprueba que esista un usuario en el localstorage
    },
    signup(newUser){
      const currentState = this.getState()
      if(newUser.userName != ''){
          fetch( API_BASE_URL + "/signup", {
              method:"post",
              mode: 'cors', // no-cors, *cors, same-origin
              headers:{
              "content-type":"application/json",
              },
              body: JSON.stringify({
                email:newUser.email,
                userName:newUser.userName,
                password: newUser.password
              })
            }).then(res =>{
              return res.json()
            }).then(data=>{
              currentState.user.userName = newUser.userName;
              currentState.user.userId = data.newUserId;
              this.setState(currentState);
            })
      }
    },
    login(callBack){
        const currentState = this.getState()
           if(currentState.user.userName != ''){
            fetch( API_BASE_URL + "/login", {
              method:"post",
              mode: 'cors', // no-cors, *cors, same-origin
              headers:{
              "content-type":"application/json",
              },
              body: JSON.stringify({
                userName:currentState.user.userName,
                password: currentState.user.password
              })
            }).then(res =>{
              currentState.conected = res.ok
              return res.json()
            }).then(data =>{
                currentState.user.userId = data.userId;
                this.setState(currentState) 
                callBack();
            })
           }else{
              callBack(true)
           }
    },
    connectToRoom(){
      const currentState = this.getState()
      if(currentState.roomId != ''){
          fetch( API_BASE_URL + "/rooms/" + currentState.roomId + "?userid=" + currentState.user.userId)
          .then(data =>{
              return data.json();
            }).then(res=>{
              currentState.longRoomId = res.data.rtdbRoomId;
              state.setState(currentState);
              this.iniciarRTDB(res.data.rtdbRoomId) ;
            })
      }
  },
  connectToRoomWithId(callback){
    const currentState = this.getState()
    if(currentState.roomId != ''){
        fetch( API_BASE_URL + "/rooms/" + currentState.roomId + "?userid=" + currentState.user.userId)
        .then(data =>{
            return data.json();
          }).then(res=>{
            currentState.longRoomId = res.data.rtdbRoomId;
            state.setState(currentState);
            this.iniciarRTDB(res.data.rtdbRoomId) ;
            callback();
          })
    }
},
    createNewRoom(callback){
        const currentState = this.getState()
        if(currentState.roomId[0] == undefined){
            fetch( API_BASE_URL + "/rooms", {
                method:"post",
                mode: 'cors', // no-cors, *cors, same-origin
                headers:{
                "content-type":"application/json",
                },
                body: JSON.stringify({
                  userId:currentState.user.userId
                })
              }).then(data =>{
                return data.json();
              }).then(res=>{
                currentState.roomId = res.roomId
                state.setState(currentState);
                this.connectToRoom();
                callback();
              })
        }else{
          console.log('error');
          callback(true);
        }
    },
    
    iniciarRTDB(roomId){
         const chatRoomsRef = ref(RTDB, '/rooms/' + roomId);
             const currentState = this.getState()   
             onValue(chatRoomsRef, (snapshot) => {
             const messageFromServer = snapshot.val();
             const messagesList = map(messageFromServer.messages)
             currentState.messages = messagesList
             this.setState(currentState);
             });
    },
   
    pushMessage(mensaje){
        if(mensaje.from != ""){
            fetch( API_BASE_URL + "/messages", {
                method:"post",
                headers:{
                "content-type":"application/json",
                },
                body: JSON.stringify({
                  roomId:mensaje.roomId,
                  from:mensaje.from,
                  message: mensaje.message
                })
              })
        }else{
            console.log(' no hay nombre')
        }
      },

      subscribe(callback:(any) => any ){
        this.listeners.push(callback)
       }
}
export {state, Message}