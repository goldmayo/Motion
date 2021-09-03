import { BaseComponent, Component } from "../component.js";

type OnCloseListener = () => void;

//container의 개념
export interface Composable {
  addChild(child: Component): void;
}

type SectionContainerConstructor = {
  // 생성자 타입
  // new (): 아무런 값도 전달 받지 않고 생성자 호출시
  // SectionContainer 인터페이스를 만족하는 생성하는 클래스
  new (): SectionContainer;
};

interface SectionContainer extends Component, Composable {
  //의존성 주입
  setOnCloseListener(listener: OnCloseListener): void;
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener;

  constructor() {
    super(`<li class="page-item">
            <section class="page-item__body">
              <div class="page-item__controls">
                <button class="close">&times;</button>
              </div>
            </section>
          </li>`);
    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }
  addChild(child: Component) {
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container);
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}

export class PageComponet extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    // constructor에서 전달된 인터페이스를 만족하는 타입의 클래스를 생성
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}

/**
 * PageComponent안에서 PageItemComponent를 바로 쓰는것이 아니라,
 * SectionContainer 인터페이스를 준수하는 어떤 클래스도 만들 수 있게되았고
 * SectionContainerConstructor 생성자 타입을 정의하여 외부에서 클래스를 생성 가능하게 만들었다
 */
