import Link from 'next/link';
import { Block, LinkContent, TextContent } from './types';
import React from 'react';
import { backgroundColors, textColors } from './colors';
import DynamicHeading from './DynamicHeading';
import Image from 'next/image';

export function parseContent(content: TextContent | LinkContent) {
  if (content.type === 'text' && 'styles' in content) {
    if (Object.keys(content.styles).length === 0) {
      return content.text;
    } else {
      const bgColor = content.styles.backgroundColor
        ? backgroundColors[content.styles.backgroundColor]
        : '';

      const textColor = content.styles.textColor ? textColors[content.styles.textColor] : '';

      return (
        <span
          className={`
            rounded-sm 
            py-[-4px]
            ${bgColor} 
            ${textColor} 
            ${content.styles.bold ? 'font-bold' : ''} 
            ${content.styles.italic ? 'italic' : ''} 
            ${content.styles.underline ? 'underline' : ''} 
            ${content.styles.strike ? 'line-through' : ''}
          `}
        >
          {content.text}
        </span>
      );
    }
  } else if (content.type === 'link' && 'href' in content) {
    return (
      <Link
        target="_blank"
        href={content.href}
        className="text-blue-500 hover:text-blue-700 underline transition-colors"
      >
        {'content' in content ? content.content.map((c) => parseContent(c)) : ''}
      </Link>
    );
  }
}

export function parseParagraph(block: Block) {
  if (block.type !== 'paragraph') return null;
  if (!('content' in block)) return null;
  if (Array.isArray(block.content) && !block.content.length) {
    return <br />;
  }

  const alignment = block.props.textAlignment;
  let textAlign = 'text-justify';
  switch (alignment) {
    case 'left':
      textAlign = 'text-justify';
      break;

    case 'center':
      textAlign = 'text-center';
      break;

    case 'right':
      textAlign = 'text-right';
      break;

    default:
      textAlign = 'text-justify';
      break;
  }

  return (
    <p
      className={`tracking-tight leading-7 text-gray-700 dark:text-gray-200 text-xl py-1 ${textAlign}`}
    >
      {Array.isArray(block.content) && block.content.map((c) => parseContent(c))}
    </p>
  );
}

export function parseHeading(block: Block) {
  if (block.type !== 'heading') return null;

  let fontSize = 'text-3xl';
  const level = block.props.level;
  switch (level) {
    case 1:
      fontSize = 'text-5xl pb-5';
      break;

    case 2:
      fontSize = 'text-4xl pb-3';
      break;

    case 3:
      fontSize = 'text-3xl pb-2';
      break;

    default:
      fontSize = 'text-xl';
      break;
  }

  const alignment = block.props.textAlignment;
  let textAlign = 'text-left';
  switch (alignment) {
    case 'left':
      textAlign = 'text-left';
      break;
    case 'center':
      textAlign = 'text-center';
      break;
    case 'right':
      textAlign = 'text-right';
      break;

    default:
      textAlign = 'text-left';
      break;
  }

  return (
    <DynamicHeading
      className={`text-gray-700 dark:text-gray-200 font-bold ${fontSize} ${textAlign}`}
      level={level ? level : 1}
    >
      {Array.isArray(block.content) && block.content.map((c) => parseContent(c))}
    </DynamicHeading>
  );
}

export function parseImage(block: Block) {
  if (block.type !== 'image') return null;

  const textAlignment = block.props.textAlignment;
  let alignment = 'justify-left';
  switch (textAlignment) {
    case 'left':
      alignment = 'justify-left';
      break;
    case 'center':
      alignment = 'justify-center';
      break;
    case 'right':
      alignment = 'justify-right';
      break;

    default:
      alignment = 'justify-left';
      break;
  }

  return (
    <div className={`flex items-center mb-8 ${alignment}`}>
      <div className="flex flex-col justify-center items-center">
        <Image
          src={block.props.url ? block.props.url : ''}
          alt={block.props.caption ? block.props.caption : ''}
          width={block.props.width}
          height={((block.props.width ? block.props.width : 300) / 16) * 9}
          style={{
            maxWidth: block.props.width + 'px'
          }}
          className="rounded-md select-none"
          placeholder="empty"
        />
        <span className="text-gray-500">{block.props.caption}</span>
      </div>
    </div>
  );
}

export function parseList(block: Block, listIndex: number) {
  if (block.type !== 'bulletListItem' && block.type !== 'numberedListItem') {
    return null;
  }
  return (
    <li className={`${block.type === 'numberedListItem' ? 'list-none' : 'list-disc'} text-xl pb-1`}>
      {block.type === 'numberedListItem' ? (
        <span className="pr-3 select-none">{listIndex}.</span>
      ) : (
        ''
      )}
      {Array.isArray(block.content) && block.content.map((c) => parseContent(c))}
    </li>
  );
}

export function parseTable(block: Block) {
  if (block.type !== 'table') return null;
  if (!block.content) return null;
  if (!('rows' in block.content)) return null;
  const { rows } = block.content;

  return (
    <div className="my-5 flex items-center">
      <table className="table-auto min-w-[50%] text-xl text-left rtl:text-right rounded">
        <tbody>
          {rows.map((row, rowIndex: number) => (
            <tr key={rowIndex} className="">
              {row.cells.map((cell, cellIndex: number) => (
                <td key={cellIndex} className="px-4 py-1 border-2 border-gray-400">
                  {cell.map((c) => parseContent(c))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function parseBlocks(blocks: Block[], indentLevel: number) {
  let listIndex = 0;
  return (
    <div
      className={`border-gray-300 dark:border-gray-700 py-1`}
      style={{
        marginLeft: indentLevel > 0 ? indentLevel - 1 + 'px' : 0,
        paddingLeft: indentLevel > 0 ? 20 + 'px' : 0,
        borderLeftWidth: indentLevel > 0 ? '2px' : 0
      }}
    >
      {blocks.map((block: Block) => {
        if (block.type !== 'numberedListItem') {
          listIndex = 0;
        }
        switch (block.type) {
          case 'paragraph':
            return (
              <>
                {parseParagraph(block)}
                {block.children.length > 0 && parseBlocks(block.children, indentLevel + 1)}
              </>
            );

          case 'heading':
            return (
              <>
                {parseHeading(block)}
                {block.children.length > 0 && parseBlocks(block.children, indentLevel + 1)}
              </>
            );

          case 'image':
            return parseImage(block);

          case 'bulletListItem':
            return (
              <>
                {parseList(block, listIndex)}
                {block.children.length > 0 && parseBlocks(block.children, indentLevel + 1)}
              </>
            );
          case 'numberedListItem':
            listIndex++;
            return (
              <>
                {parseList(block, listIndex)}
                {block.children.length > 0 && parseBlocks(block.children, indentLevel + 1)}
              </>
            );

          case 'table':
            return parseTable(block);

          default:
            return null;
        }
      })}
    </div>
  );
}
