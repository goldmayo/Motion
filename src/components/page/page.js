"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageComponet = exports.PageItemComponent = void 0;
const component_js_1 = require("../component.js");
class PageItemComponent extends component_js_1.BaseComponent {
    constructor() {
        super(`<li draggable="true" class="page-item">
            <section class="page-item__body">
              <div class="page-item__controls">
                <button class="close">&times;</button>
              </div>
            </section>
          </li>`);
        const closeBtn = this.element.querySelector(".close");
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
    }
    addChild(child) {
        const container = this.element.querySelector(".page-item__body");
        child.attachTo(container);
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
}
exports.PageItemComponent = PageItemComponent;
class PageComponet extends component_js_1.BaseComponent {
    constructor(pageItemConstructor) {
        super('<ul class="page"></ul>');
        this.pageItemConstructor = pageItemConstructor;
    }
    addChild(section) {
        // constructor에서 전달된 인터페이스를 만족하는 타입의 클래스를 생성
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, "beforeend");
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        });
    }
}
exports.PageComponet = PageComponet;
/**
 * PageComponent안에서 PageItemComponent를 바로 쓰는것이 아니라,
 * SectionContainer 인터페이스를 준수하는 어떤 클래스도 만들 수 있게되았고
 * SectionContainerConstructor 생성자 타입을 정의하여 외부에서 클래스를 생성 가능하게 만들었다
 */
