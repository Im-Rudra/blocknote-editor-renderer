import React from 'react';

interface Block {
  id: string;
  type: string;
  props: {
    textColor: string;
    backgroundColor: string;
    textAlignment: string;
    level?: number;
  };
  content: {
    type: string;
    text?: string;
    href?: string;
    styles?: {
      bold?: boolean;
      textColor?: string;
      backgroundColor?: string;
    };
    content?: Block[];
  }[];
  children: Block[];
}

const BlockParser: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading':
            const HeadingTag = `h${block.props.level || 1}`;
            return (
              <HeadingTag
                key={block.id}
                className={`text-${block.props.textColor} bg-${block.props.backgroundColor} text-${block.props.textAlignment}`}
              >
                {block.content[0].text}
              </HeadingTag>
            );
          case 'paragraph':
            return (
              <p
                key={block.id}
                className={`text-${block.props.textColor} bg-${block.props.backgroundColor} text-${block.props.textAlignment}`}
              >
                {block.content.map((textBlock) => textBlock.text).join('')}
              </p>
            );
          case 'image':
            return (
              <div key={block.id}>
                <img src={block.props.url} alt={block.props.caption} className={`w-full`} />
                <p className={`text-${block.props.textAlignment}`}>{block.props.caption}</p>
              </div>
            );
          case 'link':
            return (
              <a
                key={block.id}
                href={block.content[0].href}
                className={`text-${block.content[0].styles?.textColor} bg-${block.content[0].styles?.backgroundColor}`}
              >
                {block.content[0].text}
              </a>
            );
          case 'bulletListItem':
          case 'numberedListItem':
            return (
              <ul key={block.id} className={`list-disc ml-4`}>
                {block.content.map((textBlock) => (
                  <li
                    key={textBlock.text}
                    className={`text-${textBlock.styles?.textColor} bg-${textBlock.styles?.backgroundColor}`}
                  >
                    {textBlock.text}
                  </li>
                ))}
              </ul>
            );
          case 'table':
            return (
              <table key={block.id} className={`table-auto`}>
                <tbody>
                  {block.content.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`text-${cell[0].styles?.textColor} bg-${cell[0].styles?.backgroundColor}`}
                        >
                          {cell[0].text}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default BlockParser;

const json = `
[
  {
    "id": "f504b908-7d80-44e6-8b97-9cfeebbfab2e",
    "type": "heading",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left",
      "level": 1
    },
    "content": [
      {
        "type": "text",
        "text": "this is heading 1",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "4adf3532-af94-4726-9ea2-ce61a92a7d35",
    "type": "heading",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left",
      "level": 2
    },
    "content": [
      {
        "type": "text",
        "text": "this is heading 2",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "db8fb427-e0b9-4621-babd-a7e1a6f71833",
    "type": "heading",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left",
      "level": 3
    },
    "content": [
      {
        "type": "text",
        "text": "this is heading 3",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "bcd1a460-db44-4924-8c48-a8cba2365121",
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
    "id": "5e67257e-27ca-4aab-adb9-f592b4dc7d0f",
    "type": "paragraph",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "This is a ",
        "styles": {}
      },
      {
        "type": "text",
        "text": "paragraph",
        "styles": {
          "backgroundColor": "red"
        }
      }
    ],
    "children": [
      {
        "id": "a3c32777-5a9c-447a-af47-0d99f21217ae",
        "type": "paragraph",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "this is a ",
            "styles": {}
          },
          {
            "type": "text",
            "text": "nested",
            "styles": {
              "textColor": "red"
            }
          },
          {
            "type": "text",
            "text": " paragraph",
            "styles": {}
          }
        ],
        "children": []
      }
    ]
  },
  {
    "id": "8d1158ca-bc4c-4357-ac5c-fe2d644b48e7",
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
    "id": "e6234f71-d434-4db2-a62a-ab2dc6667e4f",
    "type": "paragraph",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "this is a paragraph with a ",
        "styles": {}
      },
      {
        "type": "link",
        "href": "google.com",
        "content": [
          {
            "type": "text",
            "text": "link.",
            "styles": {}
          }
        ]
      }
    ],
    "children": []
  },
  {
    "id": "07511767-e76a-4b49-ae8b-4a036d783c19",
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
    "id": "54f88faa-987a-419c-94d3-d1efb02cf364",
    "type": "heading",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "center",
      "level": 3
    },
    "content": [
      {
        "type": "text",
        "text": "this is a heading3 center aligned",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "a8301d68-c7e6-402d-8813-419ab01e2d76",
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
    "id": "e0a12ab3-c896-437e-bda8-387eb6c17bec",
    "type": "image",
    "props": {
      "backgroundColor": "default",
      "textAlignment": "left",
      "url": "https://t4.ftcdn.net/jpg/01/96/52/31/360_F_196523185_k6LSUluqRnbrVsOskQcujOsxvnhHE87p.jpg",
      "caption": "this image is left-aligned",
      "width": 512
    },
    "children": []
  },
  {
    "id": "883a828a-b877-4757-b1cb-0914c2e0cdc6",
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
    "id": "c309f200-b505-477e-9127-3fffb0f1fb7f",
    "type": "image",
    "props": {
      "backgroundColor": "default",
      "textAlignment": "center",
      "url": "https://t4.ftcdn.net/jpg/01/96/52/31/360_F_196523185_k6LSUluqRnbrVsOskQcujOsxvnhHE87p.jpg",
      "caption": "center-aligned image",
      "width": 512
    },
    "children": []
  },
  {
    "id": "723d75ce-d2cf-4893-ae05-b45ae84ac531",
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
    "id": "13eaf475-35f5-4ece-90d1-a48f69fd555c",
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
                "text": "Name",
                "styles": {}
              }
            ],
            [
              {
                "type": "text",
                "text": "Age",
                "styles": {}
              }
            ],
            [
              {
                "type": "text",
                "text": "Profession",
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
                "text": "Rudra",
                "styles": {}
              }
            ],
            [
              {
                "type": "text",
                "text": "25",
                "styles": {}
              }
            ],
            [
              {
                "type": "text",
                "text": "web-",
                "styles": {}
              },
              {
                "type": "link",
                "href": "google.com",
                "content": [
                  {
                    "type": "text",
                    "text": "developer",
                    "styles": {}
                  }
                ]
              }
            ]
          ]
        }
      ]
    },
    "children": []
  },
  {
    "id": "cd58484e-11b4-453c-a177-1159ad36f171",
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
    "id": "829269d0-2235-4cb1-85fb-e5b3e91814a7",
    "type": "bulletListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "this is a bulleted list",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "7ca9142d-0c6f-4c9d-8fa7-d88482197a5f",
    "type": "bulletListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "another list item",
        "styles": {}
      }
    ],
    "children": [
      {
        "id": "88368e82-fc55-4f64-be17-dcfa91ddd15b",
        "type": "bulletListItem",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "nested bulleted list item",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "9d7d3bb8-c2f5-4f21-a2ac-7da5f90c8f70",
        "type": "bulletListItem",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "another one",
            "styles": {}
          }
        ],
        "children": []
      }
    ]
  },
  {
    "id": "f76221d9-dd68-4485-a8fa-68aa916346ee",
    "type": "bulletListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "last item from the main bulleted list tree",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "fe1a9380-5d3e-4e08-8c13-4515dd45cd59",
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
    "id": "fcc5558d-c491-4bde-bca0-89e987f00013",
    "type": "numberedListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "numbered list item",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "58334295-cb84-4c82-b9bf-4418e43bf755",
    "type": "numberedListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "another item",
        "styles": {}
      }
    ],
    "children": [
      {
        "id": "c086856b-0509-44ae-a214-07f9731d86db",
        "type": "numberedListItem",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "nested numbered item",
            "styles": {}
          }
        ],
        "children": []
      },
      {
        "id": "31802477-15a3-4ac3-851b-f1dc42a9a0dc",
        "type": "numberedListItem",
        "props": {
          "textColor": "default",
          "backgroundColor": "default",
          "textAlignment": "left"
        },
        "content": [
          {
            "type": "text",
            "text": "another item",
            "styles": {}
          }
        ],
        "children": []
      }
    ]
  },
  {
    "id": "ed77a345-0feb-41b0-8b32-84e861c42c1a",
    "type": "numberedListItem",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [
      {
        "type": "text",
        "text": "last item from the numbered list item tree",
        "styles": {}
      }
    ],
    "children": []
  },
  {
    "id": "b0dd7721-2ba7-41b4-98a6-0a7669b2ffa5",
    "type": "paragraph",
    "props": {
      "textColor": "default",
      "backgroundColor": "default",
      "textAlignment": "left"
    },
    "content": [],
    "children": []
  }
]
`;
