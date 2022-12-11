import './index.css';
function ApartmentItem ({apartment, clickEvent}) {
    return(
            <div onClick={() => clickEvent(apartment)} className='appitem'>
                <div style={{display: 'flex', justifyContent:'space-between', padding: '10px'}}>
                    <div>
                        <h3 style={{fontSize: '30px'}}>{apartment.name}</h3>
                        <div style={{color: 'gray'}}>
                        {apartment.address}
                        </div>
                    </div>
                    <div>
                        <span style={{color: 'green'}}>${apartment.price}</span>
                    </div>
                </div>
                <div style={{paddingLeft: '10px'}}>
                    {apartment.bed} bed {apartment.bath} bath
                </div>
                
                <div style={{paddingLeft: '10px', fontStyle: 'italic', marginTop: '20px'}}>
                    {apartment.features}
                </div>
            </div>
        );
}

export {ApartmentItem};