"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextSectionInput = void 0;
const component_js_1 = require("../../component.js");
class TextSectionInput extends component_js_1.BaseComponent {
    constructor() {
        super(`<div>
            <div class="form__container">
                <label for="title">Title</label>
                <input type="text" id="title" />
            </div>
            <div class="form__container">
                <label for="body">ody</label>
                <textarea type="text" row="3" id="body"></textarea>
            </div>
        </div>`);
    }
    get title() {
        const title = this.element.querySelector("#title");
        return title.value;
    }
    get body() {
        const body = this.element.querySelector("#body");
        return body.value;
    }
}
exports.TextSectionInput = TextSectionInput;
