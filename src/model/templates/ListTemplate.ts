import FullList from "../FullList";

interface DOMList {
  ul: HTMLUListElement,
  clear(): void, 
  render(fullList: FullList): void
}

export default class ListTemplate implements DOMList {

  static instance: ListTemplate = new ListTemplate()

  ul: HTMLUListElement

  private constructor() {
    this.ul = document.querySelector("#listItems") as HTMLUListElement
  }

  clear(): void {
    this.ul.innerHTML = ""
  }
  
  render(fullList: FullList): void {
    this.clear()

    fullList.list.forEach(item => {
      const li: HTMLLIElement = document.createElement("li")
      li.className = "item"
  
      const input: HTMLInputElement = document.createElement("input")
      input.setAttribute("type", "checkbox")
      input.setAttribute("id", item.id)
      input.checked = item.checked
      input.addEventListener("change", () => {
        item.checked = !item.checked
        fullList.save()
      })
      li.appendChild(input)

      const label: HTMLLabelElement = document.createElement("label")
      label.setAttribute("for", item.id)
      label.textContent = item.item
      li.appendChild(label)
      
      const button: HTMLButtonElement = document.createElement("button")
      button.className = "button"
      button.textContent = "X"
      button.addEventListener('click', ()=> {
        fullList.removeItem(item.id)
        this.render(fullList)
      })
      li.appendChild(button)
      this.ul.appendChild(li)
    });
  }
}