import {Router} from "@vaadin/router"
import { state } from "../state"
export class Home extends HTMLElement{
    shadow:ShadowRoot

    constructor(){
        super()
        this.shadow = this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        this.render()
        const signup = this.shadow.querySelector(".signup")
        signup.addEventListener("click",(e)=>{
              e.preventDefault();
                Router.go("/signup")
        })
        const login = this.shadow.querySelector(".login")
        login.addEventListener("click",(e)=>{
              e.preventDefault();
                Router.go("/login")
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
        
        .signup{
          display:block;
          margin:35px auto 0 auto;
          width:150px;
          height:50px;
          font-size:15px;
          border-radius:15px;
          color:#fff;
          background:#1976D2;
          border:2px solid #fff;
        }
        .login{
          display:block;
          margin:35px auto 0 auto;
          width:150px;
          height:50px;
          font-size:15px;
          border-radius:15px;
          color:#fff;
          background:#1976D2;
          border:2px solid #fff;
        }

        `
        this.shadow.appendChild(style)
    }
    render() {
     this.shadow.innerHTML =`
     <div>
      <header class="titulo">
        <h1>My Chat App</h1>
      </header>

      
      <button class="signup">Registrarse</button>
     
      <button class="login">Iniciar sesion</button>
      
      </div>
     `   
    }
  }
  customElements.define("home-el",Home);