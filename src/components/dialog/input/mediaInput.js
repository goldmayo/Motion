"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaSectionInput = void 0;
const component_js_1 = require("../../component.js");
class MediaSectionInput extends component_js_1.BaseComponent {
    constructor() {
        super(`<div>
            <div class="form__container">
                <label for="title">Title</label>
                <input type="text" id="title" />
            </div>
            <div class="form__container">
                <label for="url">URL</label>
                <input type="text" id="url" />
            </div>
        </div>`);
    }
    get title() {
        const element = this.element.querySelector("#title");
        return element.value;
    }
    get url() {
        const element = this.element.querySelector("#url");
        return element.value;
    }
}
exports.MediaSectionInput = MediaSectionInput;
