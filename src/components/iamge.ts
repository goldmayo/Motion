export class ImageComponent {
  private imgElement: HTMLImageElement;
  private liElement: HTMLLIElement;
  constructor() {
    this.imgElement = document.createElement("img");
    this.imgElement.setAttribute("src", "./assets/hanoktown.jpg");
    this.liElement = document.createElement("li");
    this.liElement.textContent = "My image";
    this.liElement.appendChild(this.imgElement);
  }
  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.liElement);
  }
}
