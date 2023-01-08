const rowClassName = "search__item";

export const findTableRow = (event: Event) => {
  let parentNode = (<HTMLElement>event.target).parentNode;
  let resultNode: HTMLTableRowElement;

  while (parentNode.nodeName !== "TABLE") {
    if (parentNode.nodeName === "BUTTON") break;
    if (parentNode.nodeName === "A") {
      event.preventDefault();
    }

    if (
      parentNode.nodeName === "TR" &&
      (parentNode as HTMLElement).classList.contains(rowClassName)
    ) {
      resultNode = parentNode as HTMLTableRowElement;

      break;
    }

    parentNode = parentNode.parentNode;
  }

  return resultNode;
};

export const findInfoCell = (targetNode: HTMLTableRowElement) =>
  targetNode.childNodes[0] as HTMLTableCellElement;

export const findPriceCell = (targetNode: HTMLTableRowElement) =>
  targetNode.childNodes[1] as HTMLTableCellElement;
