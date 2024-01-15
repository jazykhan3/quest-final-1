'use client'
import {useState} from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { redirect, useRouter } from 'next/navigation'
import * as z from "zod"
import axios, { AxiosResponse } from 'axios'
import { Button } from "@/components/ui/button"
import {
Form,
FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import usePartyData from '../store'
import ErrorScreen from '@/components/ErrorScreen'

const FormSchema = z.object({
    email: z
      .string({
        required_error: "invalid email address",
      })
      .email(),
  })

const ClaimPartyPage = () => {
    const [userExists,setUserExists] = useState<boolean>(false)
    const [error, setError] = useState<any | null>(null)
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
    const partyData = usePartyData()
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          email: "",
        },
      })

      async function onSubmit(data: z.infer<typeof FormSchema>) {
            try {
              setSubmitButtonLoading(true)
                const response = await axios.get('http://192.168.1.130:8000/getParty', {
                    params:{
                        id:partyData.id
                    }
                })
                const userExists = response.data.some((user:any) => user.email === data.email);
                if(userExists) {
              console.log('claim party code run')

                router.push('/players')
                setUserExists(userExists)
                return;
            }

         
            } catch (error) {
                console.log('err')
            }
            finally {
                setSubmitButtonLoading(false);
            }
      }
     if(partyData.id === null){
      redirect('/')
      
      
     } 
     else if(error) {
        return (
          <ErrorScreen />
        )
      }

     else if(!userExists && form.formState.isSubmitted) { 
            return (
                <div className='w-full '>
                    <h1 className="font-bold text-center mb-4 text-xl">That Email is not a member of that Party</h1>
                    <div className="w-full flex flex-col gap-2 justify-between items-center sm:flex-row">
                        <Button onClick={() => {partyData.reset()}} className="bg-[#292B69] rounded-2xl md:text-lg md:px-10 font-serif">Choose a New Name</Button>
                        <Button onClick={() => form.reset()} className="bg-[#292B69] rounded-2xl md:text-lg md:px-10 font-serif" autoFocus>Try Another Email</Button>
                    </div>
                </div>
            )
      }
  return (
    <div>
        <h1 className="font-bold text-center mb-4">Enter the Email of a player in that Party</h1>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col gap-2 justify-center items-center">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='w-full max-w-md'>
             
              <FormControl >
                <Input placeholder="Email" {...field} className="bg-gray-300 " spellCheck={false} autoFocus/>
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-[#292B69] rounded-2xl md:text-lg md:px-10 font-serif">{submitButtonLoading &&  <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default ClaimPartyPage