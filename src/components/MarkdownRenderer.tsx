import type { MarkdownableProps } from "../hooks/UseMarkdownContent";

import { useEffect, useState } from "react";
import useMarkdownContent from "../hooks/UseMarkdownContent";

export interface MDXRendererProps {
    markdown: string | undefined;
}

export default function MDXRenderer({ markdown }: MDXRendererProps) {
    const MDXContent = useMarkdownContent(MarkdownComponent, markdown);

    return (
        <MDXContent />
    );
}

interface DangerouslySetInnerHTML {
    __html: string;
}

function MarkdownComponent({ innerHtml }: MarkdownableProps) {
    const [dangerouslySetInnerHTML, setDangerouslySetInnerHTML] = useState<DangerouslySetInnerHTML | undefined>()

    useEffect(() => {
        (async () => {
            if (!innerHtml) {
                setDangerouslySetInnerHTML(undefined);
                return;
            }

            var el = document.createElement('body');
            el.innerHTML = innerHtml;

            Array
                .from(el.getElementsByTagName('img'))
                .forEach(e => {
                    e.src = "The associated embedded content file has been deleted.";
                });

            setDangerouslySetInnerHTML({ __html: el.innerHTML });
        })();
    }, [innerHtml]);

    return (
        <section
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={dangerouslySetInnerHTML} />);
}