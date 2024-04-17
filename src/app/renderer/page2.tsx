import { BlockNoteEditor } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/react';
import '@blocknote/react/style.css';
import ServerEditorContext from './servereditorcontext';

import React, { FC } from 'react';
import { StyledText } from './types';
import Link from 'next/link';
import Image from 'next/image';

interface Block {
  id: string;
  type: string;
  props: any;
  content: (TextBlock | LinkBlock)[];
  children: Block[];
}

interface TextBlock {
  type: 'text';
  text: string;
  styles?: any;
}

interface LinkBlock {
  type: 'link';
  href: string;
  content: TextBlock[];
}

interface TableCell {
  text: string;
  styles: any;
}

interface TableRow {
  cells: TableCell[];
}

interface TableBlock {
  id: string;
  type: 'table';
  props: any;
  content: {
    rows: TableRow[];
  };
}

// Function to recursively parse the JSON data
function parseBlocks(blocks: Block[]): React.ReactNode[] {
  return blocks.map((block) => {
    switch (block.type) {
      case 'heading':
        return React.createElement(
          `h${block.props.level}`,
          { key: block.id, className: 'text-xl font-bold mb-4' },
          block.content.map(parseText)
        );
      case 'paragraph':
        return React.createElement(
          'p',
          { key: block.id, className: 'mb-4' },
          block.content.map(parseText)
        );
      case 'bulletListItem':
        return React.createElement(
          'li',
          { key: block.id, className: 'list-disc ml-6' },
          block.content.map(parseText)
        );
      case 'numberedListItem':
        return React.createElement(
          'li',
          { key: block.id, className: 'list-decimal ml-6' },
          block.content.map(parseText)
        );
      case 'image':
        return React.createElement(Image, {
          key: block.id,
          src: block.props.url,
          alt: block.props.caption,
          className: 'w-full mb-4'
        });
      case 'table':
        return React.createElement(
          'table',
          { key: block.id, className: 'border-collapse border border-gray-400' },
          parseTable(block)
        );
      default:
        return null;
    }
  });
}

// Function to parse text blocks
function parseText(textBlock: TextBlock | LinkBlock): React.ReactNode {
  if (textBlock.type === 'text') {
    return React.createElement(
      'span',
      { key: textBlock.text, style: textBlock.styles },
      textBlock.text
    );
  } else if (textBlock.type === 'link') {
    return React.createElement(
      Link,
      { key: textBlock.href, href: textBlock.href },
      textBlock.content.map(parseText)
    );
  }
}

// Function to parse table blocks
// Function to parse table blocks
function parseTable(block: TableBlock): React.ReactNode {
  const tableContent = block.content;
  if (tableContent && 'type' in tableContent && block.type === 'table') {
    const { rows } = tableContent;
    return (
      <table key={block.id} className="border-collapse border border-gray-400">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.cells.map((cell, cellIndex) => (
              <td key={`${rowIndex}-${cellIndex}`} className="border border-gray-400 p-2">
                {cell.text}
              </td>
            ))}
          </tr>
        ))}
      </table>
    );
  } else {
    return null; // Handle case when content is not a table
  }
}

// Main function to generate JSX
function generateJSX(jsonData: Block[]): React.ReactNode[] {
  return parseBlocks(jsonData);
}

// Usage example
const jsonData = `[
  {
      "id": "bc407bd3-fd63-43d9-9139-b313ee8f67fa",
      "type": "heading",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "center",
          "level": 1
      },
      "content": [
          {
              "type": "text",
              "text": "Heading",
              "styles": {}
          }
      ],
      "children": []
  },
  {
      "id": "0e869397-1054-4250-b2c5-e0324cec79a7",
      "type": "paragraph",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [
          {
              "type": "text",
              "text": "Welcome to this demo!",
              "styles": {}
          }
      ],
      "children": []
  },
  {
      "id": "40109f30-07cb-4fcc-a715-590c372e9918",
      "type": "paragraph",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [],
      "children": []
  },
  {
      "id": "c200d33b-d1a7-4bf6-a3d3-a85ffd1c02d7",
      "type": "paragraph",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [
          {
              "type": "text",
              "text": "Blocks:",
              "styles": {
                  "bold": true
              }
          }
      ],
      "children": []
  },
  {
      "id": "cfaab361-41e2-44ed-a909-4fc3edae2a92",
      "type": "paragraph",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [
          {
              "type": "text",
              "text": "Paragraph",
              "styles": {}
          }
      ],
      "children": []
  },
  {
      "id": "13c70811-1950-436d-bfd2-30b6f18a7d0c",
      "type": "bulletListItem",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [
          {
              "type": "text",
              "text": "Bullet List Item",
              "styles": {}
          }
      ],
      "children": []
  },
  {
      "id": "1aa6cee6-5f95-423d-94e5-86c82e318a5e",
      "type": "numberedListItem",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [
          {
              "type": "text",
              "text": "Numbered List Item",
              "styles": {}
          }
      ],
      "children": []
  },
  {
      "id": "5987f816-f25a-4c01-94cf-5b85870381fd",
      "type": "numberedListItem",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [
          {
              "type": "text",
              "text": "last",
              "styles": {}
          }
      ],
      "children": []
  },
  {
      "id": "12b604ce-605e-409d-9940-49ccce4caa28",
      "type": "numberedListItem",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [
          {
              "type": "text",
              "text": "lsdf",
              "styles": {}
          }
      ],
      "children": [
          {
              "id": "3db262a6-403c-4ec8-95d5-73f6968943fb",
              "type": "numberedListItem",
              "props": {
                  "textColor": "default",
                  "backgroundColor": "default",
                  "textAlignment": "left"
              },
              "content": [
                  {
                      "type": "text",
                      "text": "sljfd",
                      "styles": {}
                  }
              ],
              "children": []
          },
          {
              "id": "176afa0d-ed91-4af0-ad2c-cec3906caa11",
              "type": "numberedListItem",
              "props": {
                  "textColor": "default",
                  "backgroundColor": "default",
                  "textAlignment": "left"
              },
              "content": [
                  {
                      "type": "text",
                      "text": "sfds",
                      "styles": {}
                  }
              ],
              "children": []
          },
          {
              "id": "d05fd0ad-0725-41de-8ed0-2cf27f499ba8",
              "type": "numberedListItem",
              "props": {
                  "textColor": "default",
                  "backgroundColor": "default",
                  "textAlignment": "left"
              },
              "content": [
                  {
                      "type": "text",
                      "text": "sfd",
                      "styles": {}
                  }
              ],
              "children": []
          }
      ]
  },
  {
      "id": "09a5c983-01dd-4303-8a99-f39beb464a8e",
      "type": "numberedListItem",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [
          {
              "type": "text",
              "text": "sf",
              "styles": {}
          }
      ],
      "children": []
  },
  {
      "id": "56192442-eaef-4278-bf44-9d69a9f6fa81",
      "type": "numberedListItem",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [
          {
              "type": "text",
              "text": "sfds",
              "styles": {}
          }
      ],
      "children": []
  },
  {
      "id": "66d6a74a-c9d0-4ab5-948d-9eb5f7691e9e",
      "type": "numberedListItem",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [
          {
              "type": "text",
              "text": "sfd",
              "styles": {}
          }
      ],
      "children": []
  },
  {
      "id": "02f4d6bb-b277-40bb-bf54-8263dec0e5e6",
      "type": "paragraph",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [],
      "children": []
  },
  {
      "id": "c76d2d8e-baf8-40d4-86a4-3af19be13c36",
      "type": "image",
      "props": {
          "backgroundColor": "default",
          "textAlignment": "center",
          "url": "https://images.ctfassets.net/hrltx12pl8hq/3Z1N8LpxtXNQhBD5EnIg8X/975e2497dc598bb64fde390592ae1133/spring-images-min.jpg",
          "caption": "Butterfly on a Flower",
          "width": 624
      },
      "children": []
  },
  {
      "id": "f06da6d5-2cba-4477-880d-556110cac2d3",
      "type": "table",
      "props": {
          "textColor": "default",
          "backgroundColor": "default"
      },
      "content": {
          "type": "tableContent",
          "rows": [
              {
                  "cells": [
                      [
                          {
                              "type": "text",
                              "text": "Table Cell",
                              "styles": {
                                  "bold": true
                              }
                          }
                      ],
                      [
                          {
                              "type": "text",
                              "text": "Table Cell",
                              "styles": {
                                  "bold": true
                              }
                          }
                      ],
                      [
                          {
                              "type": "text",
                              "text": "Table Cell",
                              "styles": {
                                  "bold": true
                              }
                          }
                      ]
                  ]
              },
              {
                  "cells": [
                      [
                          {
                              "type": "text",
                              "text": "Table Cell",
                              "styles": {}
                          }
                      ],
                      [
                          {
                              "type": "text",
                              "text": "Table Cell",
                              "styles": {}
                          }
                      ],
                      [
                          {
                              "type": "text",
                              "text": "Table Cell",
                              "styles": {}
                          }
                      ]
                  ]
              },
              {
                  "cells": [
                      [
                          {
                              "type": "text",
                              "text": "Table Cell",
                              "styles": {}
                          }
                      ],
                      [
                          {
                              "type": "text",
                              "text": "Table Cell",
                              "styles": {}
                          }
                      ],
                      [
                          {
                              "type": "text",
                              "text": "Table Cell",
                              "styles": {}
                          }
                      ]
                  ]
              }
          ]
      },
      "children": []
  },
  {
      "id": "29e2860c-d8d2-4f0b-bd84-23cabf870210",
      "type": "paragraph",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [],
      "children": []
  },
  {
      "id": "43a48ef7-5f40-4276-a65d-9dc6369ab1ca",
      "type": "paragraph",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [
          {
              "type": "text",
              "text": "Inline Content:",
              "styles": {
                  "bold": true
              }
          }
      ],
      "children": []
  },
  {
      "id": "31494ed3-229a-4268-9b29-e6fb3e585434",
      "type": "paragraph",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [
          {
              "type": "text",
              "text": "Styled Text",
              "styles": {
                  "textColor": "red",
                  "backgroundColor": "red"
              }
          },
          {
              "type": "text",
              "text": " ",
              "styles": {}
          },
          {
              "type": "link",
              "href": "https://www.blocknotejs.org",
              "content": [
                  {
                      "type": "text",
                      "text": "Link",
                      "styles": {}
                  }
              ]
          }
      ],
      "children": []
  },
  {
      "id": "a8ee34ab-cb61-4b92-a8ba-0ef4a7773b56",
      "type": "paragraph",
      "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
      },
      "content": [],
      "children": []
  }
]`;

const jsx = generateJSX(JSON.parse(jsonData));
console.log(jsx);

export default function BlockRendererPage() {
  // const editor = ServerEditorContext({
  //   initialContent: [
  //     {
  //       type: 'paragraph',
  //       content: 'Welcome to this demo!'
  //     },
  //     {
  //       type: 'paragraph'
  //     },
  //     {
  //       type: 'paragraph',
  //       content: [
  //         {
  //           type: 'text',
  //           text: 'Blocks:',
  //           styles: { bold: true }
  //         }
  //       ]
  //     },
  //     {
  //       type: 'paragraph',
  //       content: 'Paragraph'
  //     },
  //     {
  //       type: 'heading',
  //       content: 'Heading'
  //     },
  //     {
  //       type: 'bulletListItem',
  //       content: 'Bullet List Item'
  //     },
  //     {
  //       type: 'numberedListItem',
  //       content: 'Numbered List Item'
  //     },
  //     {
  //       type: 'image'
  //     },
  //     {
  //       type: 'table',
  //       content: {
  //         type: 'tableContent',
  //         rows: [
  //           {
  //             cells: ['Table Cell', 'Table Cell', 'Table Cell']
  //           },
  //           {
  //             cells: ['Table Cell', 'Table Cell', 'Table Cell']
  //           },
  //           {
  //             cells: ['Table Cell', 'Table Cell', 'Table Cell']
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       type: 'paragraph'
  //     },
  //     {
  //       type: 'paragraph',
  //       content: [
  //         {
  //           type: 'text',
  //           text: 'Inline Content:',
  //           styles: { bold: true }
  //         }
  //       ]
  //     },
  //     {
  //       type: 'paragraph',
  //       content: [
  //         {
  //           type: 'text',
  //           text: 'Styled Text',
  //           styles: {
  //             bold: true,
  //             italic: true,
  //             textColor: 'red',
  //             backgroundColor: 'blue'
  //           }
  //         },
  //         {
  //           type: 'text',
  //           text: ' ',
  //           styles: {}
  //         },
  //         {
  //           type: 'link',
  //           content: 'Link',
  //           href: 'https://www.blocknotejs.org'
  //         }
  //       ]
  //     },
  //     {
  //       type: 'paragraph'
  //     }
  //   ]
  // });
  return (
    <div className="max-w-5xl mx-auto max-h-screen h-full font-[hindShiliguri]">
      {/* <BlockNoteView theme="light" editor={editor} editable={true} /> */}
      {generateJSX(JSON.parse(jsonData))}
    </div>
  );
}
