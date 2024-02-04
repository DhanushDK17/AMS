import { logEvent, getAnalytics } from 'firebase/analytics';
import './style.css';

function Listing({data, onclickEvent, viewSetter}) {
    const features = (featuresData) => {
        return featuresData.map(feature => <div key={feature} className='featureitem'>{feature.replace(']','').replace('[','').replace("'",'').replace("'",'')}</div>)
    };
    const analytics = getAnalytics();
    const apartments = data.map((apartment) => <div onClick={() => {
        logEvent(analytics, 'apartmentviewed', {
            name: apartment.name
        });
        onclickEvent(apartment); viewSetter('appdetails')
        }} key={apartment.name} className="listitem">
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div style={{borderRight: '1px solid gray', paddingRight: '20px',width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div>
                    <h2 style={{fontSize: '40px'}}>{apartment.name}</h2>
                </div>
                <div>
                    <h4 style={{color: 'gray'}}><i>{apartment.address}</i></h4>
                </div>
            </div>
            <div style={{width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center',borderRight: '1px solid gray'}}>
                <span style={{fontSize: '30px', textAlign: 'center'}}>{apartment.bed} bed {apartment.bath} bath</span>
            </div>
            <div style={{width: '25%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <span style={{fontSize: '30px',color: 'green'}}>${apartment.price}</span>
            </div>
        </div>
        {apartment.features ? <div style={{display: 'flex', marginTop: '10px', width: '100%', flexWrap: 'wrap'}}>
            {
            features(apartment.features.split(','))
            }
        </div>: ''}
    </div>);
    
    return (<>
    <div style={{height: '100%', overflowY: 'scroll',overflowX: 'hidden', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
        {apartments}
    </div>
    </>);
}
export { Listing }