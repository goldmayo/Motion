"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoComponent = void 0;
const component_js_1 = require("../../component.js");
class VideoComponent extends component_js_1.BaseComponent {
    constructor(title, url) {
        super(`<section class="video">
                <div class="video__player"><iframe class="video__iframe"></iframe></div>
                <h3 class="page-item__title video__title"></h3>
            </section>`);
        const iframe = this.element.querySelector(".video__iframe");
        iframe.src = this.convertToEmbeddedURL(url);
        const titleElement = this.element.querySelector(".video__title");
        titleElement.textContent = title;
    }
    convertToEmbeddedURL(url) {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtube.be\/([a-zA-Z0-9-]{11})))/;
        const match = url.match(regExp);
        console.log(match);
        const videoId = match ? match[1] || match[2] : undefined;
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    }
}
exports.VideoComponent = VideoComponent;
// ^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))
// https://www.youtube.com/embed/7LNl2JlZKHA
// https://youtu.be/7LNl2JlZKHA
// https://www.youtube.com/watch?v=7LNl2JlZKHA
