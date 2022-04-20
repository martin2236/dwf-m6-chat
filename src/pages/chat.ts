import { Message } from "../state"
import { state } from "../state"
const send = require("url:../img/send.png");
export class Chat extends HTMLElement{
shadow:ShadowRoot
usuario:string
constructor(){
    super()
    this.shadow = this.attachShadow({mode:"open"})
}
      connectedCallback(){
        this.render();
        // 1 nos subscribimos al estado 
          state.subscribe(()=>{
        // 2 creamos una copia del state      
             const currentState = state.getState();
        // 3 llenamos los mensajes del componente con los de la BD
             this.messages = currentState
        // 4 una vez el componente tiene los mensajes volvemos a renderizarlo
            this.render() 
          })
         
      }

      // creamos una funcion que escuche los submits la llamamos dentro del render para que cada 
      //vez que se ejecute se renderize el chat con los nuevos datos 
      addListeners(){
        const form = this.shadow.querySelector(".chat2")
        form.addEventListener("submit",(e)=>{
              e.preventDefault();
              const event = e.target as any
              const currentState = state.getState();
              const mensaje = {
                roomId:currentState.longRoomId,
                from:currentState.user.userName,
                message: event.mensaje.value
              }
              state.pushMessage(mensaje)
        })
       
      }
      
      messages:Message[] = []
      render() {
        const currentState = state.getState();
        this.messages = currentState.messages.reverse();
       this.shadow.innerHTML =`
        <div class="container">
        <header class="titulo">
          <h1> Chat Page</h1>
        </header>
        <h2>${currentState.roomId}</h2>
        <div class="messages">
        ${this.messages.map((m)=>{
          return `<div class="${currentState.user.userName == m.from ? 'mio' : 'otro'}">
          <div class="${currentState.user.userName == m.from ? 'miLabel' : 'otroLabel'}">${m.from}</div>
          <div class="${currentState.user.userName == m.from ? 'miMsg' : 'otroMsg'}">
          <p class="mensaje"> ${m.message}</p>
          </div>
          </div>`
        }).join(" ")}
        </div>
        <form class="chat2">
        <input class="msn" type="text" name="mensaje"></input>
        <button class="send"><img class= "opcion"  src="${send} " alt="send"></button>
        </form>
        </div>
       `   
       const style = document.createElement("style")
       style.innerHTML = `
         h1{
             font-size:30px;
             width:100%;
             color:#fff;
             text-align:center;
         }
         .container{
           max-width:375px;
         }
         .titulo{
          display:flex;
          height:80px;
          border-radius:5px;
          background:#1976D2;
          margin-bottom:15px;
         }
         .mio{
          margin: 5px 15px 5px 0;
          display:flex;
          flex-direction:column;
          align-items:end;
         }
         .otro{
          margin: 5px 0 5px 15px;
          display:flex;
          flex-direction:column;
          align-items:start;
         }
         .miMsg{
          color:#fff;
          background:#039BE5;
          display:flex;
          justify-content:end;
          padding-right:20px;
          padding-left:10px;
          border-radius:15px;
          min-width:50px;
          max-width:150px;
          text-align:end;
          border-top-right-radius: 0;
         }
         .miLabel{
          display:block;
          text-align:end;
         }
         .otroMsg{
          background:#ECEFF1;
          display:flex;
          justify-content:start;
          padding-left:20px;
          padding-right:10px;
          border-radius:15px;
          max-width:150px;
          border-top-left-radius: 0;
         }
         
         .send{
          border: solid 3px #1976D2;
           background:#1976D2;
           height:35px;
           display:flex;
           justify-content:center;
           align-items-center;
           border-radius:5px;
         }
         .otroLabel{
           display:block;
           text-align:start;
         }
         .mensaje{
           font-size:1.2rem;
         }
         .messages{
           height:500px;
           widht:300px;
           border: solid 3px #1976D2;
           border-radius:5px;
           overflow-y: scroll;
           display:flex;
           flex-direction:column-reverse;
         }
         .msn{
          border: solid 3px #1976D2;
          border-radius:5px;
          height:30px;
          width:70%;
         }
         .chat2{
           margin-top:15px;
           display:flex;
           flex-direction:row;
           align-items:center;
           justify-content:space-around;
         }
     `
     this.shadow.appendChild(style)
       this.addListeners();
       
      }
    }
    customElements.define("chat-el",Chat);
