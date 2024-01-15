// tobe deleted

// import React from 'react'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { useRouter } from 'next/navigation'
// import * as z from "zod"
// import axios, { AxiosResponse } from 'axios'
// import { Button } from "@/components/ui/button"
// import {
// Form,
// FormControl,
// FormDescription,
// FormField,
// FormItem,
// FormLabel,
// FormMessage,
// } from "@/components/ui/form"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
// import usePartyData from '../store'

// const FormSchema = z.object({
//     firstName: z.string().min(1, {
//       message: "First Name is required",
//     }),
//     lastName: z.string().min(1, {
//       message: "Last Name is required",
//     }),
//     characterClass: z.string()
//   })

// const CreatePlayerPage = () => {
//     const form = useForm<z.infer<typeof FormSchema>>({
//         resolver: zodResolver(FormSchema),
//         defaultValues: {
//           firstName: "",
//           lastName: "",
//           characterClass: "",
//         },
//       })
//       async function onSubmit(data: z.infer<typeof FormSchema>) {
//        const response = await axios.put('http://192.168.1.130:8000/createPlayerParty', {

//        })
//       }
//   return (
//     <div>
//         <div>
//         <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
//         <FormField
//           control={form.control}
//           name="firstName"
//           render={({ field }) => (
//             <FormItem>
             
//               <FormControl>
//                 <Input placeholder="enter party name" {...field} />
//               </FormControl>
              
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="lastName"
//           render={({ field }) => (
//             <FormItem>
             
//               <FormControl>
//                 <Input placeholder="enter party name" {...field} />
//               </FormControl>
              
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="characterClass"
//           render={({ field }) => (
//             <FormItem>
              
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a verified email to display" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                                 <SelectItem value="warrior">Warrior</SelectItem>
//                                 <SelectItem value="barbarian">Barbarian</SelectItem>
//                                 <SelectItem value="rogue">Rogue</SelectItem>
//                                 <SelectItem value="cleric">Cleric</SelectItem>
//                                 <SelectItem value="crusader">Crusader</SelectItem>
//                                 <SelectItem value="mage">Mage</SelectItem>
//                                 <SelectItem value="battlemage">Battlemage</SelectItem>
//                 </SelectContent>
//               </Select>
             
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button>Cancel</Button>
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//         </div>
//     </div>
//   )
// }

// export default CreatePlayerPage