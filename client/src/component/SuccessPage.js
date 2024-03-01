import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useLocation  } from 'react-router-dom';

function SuccessPage() {
  
    return (
      <div className='conainer feature ct1'>
      <div class="heading">
        <h1 className="secondary-heading">Payment Successful!</h1>
        <h3 className="font-only-heading">Your subscription has been updated. Thank you!</h3>
        <div class="separator"></div>
      </div>
      </div>
    );
  }
  
  export default SuccessPage;