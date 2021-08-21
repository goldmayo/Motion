import { PageComponet } from "./components/page.js";

class App {
  private readonly page: PageComponet;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponet();
    this.page.attachTo(appRoot);
  }
}

new App(document.querySelector(".document")! as HTMLElement); //type assertion 사용 가능
