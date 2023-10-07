import { useState } from 'react'

import { withErrorBoundary } from 'react-error-boundary';

import './App.css'
import GitHubLink from './components/GitHubLink';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownRenderer from './components/MarkdownRenderer';
import useAutoThemePrism from './hooks/UseAutoThemePrism';
import useIsDarkTheme from './hooks/UseIsDarkTheme';

export default function App() {
    useAutoThemePrism(useIsDarkTheme());

    const [markdown, setMarkdown] = useState<string | undefined>(
`## Hello World

I hope you're all doing well today!

\`\`\`js
const letsMeet = true;

if (letsMeet) {
    console.log('Hello!');
}
\`\`\`

> Markdown at it's core!

― ___Danl Barron__ -- DBarron Consulting, LLC_`);

    const MDXRendererWithErrorBoundary = withErrorBoundary(MarkdownRenderer, { FallbackComponent: ({ error }) => <p>{error.message}</p> });

    return (
        <div className="text-black dark:text-white">
            <nav className="bg-gray-400 dark:bg-gray-600 w-full py-2 flex">
                <h1 className="ml-4 text-xl">React Markdown Editor</h1>
                <div className="flex grow justify-end pr-4">
                    <GitHubLink url="https://github.com/danlbarron/react-markdown-editor" />
                </div>
            </nav>

            <div className="bg-gray-200 dark:bg-gray-800 container mx-auto lg:h-[80vh] grid grid-rows-2 grid-cols-none lg:grid-cols-2 lg:grid-rows-none">
                <div className="overflow-y-auto">
                    <MarkdownEditor
                        height="80vh"
                        value={markdown}
                        onChange={setMarkdown} />
                </div>
                <div className="overflow-scroll m-3">
                    <MDXRendererWithErrorBoundary markdown={markdown} />
                </div>
            </div>

            <footer className="mt-4">
                <div className="text-center">
                    <p>Powered by <a href="https://github.com/danlbarron"><strong>Danl Barron</strong></a></p>
                    <p>2023</p>
                </div>
            </footer>
        </div>
    );
}