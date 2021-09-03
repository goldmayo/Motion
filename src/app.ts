import { Component } from "./components/component.js";
import { InputDialog, MediaData, TextData } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/mediaInput.js";
import { TextSectionInput } from "./components/dialog/input/textInput.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponet, PageItemComponent } from "./components/page/page.js";

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;
  // 직접 생성하지 않고, 인터페이스를 정의하여 외부에서 받는다 >> 의존성 주입
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponet(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );
    this.bindElementToDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );
  }

  /**
   * 중복되고있는 코드의 리팩토링
   * 중복되는 것을 함수로 차이점은 인자로
   * bindElementToDialog<T extends (MediaSectionInput | TextSectionInput>은
   * 두가지 형태의 dialog만 인자로 받을 수 있어 확장성이 떨어진다.
   * 특정한 클래스를 인자로 받기보단 인터페이스를 정의하여 컴포지션하는 것이 확장성이 좋다
   * bindElementToDialog<T extends (MediaData | TextData) & Component>
   */
  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    element.addEventListener("click", () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        //섹션 생성후 페이지에 추가
        dialog.removeFrom(this.dialogRoot);
      });
      dialog.setOnSubmitListener(() => {
        const section = makeSection(input);
        this.page.addChild(section);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body); //type assertion 사용 가능
