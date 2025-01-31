import React from 'react';
import '../../../../../cartCheckout/pages/successOrder/orderComplete.css';
import { useNavigate } from 'react-router-dom';
import ordercompleteimg from '../../../../../../asset/tick.png';

const SucessReturn = () => {
    const navigate=useNavigate();
  return (
    <div className="ordercomplete-container">
      
      <div className="ordercomplete-content">
        <div className="ordercomplete-checkmark">
        
            <span><img style={{height:"100px",width:"100px" }} src={ordercompleteimg} alt='ordercompletetick'/></span>
          
        </div>
        <h2>Your Return is complete!</h2>
        <p>You will be receiving a confirmation email with return details.</p>
        <button className="ordercomplete-button" onClick={()=>{navigate("/",{replace:true})}}>Go to the Home Page</button>
      </div>
    </div>
  );
};

export default SucessReturn;