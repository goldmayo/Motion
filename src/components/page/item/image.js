"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageComponent = void 0;
const component_js_1 = require("../../component.js");
class ImageComponent extends component_js_1.BaseComponent {
    constructor(title, url) {
        super(`<section class="image">
            <div class="image__holder"><img class="image__thumbnail"></div>
            <h2 class="page-item__title image__title"></h2>
          </section>`);
        const imageElement = this.element.querySelector(".image__thumbnail");
        imageElement.src = url;
        imageElement.alt = title;
        const titleElement = this.element.querySelector(".image__title");
        titleElement.textContent = title;
    }
}
exports.ImageComponent = ImageComponent;
