import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/mediaInput.js";
import { TextSectionInput } from "./components/dialog/input/textInput.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponet, PageItemComponent } from "./components/page/page.js";

class App {
  private readonly page: Component & Composable;
  // 직접 생성하지 않고, 인터페이스를 정의하여 외부에서 받는다 >> 의존성 주입
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponet(PageItemComponent);
    this.page.attachTo(appRoot);

    const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
    imageBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const mediaSection = new MediaSectionInput();
      dialog.addChild(mediaSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        const image = new ImageComponent(mediaSection.title, mediaSection.url);
        this.page.addChild(image);
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        //섹션 생성후 페이지에 추가
        dialog.removeFrom(dialogRoot);
      });
    });

    const videoBtn = document.querySelector("#new-video")! as HTMLButtonElement;
    videoBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const mediaSection = new MediaSectionInput();
      dialog.addChild(mediaSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        const image = new VideoComponent(mediaSection.title, mediaSection.url);
        this.page.addChild(image);
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        //섹션 생성후 페이지에 추가
        dialog.removeFrom(dialogRoot);
      });
    });

    const noteBtn = document.querySelector("#new-note")! as HTMLButtonElement;
    noteBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const textSection = new TextSectionInput();
      dialog.addChild(textSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        const image = new NoteComponent(textSection.title, textSection.body);
        this.page.addChild(image);
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        //섹션 생성후 페이지에 추가
        dialog.removeFrom(dialogRoot);
      });
    });

    const todoBtn = document.querySelector("#new-todo")! as HTMLButtonElement;
    todoBtn.addEventListener("click", () => {
      const dialog = new InputDialog();
      const textSection = new TextSectionInput();
      dialog.addChild(textSection);
      dialog.attachTo(dialogRoot);

      dialog.setOnCloseListener(() => {
        const image = new TodoComponent(textSection.title, textSection.body);
        this.page.addChild(image);
        dialog.removeFrom(dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        //섹션 생성후 페이지에 추가
        dialog.removeFrom(dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body); //type assertion 사용 가능
