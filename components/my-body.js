const pathName = new URL(import.meta.url).pathname;
const name = pathName.split("/").pop().replace(".js", "");

import styles from "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" assert { type: "css" };

export default class myBody extends HTMLElement{
    static async components() {
        return await(await fetch(pathName.replace(".js", ".html"))).text();
    }

    constructor(){
        super();
        this.plantilla
    }

    async addProduct(e){
        this.plantilla = this.querySelector("#products").children;
            let myPlantilla = this.plantilla[this.plantilla.length-1];
            myPlantilla = myPlantilla.cloneNode(true);
            document.querySelector("#products").insertAdjacentElement("beforeend", myPlantilla);
    }

    async sendData(e){
        let inputs = document.querySelectorAll("input");
        //converit un Nodelist en un Array
        let arrayInputs = Array.prototype.slice.call(inputs)
        let facturas = {}, cliente = {}, productos = {}, empresa = {};
        let data = {
            productos:[]
        }

        arrayInputs.forEach((val,id) => {
            if(val.name.includes("Factura")){
                facturas[val.name] = val.value;
            }else if(val.name.includes("Cliente")){
                cliente[val.name] = val.value;
            } else if(val.name.includes("Producto")){
                productos[val.name] = val.value;
                console.log(Object.keys(productos).length);
                if(Object.keys(productos).length == 4){
                    
                    data.productos.push(productos);
                    productos = {}
                }   
            } else {
                empresa[val.name] = val.value;
            }
        });

        data.facturas = facturas;
        data.cliente = cliente;
        data.empresa = empresa;
        

        console.log(JSON.stringify(data));
        let config = {
            method: "POST",
            header: {"Content-Type": "application/json"},
            body:JSON.stringify(data)
        }
        let peticion = await (await fetch("uploads/app.php", config)).text();
        document.querySelector("pre").innerHTML = peticion;
    }

    connectedCallback(){
        document.adoptedStyleSheets.push(styles);
        Promise.resolve(myBody.components()).then(html=>{
            this.innerHTML = html;
            this.addButton = this.querySelector("#add").addEventListener("click", this.addProduct.bind(this));
            this.sendButton = this.querySelector("#send").addEventListener("click", this.sendData.bind(this));
        })
    }
}

customElements.define(name, myBody);