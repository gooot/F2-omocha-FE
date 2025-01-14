/* eslint-disable react/jsx-props-no-spreading */
import { RenderElementProps, useFocused, useSelected } from 'slate-react';

import { type ImageElement } from '@/components/TextEditor/hooks/useImage';
import colors from '@/styles/color';

type CommonElement = {
  type: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  children: unknown;
};

type CustomElement = ImageElement | CommonElement;

// 요소별 블록 스타일
function Elements({ attributes, children, element }: RenderElementProps) {
  const customElement = element as CustomElement;
  const selected = useSelected();
  const focused = useFocused();

  const style = { textAlign: 'align' in customElement ? customElement.align : 'left' };

  const olStyle = {
    ...style,
    marginTop: '1em',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    paddingInlineStart: '40px',
  };

  const ulStyle = {
    ...style,
    marginTop: '1em',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    paddingInlineStart: '40px',
    listStyleType: 'disc',
  };

  const blockquoteStyle = {
    ...style,
    borderLeft: `2px solid ${colors.gray5}`,
    margin: '0',
    paddingLeft: '10px',
    color: `${colors.gray8}`,
    fontStyle: 'italic',
  };

  switch (customElement.type) {
    case 'block-quote':
      return (
        <blockquote style={blockquoteStyle} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={ulStyle} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={olStyle} {...attributes}>
          {children}
        </ol>
      );
    case 'image':
      return (
        <div {...attributes} style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            style={{
              outline: selected && focused ? '1px solid blue' : 'none',
              width: '50%',
              height: '50%',
            }}
            src={(element as ImageElement).url}
            alt={(element as ImageElement).url}
          />
          {children}
        </div>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
}

export default Elements;
