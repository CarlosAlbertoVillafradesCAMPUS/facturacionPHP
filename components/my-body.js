const pathName = new URL(import.meta.url).pathname;
const name = pathName.split("/").pop().replace(".js", "");

import styles from "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" assert { type: "css" };

export default class myBody extends HTMLElement{
    static async components() {
        return await(await fetch(pathName.replace(".js", ".html"))).text();
    }

    constructor(){
        super();
        this.count=1;
    }

    async addProduct(e){
        //hago fecth de my-product.html
        let dataProduct = await(await fetch("/components/my-product.html")).text();
        //lo parseo para transformar el texto en html
        let parserDataProduct = new DOMParser().parseFromString(dataProduct, "text/html");
        this.products = document.querySelector("#products");
        let myProduct = document.createElement("my-product");
        myProduct.insertAdjacentElement("beforeend", parserDataProduct.body.children[0]);
        myProduct.querySelector(`#product_0`).id = `product_${this.count}`;
        let buttons = myProduct.querySelectorAll("button");
        buttons.forEach(element => {
            element.id = `product_${this.count}`
        });
        console.log(myProduct);
        this.products.insertAdjacentElement("beforeend", myProduct)
        this.count++;

        
        /* console.log(dataParseada); */
    }

    connectedCallback(){
        document.adoptedStyleSheets.push(styles);
        Promise.resolve(myBody.components()).then(html=>{
            this.innerHTML = html;
            this.buttonAdd = this.querySelector("#buttonAdd");
            this.buttonAdd.addEventListener("click", this.addProduct.bind(this));
        })
    }
}

customElements.define(name, myBody);