'use client'

import { useState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button'
import React from 'react'
import usePartyData from '../store';
import axios from 'axios'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ErrorScreen from '@/components/ErrorScreen';


const PlayersPage = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const { toast } = useToast()
  const partyData = usePartyData();
  const router = useRouter()

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {

    if (isSubmitButtonClicked) {
      const newTimeoutId = setTimeout(() => {
        partyData.reset()

      }, 9000);

      setTimeoutId(newTimeoutId);
    }
    const fetchData = async () => {
      try {

        if (!partyData.id) {
          redirect('/')
        }
        // Make an API request
        const response = await axios.get('http://192.168.1.130:8000/getParty', {
          params: {
            id: partyData.id
          }
        });


        // Update the state with the fetched data
        setData(response.data);
      } catch (error) {
        // Handle errors
        setError(error);
      } finally {
        // Set loading to false once the request is completed
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSubmitButtonClicked]);

  async function handleCharacterChange(id: string, mainClass: string) {
    try {
      const response = await axios.put(`http://192.168.1.130:8000/updatePlayerClass?id=${id}&playerClass=${mainClass}`
      )

      if (response.status === 200) {
        setData(data => {
          return data!.map(player => {
            if (player.id === id) {
              return {
                ...player,
                mainClass: mainClass
              }
            } else {
              return player
            }
          })
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Cannot update player class please try again",
        description: "There was a problem with your request.",

      })

    }

  }
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  async function handleDeletePlayerClick(email: string) {
      try {
        const response = await axios.put(`http://192.168.1.130:8000/removePlayerParty?email=${email}`)
        if (response.status === 200) {
          setModalIsOpen(false);
          setData(data => data!.filter(player => player.email !== email));
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem while deleting a player.",
          action: <ToastAction altText="Try again" onClick={() => handleDeletePlayerClick}>Try again</ToastAction>,
        })
      }
  }
  function handleSubmitClick() {
    setIsSubmitButtonClicked(true);
    setTimeout(() => {
      router.push('/');
    }, 30000);
  }
  //todo
  if (!partyData.id) {
    redirect('/')
  }
  else if (error) {
    return (
      <ErrorScreen />
    )
  }

  if (loading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>

        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    )
  }

  if (isSubmitButtonClicked) {
    handleMakeShield(partyData.id);
    return (
      <div className='flex flex-col items-center ml-20'>
        <span>Your party ID is</span>
        <span className='text-lg'>{partyData.id}</span><br />
        <span>Take an available player medallion and scan it on the wood box with a purple light.</ span><br /><span> Have fun!</span>
        <div className='w-full flex flex-col justify-center md:flex-row md:justify-between mt-2'>

          <Button onClick={() => {
            clearTimeout(timeoutId)
            setIsSubmitButtonClicked(false)
          }}
            className='bg-[#730A0A] rounded-2xl md:text-lg md:px-10 font-serif'>Back</Button>
          <Button onClick={() => partyData.reset()} className='bg-[#730A0A] rounded-2xl md:text-lg md:px-10 font-serif' autoFocus>Submit</Button>

        </div>
      </div>
    )
  }

  return (
    <main>
      <div>
        <span className='font-bold text-center mb-4 text-lg block'>Enter up to 6 players</span>
        <div>
          <div className='flex flex-col gap-2'>
            {
              data && data.map((player: any) => (
                <div key={player.id} className='flex justify-between'>
                  <div className='flex items-center gap-2'>

                    <Button size={'icon'} className='px-4 w-100' onClick={openModal}><p className='text-xs'>Remove</p></Button>
                    <span className='text-lg'>{player.firstName} {player.lastName}</span>

                  </div>
                  <Select value={player.mainClass} onValueChange={(newMainClass) => handleCharacterChange(player.id, newMainClass)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={player.mainClass} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Character Class</SelectLabel>
                        <SelectItem value="warrior">Warrior</SelectItem>
                        <SelectItem value="warlord">Warlord</SelectItem>
                        <SelectItem value="rogue">Rogue</SelectItem>
                        <SelectItem value='shadow'>Shadow</SelectItem>
                        <SelectItem value="cleric">Cleric</SelectItem>
                        <SelectItem value="crusader">Crusader</SelectItem>
                        <SelectItem value="mage">Mage</SelectItem>
                        <SelectItem value="battlemage">Battlemage</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {modalIsOpen && (
                    <div className='w-[85vw] md:w-[500px] h-[400px] absolute top-1/4 z-[120] flex flex-col shadow-2xl p-28 text-center modalBg'>
                      <h2>Are you sure you want to remove <strong>{player.firstName} {player.lastName}</strong> from this party?</h2>
                      <div className='flex justify-center gap-4'>
                        <button className='p-2 rounded bg-yellow-500' onClick={closeModal}>Cancel</button>
                        <button className='p-2 rounded bg-green-500' onClick={()=>handleDeletePlayerClick(player.email)}>Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            }
            {data != null && data!.length < 6 && <div>
              <Button onClick={() => router.push('/addPlayer')} className="bg-[#39824a] rounded-2xl md:text-lg font-serif md:px-10">Add Player</Button>
            </div>
            }
          </div>

        </div>
        {(data != null && data.length > 0) &&
          <div className='text-center md:text-right mt-2'>

            <Button disabled={data.length == 0} onClick={handleSubmitClick} className="bg-[#292B69] font-serif rounded-2xl md:text-lg md:px-10" autoFocus>Submit</Button>
          </div>
        }
      </div>
    </main>
  )
}


async function handleMakeShield(partyId: any) {
  let box = localStorage.getItem("stationName");
  try {
    if (box && partyId) {
      const response = await axios.get(`http://100.84.139.95:8000/makeShield?id=${partyId}&box=${box}`)
      console.log(response);
    } else {
      throw new Error("Unable to get station name!")
    }
  } catch (error) {
    console.log('There was an error');
    alert("There was an error : " + error);
  }

}

export default PlayersPage