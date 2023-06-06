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
            
       /*  let myProduct = document.createElement("my-product");
        this.products = document.querySelector("#products");
        this.products.insertAdjacentElement("beforeend", myProduct);

        let container = document.querySelectorAll(`#product_${this.count-1}`)
        console.log(container);
        container[0].id = `product_${this.count}`;
        
        let buttons = container[0].querySelectorAll(".btnsum");
        buttons.forEach(element => {
            element.id = `product_${this.count}`
        });


        console.log(myProduct);
        this.count++; */

        
        /* console.log(dataParseada); */
    }

    connectedCallback(){
        document.adoptedStyleSheets.push(styles);
        Promise.resolve(myBody.components()).then(html=>{
            this.innerHTML = html;
            this.addProduct = this.querySelector("#add").addEventListener("click", this.addProduct.bind(this))
        })
    }
}

customElements.define(name, myBody);