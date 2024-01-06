"use client"

import { useState } from "react"
import {
    useParams,
    useRouter
} from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"

import { Store } from "@/types/store"

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { AlertModal } from "@/components/alert-modal"

import { Trash } from "lucide-react"


interface SettingsFormProps {
    store: Store
}

const formSchema = z.object({
    name: z.string().min(1)
})

export function SettingsForm({
    store
}: SettingsFormProps) {

    const { userId, getToken } = useAuth()

    // Boolean state handling modal state
    const [open, setOpen] = useState(false)

    // Boolean state handling loading during API request
    const [loading, setLoading] = useState(false)

    // Hooks handling toast popup
    const { toast } = useToast()

    // Hooks handling dynamic params
    const param = useParams()

    // Hooks handling router
    const router = useRouter()

    // Initialize form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: store
    })

    // Asynchronous function handling submitting the form
    const onSubmit = async (e: z.infer<typeof formSchema>) => {
        try {
            // set loading state to be true during API call
            setLoading(true)

            // PATCH request to the backend API
            axios.patch(process.env.NEXT_PUBLIC_API_URL + `/api/store/${param}`, e, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                    "Content-Type": 'application/json'
                }
            })
            
            // Refresh the page to update content
            router.refresh()

            // Show successful toast
            toast({
                title: "Update successful!"
            })
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

    const onDelete = async () => {
        try {
            setLoading(true)

            // PATCH request to the backend API
            axios.delete(process.env.NEXT_PUBLIC_API_URL + `/api/store/${param}`, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })
            
            // Refresh the page to update content
            router.refresh()

            // Redirect to the index page
            router.push('/')
            
            // Show successful toast
            toast({
                title: "Delete successful!"
            })
        } catch (error) {
            // Output the error to log
            console.log(error)

            // Show alert toast if the request failed
            toast({
                title: "Ooops! Something went wrong.",
                description: "Make sure you removed all products and categories first",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={() => {}}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    description="Manage store settings"
                />

                <Button
                    variant='destructive'                
                    size='icon'
                    disabled={loading}
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-x-4"
                >
                    <div className="grid grid-cols-3 gap-8">
                        {/* Store name form field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Store name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="ml-auto"
                    >
                        Save Changes
                    </Button>
                </form>
            </Form>
        </div>
    )
}
