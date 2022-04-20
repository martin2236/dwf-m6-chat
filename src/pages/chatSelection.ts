import {Router} from "@vaadin/router"
import { state } from "../state"
export class Room extends HTMLElement{
    shadow:ShadowRoot
    userName:''
    password:''
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        this.render()
        const form = this.shadow.querySelector(".form")
        const back =this.shadow.querySelector(".back")
        const select = this.shadow.querySelector("#select")
        const RoomIdInput = this.shadow.querySelector("#roomId")
        select.addEventListener("change",(e)=>{
            const event = e.target as any
              RoomIdInput.setAttribute("class",`${event.value}`)

        })
        back.addEventListener("click",(e)=>{
            e.preventDefault();
            Router.go("/")
        })
        form.addEventListener("submit",(e)=>{
              e.preventDefault();
              const event = e.target as any
              const roomId =  event.roomId.value
              const currentState = state.getState()
                
                currentState.roomId = roomId;
                state.setState(currentState)

                if(roomId[0] != undefined){
                  const currentState = state.getState();
                  currentState.roomId = roomId;
                  state.connectToRoomWithId((error)=>{
                    if(error) console.error(error);
                    Router.go('/chat');
                  })
                  }else{
                    state.createNewRoom((error)=>{
                      if(error) console.error(error);
                      Router.go('/chat');
                      });
                }
                
                
        })
        const style = document.createElement("style")
        style.innerHTML = `
        h1{
          font-size:30px;
          width:100%;
          color:#fff;
          text-align:center;
      }
        .titulo{
        display:flex;
        height:80px;
        border-radius:5px;
        background:#1976D2;
        margin-bottom:15px;
        }
        .msn{
          display:block;
          margin:35px auto 0 auto;
          width:90%;
         border: solid 3px #1976D2;
         border-radius:5px;
         height:30px;
         font-size:20px;
        }
        .conectar{
          display:block;
          margin:35px auto 0 auto;
          width:150px;
          height:50px;
          font-size:30px;
          border-radius:15px;
          color:#fff;
          background:#1976D2;
          border:2px solid #fff;
        }
        .back{
            display:block;
            margin:35px auto 0 auto;
            width:150px;
            height:50px;
            font-size:30px;
            border-radius:15px;
            color:#fff;
            background:#00E676;
            border:2px solid #fff;
          }
          .nuevo{
              display:none;
          }
          .existente{
            display:inherit;
        }

        `
        this.shadow.appendChild(style)
    }
    render() {
     this.shadow.innerHTML =`
     <div>
      <header class="titulo">
        <h1>Rooms</h1>
      </header>
      <section>
        <h2>Bienvenido ${state.getState().user.userName}</h2>
      </section>

      <form class="form">
      
      <div>
      <label>Seleccione una opcion</label>
        <select name="opciones" id="select" class="msn">
          <option value="nuevo">Nueva Sala</option>
          <option value="existente">Sala Existente</option>
        </select>
      </div>
      <div id="roomId" class="nuevo">
      <label>Room Id</label>
      <input class="msn" type="text" name="roomId"></input>
      </div>
      
      <button class="back">volver</button>
      <button class="conectar">siguiente</button>
      </form>
      </div>
     `   
    }
  }
  customElements.define("room-el",Room);