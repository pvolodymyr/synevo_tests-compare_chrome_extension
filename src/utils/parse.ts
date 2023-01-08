import { findInfoCell } from "./dom_manipulations";

export const parseId = (cell: HTMLTableCellElement) =>
  cell.querySelector("b").innerText;

const parseHeadline = (cell: HTMLTableCellElement) => {
  const textNode =
    cell.childNodes[0].nodeName === "A"
      ? cell.childNodes[0].childNodes[0]
      : cell.childNodes[0];

  return textNode && textNode.textContent.replace(" / ", "").trim();
};

const removeLeadingBrackets = (text: string) => {
  if (text[0] === "(") {
    return text.slice(1, text.length);
  }

  return text;
};

const parseMedicalTestsList = (cell: HTMLTableCellElement) => {
  if (!cell) return null;

  const innerText = cell.querySelector("span").innerText;

  return removeLeadingBrackets(innerText).split("; ");
};

const parsePriceCell = (cell: HTMLTableCellElement) => {
  if (!cell) return null;

  return cell.innerText;
};

const parseInfoCellTestsAndId = (infoCell: HTMLTableCellElement) => ({
  id: parseId(infoCell),
  tests: parseMedicalTestsList(infoCell),
});

export const getInfoCellTests = (tableRowNode: HTMLTableRowElement) =>
  parseInfoCellTestsAndId(findInfoCell(tableRowNode));

export const parseInfoCellContent = (
  infoCell: HTMLTableCellElement,
  priceCell: HTMLTableCellElement
) => ({
  ...parseInfoCellTestsAndId(infoCell),
  headline: parseHeadline(infoCell),
  price: parsePriceCell(priceCell),
});
