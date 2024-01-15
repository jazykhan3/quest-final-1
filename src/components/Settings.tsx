"use client"
import React, { useEffect, useState } from 'react'
// import Modal from 'react-modal';

// Modal.setAppElement('#yourAppElement');

function Settings() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [stationName, setStationName] = useState('');

  useEffect(() => {
    const storedStationName = localStorage.getItem('stationName');
    if (storedStationName) {
      setStationName(storedStationName);
    }
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const removeStation = () => {
    localStorage.removeItem('stationName');
    setStationName("");
  };

  const handleStationNameChange = (e: any) => {
    setStationName(e.target.value);
  };

  const handleStationNameSave = () => {
    localStorage.setItem('stationName', stationName);
    closeModal();
  };

  return (
    <div className='text-right'>
      <span className='mr-3 text-xs'>
        {stationName}
      </span>
      <button className='settings text-black' onClick={()=>openModal()}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cog"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" /><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M12 2v2" /><path d="M12 22v-2" /><path d="m17 20.66-1-1.73" /><path d="M11 10.27 7 3.34" /><path d="m20.66 17-1.73-1" /><path d="m3.34 7 1.73 1" /><path d="M14 12h8" /><path d="M2 12h2" /><path d="m20.66 7-1.73 1" /><path d="m3.34 17 1.73-1" /><path d="m17 3.34-1 1.73" /><path d="m11 13.73-4 6.93" /></svg>
        {modalIsOpen}
      </button>
      {modalIsOpen && (
        <div className='w-[85vw] md:w-[500px] h-[350px] absolute top-1/4 z-[120] flex flex-col shadow-2xl p-28 text-center modalBg'>
          <h2>Enter Station Number</h2>
          <input className='border border-gray-400 rounded-lg p-2 my-4' placeholder='Station 47...' type="text" value={stationName} onChange={handleStationNameChange} />
          <div className='flex justify-center gap-4'>
            <button className='p-2 rounded bg-yellow-500' onClick={closeModal}>Cancel</button>
            <button className='p-2 rounded bg-orange-500' onClick={removeStation}>Clear</button>
            <button className='p-2 rounded bg-green-500' onClick={handleStationNameSave}>Save</button>
          </div>
        </div>
      )}
      {/* <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
      </Modal> */}
    </div>
  )
}

export default Settings