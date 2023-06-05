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
        console.log($);
        if ($.nodeName == "BUTTON") {
            let inputs = document.querySelectorAll(`#${$.dataset.row} input`);
            if ($.innerHTML == "-") {
                inputs.forEach(element => {
                    if (element.name == "amount" && element.value == 0) {
                        document.querySelector(`#${$.dataset.row}`).remove();
                    }else if (element.name == "amount"){
                        element.value--;
                    }
                });
            } else{
                inputs.forEach(element => {
                   if(element.name == "amount"){
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