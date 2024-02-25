'use server'
import { db } from '@/db'
import { redirect } from 'next/navigation'


export async function createSnippet(formState: {message: string}, formData : FormData) {
   
    try {

    
    // validate user input 
    const title = formData.get('title') as string
    const code = formData.get('code') as string

    if (typeof title !== 'string' || title.length < 3){
        return {
            message: "Invalid title"
        }
    }

    if (typeof code !== 'string' || code.length < 10){
        return {
            message: "Code must be longer"
        }
    }

    //create a new record in db 
    const snippet = await db.snippet.create(
        {
            data: {
            title, 
            code 
        }
    }
    )

} catch(err: unknown){
    if (err instanceof Error){
        return {
            message: err.message
        }
    }else {
        return {
            message: "Something went wrong..."
        }
    }
}
    //redirect user to the root route
    redirect('/')
}

export async function editSnippet(id: number, code: string ) {
    console.log(id, code)
    await db.snippet.update({
        where: { id }, 
        data: { code }
        })

    redirect(`/snippets/${id}`)
    }


export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id }
    })

    redirect(`/`)
}