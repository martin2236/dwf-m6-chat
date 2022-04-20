import {Router} from "@vaadin/router"
import { state } from "../state"
export class Signup extends HTMLElement{
    shadow:ShadowRoot

    constructor(){
        super()
        this.shadow = this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        this.render()
        const back =this.shadow.querySelector(".back")
        back.addEventListener("click",(e)=>{
            e.preventDefault();
            Router.go("/")
        })
        const form = this.shadow.querySelector(".form")
        form.addEventListener("submit",(e)=>{
              e.preventDefault();
              const event = e.target as any
              const email = event.email.value
              const userName = event.nombre.value
              const password = event.password.value
              const passConfirm = event.passConfirm.value
            if(password === passConfirm){
                const newUser = {
                  email,
                  userName,
                  password
                }
                this.shadow.getElementById("error").style.display = "none";
                state.signup(newUser)
                Router.go("/greeting")
            }else{
                this.shadow.getElementById("error").style.display = "inherit";
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
        .warning{
            color:red;
            margin-left: 30px;
            display:none;
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

        `
        this.shadow.appendChild(style)
    }
    render() {
     this.shadow.innerHTML =`
     <div>
      <header class="titulo">
        <h1>Registrarse</h1>
      </header>

      <form class="form">
      <div>
        <label>Ingrese su email</label>
        <input class="msn" type="text" name="email" requiered></input>
      </div>
      <div>
        <label>Ingrese su nombre de usuario</label>
        <input class="msn" type="text" name="nombre" required></input>
      </div>
      
      <div>
        <label>Ingrese una contraseña</label>
        <input class="msn" type="text" name="password" required minlength="8"></input>
      </div>
      
      <div>
        <label>Confirme la contraseña</label>
        <input class="msn" type="password" name="passConfirm" required></input>
        <label id="error" class="warning">Las contraseñas ingresadas no coinciden</label>
      </div>
      
      <button class="back">volver</button>
      <button class="conectar">conectar</button>
      </form>
      </div>
     `   
    }
  }
  customElements.define("signup-el",Signup);