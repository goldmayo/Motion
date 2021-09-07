"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoComponent = void 0;
const component_js_1 = require("../../component.js");
class TodoComponent extends component_js_1.BaseComponent {
    constructor(title, todo) {
        super(`<section class="todo">
                <h2 class="page-item__title todo__title"></h2>
                <input type="checkbox" id="todo-checkbox">
                <label for="todo-checkbox" class="todo-label"></label>
            </section>`);
        const titleElement = this.element.querySelector(".todo__title");
        titleElement.textContent = title;
        const todoElement = this.element.querySelector(".todo-label");
        todoElement.textContent = todo;
    }
}
exports.TodoComponent = TodoComponent;
