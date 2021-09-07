"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dialog_js_1 = require("./components/dialog/dialog.js");
const mediaInput_js_1 = require("./components/dialog/input/mediaInput.js");
const textInput_js_1 = require("./components/dialog/input/textInput.js");
const image_js_1 = require("./components/page/item/image.js");
const note_js_1 = require("./components/page/item/note.js");
const todo_js_1 = require("./components/page/item/todo.js");
const video_js_1 = require("./components/page/item/video.js");
const page_js_1 = require("./components/page/page.js");
class App {
    // 직접 생성하지 않고, 인터페이스를 정의하여 외부에서 받는다 >> 의존성 주입
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new page_js_1.PageComponet(page_js_1.PageItemComponent);
        this.page.attachTo(appRoot);
        this.bindElementToDialog("#new-image", mediaInput_js_1.MediaSectionInput, (input) => new image_js_1.ImageComponent(input.title, input.url));
        this.bindElementToDialog("#new-video", mediaInput_js_1.MediaSectionInput, (input) => new video_js_1.VideoComponent(input.title, input.url));
        this.bindElementToDialog("#new-note", textInput_js_1.TextSectionInput, (input) => new note_js_1.NoteComponent(input.title, input.body));
        this.bindElementToDialog("#new-todo", textInput_js_1.TextSectionInput, (input) => new todo_js_1.TodoComponent(input.title, input.body));
        this.page.addChild(new image_js_1.ImageComponent("Image Title", "https://picsum.photos/800/400"));
        this.page.addChild(new video_js_1.VideoComponent("Video Title", "https://youtu.be/D7cwvvA7cP0"));
        this.page.addChild(new note_js_1.NoteComponent("Note Title", "Don't forget to code your dream"));
        this.page.addChild(new todo_js_1.TodoComponent("Todo Title", "TypeScript Course!"));
        this.page.addChild(new image_js_1.ImageComponent("Image Title", "https://picsum.photos/800/400"));
        this.page.addChild(new video_js_1.VideoComponent("Video Title", "https://youtu.be/D7cwvvA7cP0"));
        this.page.addChild(new note_js_1.NoteComponent("Note Title", "Don't forget to code your dream"));
        this.page.addChild(new todo_js_1.TodoComponent("Todo Title", "TypeScript Course!"));
    }
    /**
     * 중복되고있는 코드의 리팩토링
     * 중복되는 것을 함수로 차이점은 인자로
     * bindElementToDialog<T extends (MediaSectionInput | TextSectionInput>은
     * 두가지 형태의 dialog만 인자로 받을 수 있어 확장성이 떨어진다.
     * 특정한 클래스를 인자로 받기보단 인터페이스를 정의하여 컴포지션하는 것이 확장성이 좋다
     * bindElementToDialog<T extends (MediaData | TextData) & Component>
     */
    bindElementToDialog(selector, InputComponent, makeSection) {
        const element = document.querySelector(selector);
        element.addEventListener("click", () => {
            const dialog = new dialog_js_1.InputDialog();
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
new App(document.querySelector(".document"), document.body); //type assertion 사용 가능
