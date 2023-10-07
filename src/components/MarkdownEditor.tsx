import type { editor } from "monaco-editor/esm/vs/editor/editor.api";
import useIsDarkTheme from "../hooks/UseIsDarkTheme";

import Editor from '@monaco-editor/react'

export interface MarkdownEditorProps {
    width?: string | number | undefined;
    height: string | number;
    value: string | undefined;
    onChange: (value: string | undefined) => void;
}

export default function MarkdownEditor({value, width, height, onChange}: MarkdownEditorProps) {
    const isDarkTheme = useIsDarkTheme();
    
    const options: editor.IStandaloneEditorConstructionOptions = {
        folding: false,
        glyphMargin: true,
        lineNumbers: 'off',
        minimap: { enabled: false },
        wordWrap: 'on',
        padding: { top: 20 },
        wordWrapColumn: 80
    };

    return (
        <Editor
            height={height}
            width={width}
            defaultLanguage="markdown"
            theme={isDarkTheme ? 'vs-dark' : 'light'}
            value={value}
            onChange={onChange}
            options={options} />
    );
}