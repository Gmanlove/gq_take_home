import * as React from 'react';
import { useEffect, useState } from 'react';
import { getIncentives } from '@api/endpoints';
import { IncentiveForm } from './IncentiveForm';

const ResearcherApp = () => {
  const [couponCodes, setCouponCodes] = useState([]);
  const [newCode, setNewCode] = useState('');

  const handleAddCode = async () => {
    if (newCode.trim() !== '') {
      try {
        // Send a POST request to your Rails API to add a new coupon code
        const response = await fetch('/api/setup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set your desired content type
          },
          body: JSON.stringify({ code: newCode }), // Send the new code as JSON data
        });

        if (response.ok) {
          // If the request is successful, update the coupon codes list
          setCouponCodes([...couponCodes, newCode]);
          setNewCode('');
        } else {
          // If there's an error, handle it accordingly
          console.error('Failed to add code.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <h1>Researcher Setup</h1>
      <input
        type="text"
        value={newCode}
        onChange={(e) => setNewCode(e.target.value)}
      />
      <button onClick={handleAddCode}>Add Code</button>
      <ul>
        {couponCodes.map((code, index) => (
          <li
            key={index}
            className={couponIsRedeemed(code) ? 'redeemed' : 'not-redeemed'} // Apply different CSS classes based on redemption status
          >
            {code}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResearcherApp;
