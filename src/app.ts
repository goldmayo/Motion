import { ImageComponent } from "./components/page/item/iamge.js";
import { PageComponet } from "./components/page/page.js";

class App {
  private readonly page: PageComponet;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponet();
    this.page.attachTo(appRoot);
    //
    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/600/300"
    );
    image.attachTo(appRoot, "beforeend");
  }
}

new App(document.querySelector(".document")! as HTMLElement); //type assertion 사용 가능
