import { BaseComponent, Component } from "../component.js";
//@deco
import { Hoverable, Droppable } from "./../common/type";
import { EnableDragging, EnableDrop, EnableHover } from "../../decorators/draggable.js";
import { Draggable } from "../common/type.js";

type OnCloseListener = () => void;
type DragState = "start" | "stop" | "enter" | "leave";
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;
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

// interface SectionContainer extends Component, Composable {
//@deco
interface SectionContainer extends Component, Composable, Draggable, Hoverable {
  //의존성 주입
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChrildren(state: "mute" | "unmute"): void;
  getBoundingRect(): DOMRect;
  onDropped(): void;
}

@EnableDragging
@EnableHover
export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;

  constructor() {
    super(`<li draggable="true" class="page-item">
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
    //@deco
    // this.element.addEventListener("dragstart", (event: DragEvent) => {
    //   this.onDragStart(event);
    // });
    // this.element.addEventListener("dragend", (event: DragEvent) => {
    //   this.onDragEnd(event);
    // });
    // this.element.addEventListener("dragenter", (event: DragEvent) => {
    //   this.onDragEnter(event);
    // });
    // this.element.addEventListener("dragleave", (event: DragEvent) => {
    //   this.onDragLeave(event);
    // });
  }

  onDragStart(_: DragEvent) {
    this.notifyDragObservers("start");
    this.element.classList.add("lifted");
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObservers("stop");
    this.element.classList.remove("lifted");
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObservers("enter");
    this.element.classList.add("drop-area");
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObservers("leave");
    this.element.classList.remove("drop-area");
  }
  onDropped() {
    this.element.classList.remove("drop-area");
  }
  notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }
  addChild(child: Component) {
    const container = this.element.querySelector(".page-item__body")! as HTMLElement;
    child.attachTo(container);
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }
  muteChrildren(state: "mute" | "unmute") {
    if (state === "mute") {
      this.element.classList.add("mute-children");
    } else {
      this.element.classList.remove("mute-children");
    }
  }
  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }
}

// export class PageComponet extends BaseComponent<HTMLUListElement> implements Composable {
@EnableDrop
export class PageComponet extends BaseComponent<HTMLUListElement> implements Composable, Droppable {
  private children = new Set<SectionContainer>();
  private dropTarget?: SectionContainer;
  private dragTarget?: SectionContainer;
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
    //@deco
    // this.element.addEventListener("dragover", (event: DragEvent) => {
    //   this.onDragOver(event);
    // });
    // this.element.addEventListener("drop", (event: DragEvent) => {
    //   this.onDrop(event);
    // });
  }
  //@deco
  // onDragOver(event: DragEvent) {
  //   event.preventDefault();
  //   console.log("onDragOver");
  // }
  //@deco
  onDragOver(_: DragEvent): void {}

  onDrop(event: DragEvent) {
    //@deco
    // event.preventDefault();
    // console.log("onDrop");
    if (!this.dropTarget) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = event.clientY;
      const srcElement = this.dragTarget.getBoundingRect();

      this.dragTarget.removeFrom(this.element);
      this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? "beforebegin" : "afterend");
    }
    this.dropTarget.onDropped();
  }
  addChild(section: Component) {
    // constructor에서 전달된 인터페이스를 만족하는 타입의 클래스를 생성
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
      // console.log(target, state);
      switch (state) {
        case "start":
          this.dragTarget = target;
          this.updateSections("mute");
          break;
        case "stop":
          this.dragTarget = undefined;
          this.updateSections("unmute");
          break;
        case "enter":
          this.dropTarget = target;
          break;
        case "leave":
          this.dropTarget = undefined;
          break;
        default:
          throw new Error(`unsupported state: ${state}`);
      }
    });
  }
  private updateSections(state: "mute" | "unmute") {
    this.children.forEach((section: SectionContainer) => {
      section.muteChrildren(state);
    });
  }
}

/**
 * PageComponent안에서 PageItemComponent를 바로 쓰는것이 아니라,
 * SectionContainer 인터페이스를 준수하는 어떤 클래스도 만들 수 있게되았고
 * SectionContainerConstructor 생성자 타입을 정의하여 외부에서 클래스를 생성 가능하게 만들었다
 */
