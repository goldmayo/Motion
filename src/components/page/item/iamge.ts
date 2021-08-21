export class ImageComponent {
  private element: HTMLElement;
  constructor(title: string, url: string) {
    const template = document.createElement("template");
    template.innerHTML = `<section class="image">
    <div class="image__holder">
      <img class="image__thumbnail">
      </div>
      <p class="image__title"></p>
  </section>`;
    //${}는 사용자의 입력(string, url)을 바로 받는 경우임으로 XSS 보안을 위해 사용하지 않는다
    this.element = template.content.firstElementChild! as HTMLElement;
    const imageElement = this.element.querySelector(
      ".image__thumbnail"
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(
      ".image__title"
    )! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }
}
