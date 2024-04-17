export interface Styles {
  textColor?: string;
  backgroundColor?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
}

export interface TextContent {
  type: string;
  text: string;
  styles: Styles;
}

export interface LinkContent {
  type: string;
  href: string;
  content: TextContent[];
}

export interface TableContent {
  type: string;
  rows: {
    cells: (TextContent | LinkContent)[][];
  }[];
}

export interface Props {
  backgroundColor: string;
  textAlignment: string;
  textColor?: string;
  level?: number;
  url?: string;
  caption?: string;
  width?: number;
}

export interface Block {
  id: string;
  type: string;
  props: Props;
  children: Block[];
  content?: (TextContent | LinkContent)[] | TableContent;
}
