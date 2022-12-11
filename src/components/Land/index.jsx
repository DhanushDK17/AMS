import './index.css';
import { useAuth } from '../../hooks/useAuth';
import { MenuItem, TextField, Modal, Box } from '@mui/material';
import React, { useState } from 'react';
import { Listing } from '../../components/Listing';
// import searchPool from '../../data/apartmentsData100.json';
import { useEffect, useCallback } from 'react';
import { Owner } from '../Owner';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { checkIfConversationExist, fetchApartmentsForResidents, createConversation, addMessageToConversation, fetchApartmentConvs } from '../../services/firebase';
function Land() {
  const {user} = useAuth();
  const [bedrooms, setBedrooms] = useState('any');
  const [bathrooms, setBathrooms] = useState('any');
  const [searchKey, setSearchkey] = useState('');
  const [price, setPrice] = useState([0,3000]);
  const [apartments, setApartments] = useState([]);
  const [currentView, setCurrentView] = useState('listing');
  const [currentApartment, setCurrentApartment] = useState(null);
  const [messages, setMessages] = useState([]);
  const [convsExist, setConvsExist] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentConv, setCurrentConv] = useState('');
  const [location, setLocation] = useState('san-marcos');
  const updateApartments = useCallback(() => {
    console.log(price[1], searchKey, bedrooms, bathrooms);
    let newSet = apartments.filter(apartment => {
      console.log(apartment.address, searchKey, apartment.price, price[1])
      return searchKey !== '' ? (apartment.name.toLowerCase().includes(searchKey.toLowerCase()) || apartment.address.toLowerCase().includes(searchKey.toLowerCase())) : true
      &&
      apartment.price <= price[1]
    });
    console.log(newSet);
    setApartments(newSet);
  }, [apartments, searchKey, bathrooms, bedrooms, price]);
  useEffect(() => {
    fetchApartmentsForResidents(setApartments);
  }, [setApartments]);
  const options = ['any','1', '2', '3', '4'].map(element => 
    <MenuItem key={element} value={element}>
      {element}
    </MenuItem>
  );
  
  const handleSearchKeyUpdate = (event) => {
    setSearchkey(event.target.value.toLowerCase())
    setTimeout(() => {
      updateApartments()
    }, 500)
    
  }
  const handleBedroomChange = (event) => {
    setBedrooms(event.target.value)
    setTimeout(() => {
      updateApartments()
    }, 500)
  }
  const handleToPriceChange = (event) => {
    setPrice([price[0], event.target.value])
    setTimeout(() => {
      updateApartments()
    }, 500)
  }
  const handleCreatConv = async (conversationowner) => {
    await createConversation(user.email, currentApartment.name)
    setConvsExist(true);
    setCurrentConv(conversationowner);
    await fetchApartmentConvs(user.email,currentApartment.name, setMessages);
  }
  const handleBathroomChange = (event) => {
    setBathrooms(event.target.value)
    setTimeout(() => {
      updateApartments()
    }, 500)
  }
  const apartmentSetter = (currentApartment) => {
    setCurrentApartment(currentApartment);
    checkIfConversationExist(user.email, currentApartment.name, setConvsExist);
    fetchApartmentConvs(user.email,currentApartment.name, setMessages);
  }
  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  }
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
  };
  return (
    <div className="container">
      <div className='appheader'>
        <div style={{width: '20', display: 'flex', justifyContent: 'left'}}>
          <div style={{fontSize: '40px', borderRadius: '50%', background: 'white', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
            AL
          </div>
        </div>
        <div style={{display: 'flex', marginLeft: '10px', width: '75%'}}>
          <TextField variant='outlined' placeholder='search terms.....' style={{color:'whitesmoke'}} value={searchKey} onChange={handleSearchKeyUpdate}/>
          {/* <TextField  variant='outlined' placeholder='$$$' style={{color:'whitesmoke', marginLeft: '20px'}} value={price[0]} onChange={handleFromPriceChange}/> */}
          <div style={{display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
            <span style={{color: 'green', fontSize: '30px'}}>$</span>
            <TextField  variant='outlined' placeholder='$$$' style={{color:'whitesmoke', marginLeft: '5px'}} type="number" value={price[1]} onChange={handleToPriceChange}/>
          </div>
          <TextField style={{marginLeft: '20px'}} variant='outlined' select value={bedrooms} onChange={handleBedroomChange}>
            {options}
          </TextField>
          <TextField style={{marginLeft: '20px'}} variant='outlined' select value={bathrooms} onChange={handleBathroomChange}>
            {options}
          </TextField>
        </div>
        <TextField style={{marginLeft: '20px'}} variant='outlined' select value={location} onChange={handleLocationChange}>
          <MenuItem key='san-marcos' value="san-marcos">
            San Marcos
          </MenuItem>
          </TextField>
        </div>
      { 
      user.type === 'resident' ?
      currentView === 'listing' ?
      (<div style={{overflow: 'hidden', height: '100%', width: '100%'}}>
          <Listing className='appbody' onclickEvent={apartmentSetter} viewSetter={setCurrentView} data={apartments}/>
      </div>
      )
      :
      (<div style={{width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-around', width: '60%'}}>
          <div style={{cursor: 'pointer', display: 'flex', justifyContent: 'space-evenly'}} onClick={() => {setCurrentView('listing');setCurrentApartment(null)}}>
            <ArrowBackIcon/>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: '1px solid gray'}}>
            <h2 style={{fontSize: '60px'}}>{currentApartment.name}</h2>
            <h5 style={{color: 'gray'}}>{currentApartment.address}</h5>
          </div>
          <div style={{fontSize: '35px',color: 'green', marginLeft: '20px'}}>
            ${currentApartment.price}
          </div>
          </div>
        </div>
        <div style={{marginTop: '20px'}}>
            <span style={{fontSize: '20px'}}>{currentApartment.bed} bed {currentApartment.bath} bath</span>
        </div>
        <div>
          <h3>Features</h3>
          <div>
            {currentApartment.features}
          </div>
        </div>
        <div>
          {convsExist ?
            <button onClick={() => setCurrentView('convs')} style={{padding: '15px', textDecoration: 'underline'}}>Chat</button>
            :
            <button onClick={handleCreatConv} style={{padding: '15px', textDecoration: 'underline'}}>Start a conversation</button>
          }
        </div>
      </div>)
      :
      <Owner/>
      }
      <Modal
        open={currentView === 'convs'}
        onClose={() => setCurrentView('appdetails')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={modalStyle}>
          <div style={{backgroundColor: 'whitesmoke', padding: '10px 50px 50px 50px'}}>
            <h3 style={{textAlign: 'center', marginBottom: '20px'}}>Chat</h3>
            <div>
              {messages.map((message) =>
                <div style={{display: 'flex', marginBottom: '10px'}}>
                  <span style={{marginRight: '10px', border: '1px solid gray', borderRadius: '50px', background: 'orange'}}>{message.by[0]}</span>
                  <h4>
                    {message.text}
                  </h4>
                </div>
              )}
            </div>
            <div style={{display: 'flex'}}>
              <input style={{padding: '10px', marginRight: '10px'}} type="text" value={currentMessage} onChange={handleMessageChange} />
              <button onClick={() => addMessageToConversation(user.email, user.email, currentApartment.name, currentMessage, 'resident', setMessages)}>Send</button>
            </div>
            
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export {Land};
