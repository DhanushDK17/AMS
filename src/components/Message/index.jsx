export function Message ({ message,  }) {
    return <div style={{width: '100%', height: '100px', padding: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <div style={{ width: '40px', height: '40px', backgroundColor: 'white', color: 'black', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '800'} }>{message.displayName[0]}</div>
        <span style={{marginLeft: '15px'}}>{message.text}</span>
    </div>;
}