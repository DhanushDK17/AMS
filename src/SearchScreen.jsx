import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import image from ".src/pictures/searchPicture.png";
import DropdownButton from 'react-bootstrap/DropdownButton';


function SearchScreen() {
    return(
      <div>
          <h3 style={{
                display: "flex",
                backgroundColor: "white", 
                padding: "20px 80px"
              }}>
                Find Your Future Home! 
          </h3>
          
          <div> 
          <Dropdown>
            <Dropdown.Toggle
                 id="StateButton"
                 variant="primary"
              >
              State
            </Dropdown.Toggle>

              <Dropdown.Menu>
                State
               <Dropdown.Item href="1"> Alabama </Dropdown.Item>
               <Dropdown.Item href="2"> Arkansas </Dropdown.Item>

             </Dropdown.Menu>
           </Dropdown>

            
           </div>
          

      </div>

        
    );
}

export { SearchScreen };