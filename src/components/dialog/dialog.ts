import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;
// 자체적으로 행동하지 않고 외부에서 행동을 주입받아 행동
export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;
  constructor() {
    super(`<dialog class="dialog">
            <div class="dialog__container">
                <button class="close">&times;</button>
                <div id="dialog__body"></div>
                 <button class="dialog__submit">ADD</button>
            </div>
        </dialog>`);

    const closeBtn = this.element.querySelector(".close")! as HTMLButtonElement;
    /**
     * closeBtn = addEventListener("click","")
     * closeBtn에 다른 이벤트가 등록이 되면(즉, 다른 곳에서 계속 이벤트 리스너를 등록할 수 있다(재사용 가능하다))
     * 다수의 리스너가 등록되어 있으면 등록된 순서대로 콜백함수가 실행 됨
     * onclick에 할당하는 것은 기존에 다른 리스너가 등록되어 있으면 그것을 덮어 씌우는 효과
     * 컴포넌트 안에서 등록하는 곳이 한 곳이면 onclick을 사용해도 좋지만
     * 버튼을 다른 곳에서도 사용한다면 addEventListener를 사용하는 것이 좋다.
     */
    closeBtn.onclick = () => {
      // 이벤트 리스너는 외부로 부터 주입 받아서 등록된 리스너가 있다면 호출하는 방법으로 구현한다
      this.closeListener && this.closeListener();
    };
    const submitBtn = this.element.querySelector(".dialog__submit")! as HTMLButtonElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  addChild(child: Component) {
    // 무엇을 보여줄 지 외부에서 사용자가 결정가능
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attachTo(body);
  }
}
