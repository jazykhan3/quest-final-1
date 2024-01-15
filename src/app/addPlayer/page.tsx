'use client'
import React from 'react'
import {useState} from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { redirect, useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import usePartyData from '../store'
import ErrorScreen from '@/components/ErrorScreen'

const FormSchema = z.object({
  email: z
    .string().min(1, {
      message: "Please enter your email"
    })
    ,
})

const CreateFormSchema = z.object({
  firstName: z.string().min(1, {
    message: "First Name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is required",
  }),
  characterClass: z.string().min(1, {
    message:'Please enter a character'
  })
})

const AddPlayerPage = () => {
  const [player,setPlayer] = useState<any[] | null>(null)
  const [openCreatePlayerForm, setOpenCreatePlayerForm] = useState(false);
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);
  const [error, setError] = useState<any>(null);
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
        setIsSubmitButtonClicked(true);
        const response = await axios.get('http://192.168.1.130:8000/getPlayer', {
          params: {
            email: data.email
          }
        })

        if(response.status === 200) {
          if(response.data.length > 0) {
        const addPlayerPartyRes = await axios.put(`http://192.168.1.130:8000/addPlayerParty?email=${data.email}&partyId=${partyData.id}`
        // , {
        //       email:data.email,
        //       partyId:partyData.id
        //     }
            )

            if(addPlayerPartyRes.status === 200) {
              router.push('/players')
            }
          }
         setPlayer(response.data)
        }
      } catch (error) {
        setError(error);
      }
      finally {
        setIsSubmitButtonClicked(false);
      }
    }
    if(!partyData.id) {
      redirect('/')
    }
   else if(error) {
      return (
        <ErrorScreen />
      )
    }
 
    if(openCreatePlayerForm) {
      return (
       <CreatePlayer email={form.getValues('email')}/>
      )
    }

   else if(player !== null && player.length == 0) {
      return (
        <div>
          <h1 className="font-bold text-center mb-4 text-xl">That Email is not an Existing Player</h1>
          <div className="w-full flex flex-col gap-2 justify-between items-center sm:flex-row">
            <Button onClick={() => setPlayer(null)} className="bg-[#292B69] font-serif rounded-2xl md:text-lg md:px-10" >Try Another Email</Button>
            <Button onClick={() => setOpenCreatePlayerForm(true)} className="bg-[#292B69] font-serif rounded-2xl md:text-lg md:px-10" autoFocus>Create Them!</Button>
          </div>
        </div>
      )
    }
  return (
    <div>
        <h1 className="font-bold text-center mb-4">Enter the email of the player joining this Party</h1>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col gap-2 justify-center items-center">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='w-full max-w-md'>
             
              <FormControl>
                <Input placeholder="Email" {...field} className="bg-gray-300 " spellCheck={false} autoFocus />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-[#292B69] font-serif rounded-2xl md:text-lg md:px-10">{isSubmitButtonClicked &&  <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Submit</Button>
      </form>
    </Form>
        <div className='w-full text-center md:text-left'>

              <Button onClick={() => router.push('/players')} className='bg-[#730A0A] font-serif rounded-2xl md:text-lg md:px-10'>Cancel</Button>
        </div>
    </div>
  )
}

interface CreatePlayerProps {
  email: string;

}

const CreatePlayer = (props: CreatePlayerProps) => {
  const [error, setError] = useState<any>(null);
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);
  const router = useRouter()
  const partyData = usePartyData()
  const createForm = useForm<z.infer<typeof CreateFormSchema>>({
    resolver: zodResolver(CreateFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      characterClass: "",
    },
  })

  async function onCreatePlayerSubmit(data: z.infer<typeof CreateFormSchema>) {
  try {
    setIsSubmitButtonClicked(true)
    const response = await axios.post(`http://192.168.1.130:8000/createPlayerParty?email=${props.email}&playerClass=${data.characterClass}&firstName=${data.firstName}&lastName=${data.lastName}&partyId=${partyData.id}`)

  if(response.status === 200) {
    router.push('/players')
  }
    
  } catch (error) {
    setError(error)
  } finally {
    setIsSubmitButtonClicked(false)
  }
    }
 if(error) {
  return (
    <ErrorScreen />
  )
 }
  return ( 
    <div>
    <Form {...createForm}>
  <form onSubmit={createForm.handleSubmit(onCreatePlayerSubmit)} className="w-full space-y-6 flex flex-col gap-2 justify-center ">
    <div className='flex flex-col mx-auto gap-2 w-full md:w-2/3 max-w-2xl'>

    <FormField
      control={createForm.control}
      name="firstName"
      render={({ field }) => (
        <FormItem>
         
          <FormControl>
            <Input placeholder="First Name" {...field} spellCheck={false} autoFocus/>
          </FormControl>
          
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={createForm.control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
         
          <FormControl>
            <Input placeholder="Last Name" {...field} spellCheck={false}/>
          </FormControl>
          
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={createForm.control}
      name="characterClass"
      render={({ field }) => (
        <FormItem>
          
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Character Class" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
                            <SelectItem value="warrior">Warrior</SelectItem>
                            <SelectItem value="warlord">Warlord</SelectItem>
                            <SelectItem value="rogue">Rogue</SelectItem>
                            <SelectItem value="shadow">Shadow</SelectItem>
                            <SelectItem value="cleric">Cleric</SelectItem>
                            <SelectItem value="crusader">Crusader</SelectItem>
                            <SelectItem value="mage">Mage</SelectItem>
                            <SelectItem value="battlemage">Battlemage</SelectItem>
            </SelectContent>
          </Select>
         
          <FormMessage />
        </FormItem>
      )}
      />
      </div>
    <div className="w-full flex flex-col gap-2 justify-between items-center sm:flex-row">

      <Button onClick={() => router.push('/players')} className='bg-[#730A0A] font-serif rounded-2xl md:text-lg md:px-10'>Cancel</Button>
      <Button type="submit" className="bg-[#292B69] font-serif rounded-2xl md:text-lg md:px-10">{isSubmitButtonClicked &&  <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Submit</Button>
    </div>
  </form>
</Form>
    </div>
  )
}

export default AddPlayerPage