const pathName = new URL(import.meta.url).pathname;
const name = pathName.split("/").pop().replace(".js", "");

import styles from "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" assert { type: "css" };

export default class myBody extends HTMLElement{
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
            let inputs = this.querySelectorAll(`#${$.dataset.row} input`);
            if ($.innerHTML == "-") {
                inputs.forEach(element => {
                    if (element.name == "amount" && element.value == 0) {
                        this.querySelector(`#${$.dataset.row}`).remove();
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

    selectionButtons(e){
        
        let $ = e.target;
        if ($.nodeName == "BUTTON") {
            if ($.innerHTML == "Add") {
                this.products.append(`
                <div class="row mb-3" id="product_0">
                    <div class="col-6 col-lg-2">
                        <label class="form-label fs-6 m-0" for="codProducto">Cod Producto</label>
                        <input class="form-control" type="number" required name="codProducto">
                    </div>
                    <div class="col-6 col-lg-2">
                        <label class="form-label fs-6 m-0" for="nameProdcuto">Nombre Producto</label>
                        <input class="form-control" type="text" required name="nameProdcuto">
                    </div>
                    <div class="col-6 col-lg-2">
                        <label class="form-label fs-6 m-0" for="amount">Amount</label>
                        <input class="form-control" type="number" required readonly name="amount" placeholder="0">
                    </div>
                    <div class="col-6 col-lg-2">
                        <label class="form-label fs-6 m-0" for="valorUnidad">Valor Unit</label>
                        <input class="form-control" type="number" required name="valorUnidad" placeholder="0">
                    </div>
                    <div class="col-6 col-lg-2 mt-2 mt-lg-0">
                        <button class="w-100 h-100 btn btnBlue text-white fs-4" data-row="product_0">+</button>
                    </div>
                    <div class="col-6 col-lg-2 mt-2 mt-lg-0">
                        <button class="w-100 h-100 btn btn-danger fs-4" data-row="product_0">-</button>
                    </div>
                </div>
                `)
            }
        }
    }
    connectedCallback(){
        document.adoptedStyleSheets.push(styles);
        Promise.resolve(myBody.components()).then(html=>{
            this.innerHTML = html;
            this.products = this.querySelector("#products");
            this.products.addEventListener("click", this.selection);
            this.buttons = this.querySelector("#buttons");
            this.buttons.addEventListener("click", this.selectionButtons);
        })
    }
}

customElements.define(name, myBody);