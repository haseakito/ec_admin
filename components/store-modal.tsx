'use client'

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useStoreModal } from '@/hooks/use-store-modal'
import axios from "axios"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useToast } from '@/components/ui/use-toast'
import { Input } from "@/components/ui/input"
import { Modal } from '@/components/ui/modal'


const formSchema = z.object({
    name: z.string().min(3, {
        message: 'Store name should be more than 3 characters long'
    })
})

export function StoreModal() {

    const { userId, getToken } = useAuth()

    // Boolean state handling loading during API request
    const [loading, setLoading] = useState(false)

    // Hooks handling toast popup
    const { toast } = useToast()

    // Store modal hooks
    const storeModal = useStoreModal()

    // Initialize form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    })


    // Asynchronous function handling submitting the form
    const onSubmit = async (e: z.infer<typeof formSchema>) => {
        try {
            // set loading state to be true during API call
            setLoading(true)

            // POST request to the backend API
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/store",
                {
                    name: e.name,
                    user_id: userId
                },
                {
                    headers: {
                        "Authorization": `Bearer ${await getToken()}`,
                        "Content-Type": 'application/json'
                    }
                })

            // Refresh page and redirect to the store
            window.location.assign(`/${res.data.store.id}`)
        } catch (error) {
            // Output the error to log
            console.log(error)
            
            // Show alert toast if the request failed
            toast({
                title: "Ooops! Something went wrong.",
                description: "There was a problem with your request.",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title='Create store'
            description='Add a new store to manage products and categories'
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Store Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        disabled={loading}
                                        placeholder='e.g. awesome store'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='pt-6 space-x-2 flex items-center justify-end'>
                        <Button
                            variant='outline'
                            disabled={loading}
                            onClick={storeModal.onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            disabled={loading}
                        >
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    )
}
