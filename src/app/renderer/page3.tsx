import Image from 'next/image';
import React from 'react';

interface Block {
  id: string;
  type: string;
  props: {
    textColor: string;
    backgroundColor: string;
    textAlignment: string;
    level?: number;
    url?: string;
    caption?: string;
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

function parseBlocks(blocks: Block[]): React.ReactNodeArray {
  return blocks.map((block) => {
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
      case 'bulletListItem':
        return (
          <ul key={block.id} className="list-disc">
            <li>{block.content.map((textBlock) => textBlock.text).join('')}</li>
          </ul>
        );
      case 'numberedListItem':
        return (
          <ol key={block.id} className="list-decimal">
            <li>{block.content.map((textBlock) => textBlock.text).join('')}</li>
          </ol>
        );
      case 'image':
        return (
          <div key={block.id} className="text-center">
            <Image
              src={block.props.url ? block.props.url : ''}
              alt={block.props.caption ? block.props.caption : ''}
            />
            <p>{block.props.caption}</p>
          </div>
        );
      case 'table':
        const tableContent = block.content[0];
        if (tableContent && 'type' in tableContent && tableContent.type === 'tableContent') {
          const rows = tableContent.rows;
          return (
            <table key={block.id} className="w-full">
              <tbody>
                {rows.map((row: any, rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.cells.map((cell: any, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className={`text-${cell.styles?.textColor || 'black'} bg-${
                          cell.styles?.backgroundColor || 'white'
                        }`}
                      >
                        {cell.text}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }
        return null;
      default:
        return null;
    }
  });
}

// Usage
const parsedBlocks = parseBlocks(yourJsonData);
