const pathName = new URL(import.meta.url).pathname;
const name = pathName.split("/").pop().replace(".js", "");

import styles from "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" assert { type: "css" };

export default class myProduct extends HTMLElement{
    static async components() {
        return await(await fetch(pathName.replace(".js", ".html"))).text();
    }
    constructor(){
        super();
    }

    selection(e){
        let $ = e.target;
        if ($.nodeName == "BUTTON") {
            let caja = e.target.parentNode.parentNode;
            let inputs = caja.querySelectorAll("input");
            if ($.innerHTML == "-") {
                inputs.forEach(element => {
                    if (element.name == "amountProducto" && element.value == 0) {
                        console.log(caja.parentNode.parentNode.children.length );
                        if(caja.parentNode.parentNode.children.length > 0 && caja.parentNode.parentNode.children.length == 1){
                            caja.remove();
                        }else{
                            caja.parentNode.remove()
                        }
                        
                    }else if (element.name == "amountProducto"){
                        element.value--;
                    }
                });
            } else{
                inputs.forEach(element => {
                   if(element.name == "amountProducto"){
                        element.value++;
                    }
                });
            }
        }
    }

    connectedCallback(){
        document.adoptedStyleSheets.push(styles);
        Promise.resolve(myProduct.components()).then(html=>{
            this.innerHTML = html;
            this.products = document.querySelector("#products");
            this.products.addEventListener("click", this.selection);
            
        })
    }
}

customElements.define(name, myProduct);