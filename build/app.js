import { PageComponet } from "./components/page.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponet();
        this.page.attachTo(appRoot);
    }
}
new App(document.querySelector(".document"));
