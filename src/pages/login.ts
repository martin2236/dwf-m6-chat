import {Router} from "@vaadin/router"
import { state } from "../state"
export class Login extends HTMLElement{
    shadow:ShadowRoot
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        this.render()
        const form = this.shadow.querySelector(".form")
        const back =this.shadow.querySelector(".back")
        const RoomIdInput = this.shadow.querySelector("#roomId")
        
        back.addEventListener("click",(e)=>{
            e.preventDefault();
            Router.go("/")
        })
        form.addEventListener("submit",(e)=>{
              e.preventDefault();
              const event = e.target as any
               const userName = event.nombre.value;
               const password = event.password.value;
               
              const currentState = state.getState();

              currentState.user.userName = userName;
              currentState.user.password = password;
              state.setState(currentState);
              
              state.login((error)=>{
                if(error) console.error(error);
                if(currentState.conected === true){
                  Router.go('/room')
                }else{
                  alert('el usuario o la contraseña ingresada son incorrectas')
                }
              })
              //el setTimeout le da tiempo al para que verifique la info y cambie la propiedad del state "conected"
              
                    //Router.go("/welcome")
                 
              
                
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
        <h1>Iniciar sesion</h1>
      </header>

      <form class="form">
      <div>
        <label>Ingrese su usuario</label>
        <input class="msn" type="text" name="nombre" required></input>
      </div>
      <div>
        <label>Ingrese su contraseña</label>
        <input class="msn" type="password" name="password" required></input>
      </div>
      <div>
     
      
      
      <button class="back">volver</button>
      <button class="conectar">siguiente</button>
      </form>
      </div>
     `   
    }
  }
  customElements.define("login-el",Login);