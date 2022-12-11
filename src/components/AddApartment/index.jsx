import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { addApartment } from '../../services/firebase';
import './index.css';

function AddApartment () {
    const {user} = useAuth();
    const addCurrentApartment = () => {
        addApartment(user.email, {
            name: apartment.name,
            address: apartment.address,
            features: apartment.features,
            bed: apartment.bed,
            bath: apartment.bath,
            price: apartment.price,
        }, 'signedApartments');
    }
    const [apartment, setApartment] = useState({
        name: 'apartment_name',
        bed: 1,
        bath: 2,
        price: 1234
    });

    const updateApartmentName = (event) => {
        setApartment({
            ...apartment,
            name: event.target.value   
        });
    }
    const updateApartmentAddres = (event) => {
        setApartment({
            ...apartment,
            address: event.target.value   
        });
    }
    // const updateApartmentDescription = (event) => {
    //     setApartment({
    //         ...apartment,
    //         description: event.target.value   
    //     });
    // }
    const updateApartmentFeatures = (event) => {
        setApartment({
            ...apartment,
            features: event.target.value   
        });
    }
    const updateApartmentBeds = (event) => {
        setApartment({
            ...apartment,
            bed: event.target.value
        })
    }
    const updateApartmentBaths = (event) => {
        setApartment({
            ...apartment,
            bath: event.target.value
        })
    }
    const updateApartmentPrice = (event) => {
        setApartment({
            ...apartment,
            price: event.target.value
        })
    }
    return (
        <>
            <div style={{width: '100%', height: '100%', overflow: 'hidden'}}>
                <div className='fieldcontainer'>
                    <div>
                        <input value={apartment.name} type="text" className='aafield' placeholder='Apartment name' onChange={updateApartmentName} />
                    </div>
                    <div>
                        <textarea onChange={updateApartmentAddres} type="text" className='aafieldarea' rows="3" cols="30" placeholder='Address' style={{marginLeft: '10px'}}/>
                        {/* <textarea onChange={updateApartmentDescription} type="text" className='aafieldarea' rows="3" cols="30" placeholder='Description' style={{marginLeft: '10px'}}/> */}
                        <textarea onChange={updateApartmentFeatures} type="text" className='aafieldarea' rows="3" cols="30" placeholder='Features' style={{marginLeft: '10px'}}/>
                    </div>
                    <span>
                        <input onChange={updateApartmentBeds} value={apartment.bed} type="number" className='aafield' placeholder='beds'/>
                        <input onChange={updateApartmentBaths} value={apartment.bath} type="number" className='aafield' placeholder='baths' style={{marginLeft: '10px'}}/>
                        <input onChange={updateApartmentPrice} value={apartment.price} type="number" className='aafield' placeholder='$$$$$' style={{marginLeft: '10px'}}/>
                    </span>
                    
                    
                    
                    <button onClick={addCurrentApartment} className='login'>
                        Add
                    </button>
                </div>
            </div>
        </>
    );
}

export { AddApartment };