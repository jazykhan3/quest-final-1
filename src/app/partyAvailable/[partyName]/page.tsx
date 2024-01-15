'use client'
import { useState } from 'react'
import { useRouter, useParams, redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import axios, { AxiosResponse } from 'axios'
import usePartyData from '../../store'
import { Loader2 } from "lucide-react"

const PartyAvailable = () => {
    const params = useParams<{ partyName: string }>()
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
    // const [showAvailableScreen, setShowAvailableScreen] = useState(true);
    const router = useRouter()
    const partyData = usePartyData()
  
    function handleNewNameClick() {
      partyData.reset()
        router.push('/')
    }
    async function handleClaimClick() {
      try {
        setSubmitButtonLoading(true)
        const response = await axios.post(`http://192.168.1.130:8000/createParty?name=${params.partyName}`)
    
        if(response.status === 200 && response.data.length > 0) {
            router.push('/players')
            partyData.setPartyData(response.data[0].id)
          
        }
      } catch (error) {
        console.log('error', error)
      } finally {
        setSubmitButtonLoading(false)
      }
    }
    if(!params.partyName) {
      redirect('/')
    }
    return ( 
    <div className=" flex flex-col items-center">
      <span className="font-bold text-center mb-4 text-xl">That Party Name is Available</span>
      <div className="w-full flex flex-col gap-2 justify-between items-center sm:flex-row">
          <Button onClick={handleNewNameClick} className="bg-[#292B69] rounded-2xl md:text-lg md:px-10 font-serif">Try a New Name</Button>
          <Button onClick={handleClaimClick} className="bg-[#292B69] rounded-2xl md:text-lg md:px-10 font-serif" autoFocus>
            {submitButtonLoading &&  <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Claim it
            </Button>
      </div>
  </div>
  )
  }

  export default PartyAvailable