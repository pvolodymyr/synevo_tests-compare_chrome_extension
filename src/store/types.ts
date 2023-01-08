export enum RowTypes {
  Common = "common",
  Duplicated = "duplicated",
  Unic = "unic",
}

export type Cell = { value: string | null; colorValue: string };

export type Row = {
  id: string;
  rowType: RowTypes;
  cells: Cell[];
};

export type SelectedTest = {
  id: string;
  headline: string;
  price: string;
  tests: string[];
};

export type FilterItem = {
  id: string;
  tests: string[];
};

export type CommonProps = string[];
export type DifferentProps = SelectedTest;

export type ParsedTestsBoardData = {
  header: Omit<SelectedTest, "tests">[];
  body: Row[];
};

export enum SortOption {
  Default = "default",
  CommonFirst = "common-first",
}

export type TableRowsMap = Map<string, HTMLElement>;
export type TestPackages = { id: string; tests: string[] }[];
