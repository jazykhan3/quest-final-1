'use client'
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
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
import usePartyData from "./store"
import { Loader2 } from "lucide-react"

const FormSchema = z.object({
  partyname: z.string().min(1, {
    message: "Party name is required",
  }),
})

export default function Home() {
 
  const [error, setError] = useState<any>(null);
  const router = useRouter()
  const partyData = usePartyData()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      partyname: "",
    },
  })
  


 async function onSubmit(data: z.infer<typeof FormSchema>) {
  try {
    if(error) {
    setError(null)
    }

    const response = await axios.get('http://192.168.1.130:8000/partyName', {
     params: {
       name: data.partyname
     }
    })
    if(response.status === 200) {
      (response.data.length > 0) ? partyData.setPartyData(response.data[0].id) :  router.push(`/partyAvailable/${data.partyname}`)

    }
      

    } catch (error) {
  setError(error)
    console.log(error)
  }
}



  if(partyData.id != null ) {
    
 return (
     <PartyExists name={form.getValues('partyname')}  />
   )
  }
  

return (
  <main >
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:w-2/3 space-y-6 mx-auto flex flex-col justify-center items-center">
        <FormField
        
          control={form.control}
          name="partyname"
          render={({ field }) => (
            <FormItem className="w-full md:w-2/3 max-w-lg">
             
              <FormControl>
                <Input placeholder="Enter the name of your Party" className="bg-gray-300"{...field} spellCheck={false} autoFocus />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <div className="text-red-500">Something went wrong please try again!</div>}
        <Button type="submit" className="bg-[#292B69] rounded-2xl md:text-lg md:px-10 font-serif">
        {form.formState.isSubmitting &&  <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit</Button>
      </form>
    </Form>
  </main>
  )

}

interface PartyProps {
  name: string; 
}


const PartyExists = (props: PartyProps) => {
  const router = useRouter()
  const partyData = usePartyData()
  function handleNewNameClick() {
    partyData.reset()
  }
  return ( 
    <div className="flex flex-col items-center w-full gap-2">
    <span className="font-bold mb-10">That Party Already Exists</span>
    <div className="w-full flex justify-between">
        <Button onClick={handleNewNameClick} className="bg-[#292B69] font-serif rounded-2xl md:text-lg md:px-10 mx-10 font-serif">Try a New Name</Button>
        <Button onClick={()=> router.push('/claimParty')} className="bg-[#292B69] font-serif rounded-2xl md:text-lg md:px-10 mx-10 font-serif" autoFocus>Claim it</Button>
    </div>
</div>
)
}
