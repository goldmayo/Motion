import { Component } from "./components/component.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponet, PageItemComponent } from "./components/page/page.js";

class App {
  private readonly page: Component & Composable;
  // 직접 생성하지 않고, 인터페이스를 정의하여 외부에서 받는다 >> 의존성 주입
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponet(PageItemComponent);
    this.page.attachTo(appRoot);
    //

    const image = new ImageComponent("Image Title", "https://picsum.photos/600/300");
    this.page.addChild(image);

    const video = new VideoComponent("Video Title", "https://www.youtube.com/embed/7LNl2JlZKHA");
    this.page.addChild(video);

    const note = new NoteComponent("Note Title", "Note Body");
    this.page.addChild(note);

    const todo = new TodoComponent("Todo Title", "Todo Item");
    this.page.addChild(todo);
  }
}

new App(document.querySelector(".document")! as HTMLElement); //type assertion 사용 가능
