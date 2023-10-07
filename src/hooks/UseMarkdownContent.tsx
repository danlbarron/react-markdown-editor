import React, { useEffect, useState } from "react";
import useErrorDispatcher from "./UserErrorDispatcher";

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrism from '@mapbox/rehype-prism';
import rehypeStringify from 'rehype-stringify';

export interface MarkdownableProps {
    innerHtml?: string;
}

export default function useMarkdownContent<P extends MarkdownableProps>(Component: React.ComponentType<P>, markdown: string | undefined): React.ComponentType<P> {
    const [mdHtml, setMdHtml] = useState('');
    const throwError = useErrorDispatcher();

    useEffect(() => {
        const md2html = async (markdown: string): Promise<string> => {
            const result = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypePrism)
            .use(rehypeStringify)
            .process(markdown);

            return result.toString();
        }

        (async () => {
            setMdHtml(await md2html(markdown ?? '').then(h => h, throwError) as string);
        })();
    }, [markdown]);

    const mdProps: MarkdownableProps = {
        innerHtml: mdHtml
    };

    return props => {
        const p = {...props, ...mdProps };

        return (
            <Component { ...p } />
        );
    };
}