const pathName = new URL(import.meta.url).pathname;
const name = pathName.split("/").pop().replace(".js", "");

import styles from "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" assert { type: "css" };

export default class myHeader extends HTMLElement{
    static async components() {
        return await(await fetch(pathName.replace(".js", ".html"))).text();
    }
    constructor(){
        super();
    }

    connectedCallback(){
        document.adoptedStyleSheets.push(styles);
        Promise.resolve(myHeader.components()).then(html=>{
            this.innerHTML = html;
        })
    }
}

customElements.define(name, myHeader);