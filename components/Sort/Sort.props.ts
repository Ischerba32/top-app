import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sort: SortEnum;
  setSort: (sort: Exclude<SortEnum, SortEnum.Reset>) => void;
}

export enum SortEnum {
  Rating,
  Price,
  Reset
}