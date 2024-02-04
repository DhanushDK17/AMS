import './index.css';
import { Drawer, Modal, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { ApartmentItem } from "../ApartmentItem";
import { AddApartment} from "../AddApartment";
import { useAuth } from "../../hooks/useAuth";
import EditIcon from '@mui/icons-material/Edit';
import { fetchApartmentConvs, fetchApartmentConvsForApartment, fetchApartments, addMessageToConversation } from "../../services/firebase";
function Owner () {
    const {user} = useAuth();
    const [apartments, setApartments] = useState([])
    const [drawer, setDrawer] = useState(false);
    const [currentView, setCurrentView] = useState('apartments');
    const [currentApartment, setCurrentApartment] = useState('');
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentConv, setCurrentConv] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');
    useEffect(() => {
        fetchApartments(user.email, setApartments);
    }, [drawer, setApartments, user.email]);
    const apartmentSetter = (currentApartment) => {
        setCurrentApartment(currentApartment);
        fetchApartmentConvsForApartment(currentApartment.name, setConversations);
    }
    const handleChat = (conversation) => {
        setCurrentView('chat');
        setCurrentConv(conversation.creator);
        fetchApartmentConvs(conversation.creator, currentApartment.name, setMessages);
    }
    const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
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
        <>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div className='appheader'>
        <div style={{width: '20%', display: 'flex', justifyContent: 'left'}}>
          <div style={{fontSize: '40px', borderRadius: '50%', background: 'white', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
            AL
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <button onClick={() => setDrawer(true)} style={{fontSize: '20px', textAlign: 'center', marginLeft: '20px', border: '1px solid black'}}>Add apartment</button>  
            </div>
        </div>        
        </div>
            { currentApartment === ''? 
            <div style={{display: 'flex', flexDirection: 'column'}} className="ownerbody">
                <div style={{display: 'flex', flexWrap: 'wrap', height: '600px', overflow: 'scroll', justifyContent: 'center'}}>
                    { apartments.length === 0 ? <h2>There are no apartments yet</h2> :
                        apartments.map((apartment) => <ApartmentItem clickEvent={apartmentSetter} apartment={apartment} key={apartment.name}/>)
                    }
                </div>
                <Drawer anchor="bottom" open={drawer} onClose={() => setDrawer(false)}>
                    <AddApartment/>
                </Drawer>
            </div>
            :
            <div style={{width: '100%', display: 'flex', padding: '20px'}}>
                <div style={{display: 'flex', width: '60%', justifyContent: 'center'}}>
                    <div style={{width: '100%', padding: '20px', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div style={{width: '50%'}}>
                            <div style={{display: 'flex', justifyContent:'center'}}>
                                {currentApartment !== '' ? <h5 style={{cursor:'pointer', width:'50%', textDecoration: 'underline'}} onClick={() => setCurrentApartment('')}>Back to listing</h5>:''}
                                <div style={{width: '50%',display: 'flex', flexDirection: 'row', marginTop: '10px', justifyContent: 'flex-end'}}>
                                    <button><EditIcon/></button>
                                    <button style={{color: 'red'}}>Delete</button>
                                </div>
                            </div>
                            <div style={{display: 'flex', flexDirection:'column', border: '1px solid black', width: '100%', padding: '20px', borderRadius: '20px'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                    <h3>{currentApartment.name}</h3>
                                    <div style={{color: 'green'}}>
                                        ${currentApartment.price}
                                    </div>
                                </div>
                                <div style={{color: 'gray'}}>
                                    {currentApartment.address}
                                </div>
                                <div style={{padding: '10px'}}>
                                    <div>
                                        {currentApartment.bed} bed {currentApartment.bath} bath
                                    </div>
                                </div>
                                <div style={{fontStyle: 'italic'}}>
                                    {currentApartment.features}
                                </div>
                                <div style={{marginTop: '20px'}}>
                                    Phone - {currentApartment.phone ? currentApartment.phone : '7378228899'}
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
                
                <div style={{width: '30%', marginLeft: '20px'}}>
                    <h3>Conversations</h3>
                    <div style={{border: '1px solid black', padding: '30px'}}>
                        {
                            conversations.length > 0 ?conversations.map((conversation) => 
                                <div onClick={() => handleChat(conversation)} style={{padding: '10px', cursor: 'pointer', borderBottom: '1px solid gray'}}>
                                    {conversation.creator.split('@')[0]}
                                </div>
                            )
                            :
                            <span>No new conversations yet!</span>
                    }
                    </div>
                    
                </div>
            </div>
        }    
        </div>
        <Modal
        open={currentView === 'chat'}
        onClose={() => setCurrentView('apartments')}
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
              <button onClick={() => addMessageToConversation(user.email, currentConv, currentApartment.name, currentMessage, 'owner', setMessages)}>Send</button>
            </div>
            
          </div>
        </Box>
      </Modal>
        </>
    );
}

export { Owner };