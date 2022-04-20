import {Router} from "@vaadin/router"
import { state } from "../state"
export class Greeting extends HTMLElement{
    shadow:ShadowRoot
    userName:''
    password:''
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:"open"})
    }
    connectedCallback(){
        this.render()
        const style = document.createElement("style")
        style.innerHTML = `
        *{
            color:#fff;
            box-sizing: border-box;
            text-align:center;
        }
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
        .main{
            background:#1976D2;
            margin-top:15px;
            height:80vh;
        }
        h2{
            padding-top:15px;
        }
        h3{
            margin-top:50px;
        }
        ol{
            margin-top:50px;
        }
        li{
            margin-top:25px;
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
      
      <main class="main">
        <h2>gracias por registrarte</h2>
        <h3>A continuación podrás elegir entre 2 opciones:</h3>
        <ol>
            <li>Crear una nueva sala</li>
            <li>Ingresar a una ya existente</li>
        </ol>
      </main>
      
      </div>
     `   
     setTimeout(() => {
         Router.go("/room")
     }, 3000);
    }
  }
  customElements.define("greeting-el",Greeting);