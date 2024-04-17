import { Styles } from '@blocknote/core';

export type Link = {
  type: 'link';
  content: StyledText[];
  href: string;
};

export type StyledText = {
  type: 'text';
  text: string;
  styles: any;
};

export type InlineContent = Link | StyledText;

export type TableContent = {
  type: 'tableContent';
  rows: {
    cells: InlineContent[][];
  }[];
};

export type Block = {
  id: string;
  type: string;
  props: Record<string, boolean | number | string>;
  content: InlineContent[] | TableContent | undefined;
  children: Block[];
};
