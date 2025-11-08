import React from 'react';
import parse, { HTMLReactParserOptions, Element, domToReact, DOMNode } from 'html-react-parser';
import Link from 'next/link';

export const HtmlParser = ({ html }: { html: string }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name === 'a') {
        const href = domNode.attribs.href;
        return (
          <Link href={href} className={domNode.attribs.class || ''}>
            {domToReact(domNode.children as DOMNode[], options)}
          </Link>
        );
      }
    }
  };

  return <>{parse(html, options)}</>;
};
