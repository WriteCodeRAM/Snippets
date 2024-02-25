'use client'
import type { Snippet } from "@prisma/client"
import Editor from "@monaco-editor/react"
import * as actions from "@/actions/actions"
import { useState } from "react"

interface SnippetEditFormProps {
    snippet: Snippet
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {

    const [code, setCode] = useState(snippet.code)

    const handleEditorChange = (value: string="") => {
        setCode(value)
    }

    const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code)

    return (
        <div className="">
            <Editor height="40vh" theme="vs-dark"
            language="python" defaultValue={snippet.code}
            options={{minimap: { enabled: false}}}
            onChange={handleEditorChange}
            /> 

            <form action={editSnippetAction}>
                <button type="submit" className="p-2 border rounded">Save</button>
            </form>
        </div>
    )

}