import {create} from 'zustand';


interface PartyState {
    id: number | null;
    setPartyData: (id: number) => void;
    reset: () => void;
}

const usePartyData = create<PartyState>((set) => ({
    id: null,
    setPartyData:(id: number) => 
            set(({
                id
            })),
        
        reset:() => {
            set((state: PartyState) => ({
                id:null
            }))
        }
    }))

    export default usePartyData;

