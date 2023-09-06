import * as React from 'react';
import { useEffect, useState } from 'react';
import { getIncentives } from '@api/endpoints';
import { Redeem } from './Redeem';

const CandidateApp = () => {
  const [redeemedCodes, setRedeemedCodes] = useState([]);
  const [currentCode, setCurrentCode] = useState('');
  const [redeemedMessage, setRedeemedMessage] = useState('');

  const handleRedeemCode = async () => {
    // Check if the code has already been redeemed
    if (!redeemedCodes.includes(currentCode)) {
      try {
        // Send a POST request to your Rails API to redeem the coupon code
        const response = await fetch('/api/redeem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set your desired content type
          },
          body: JSON.stringify({ code: currentCode }), // Send the coupon code as JSON data
        });

        if (response.ok) {
          // If the request is successful, mark the code as redeemed
          setRedeemedCodes([...redeemedCodes, currentCode]);
          setCurrentCode('');
          setRedeemedMessage('Code redeemed successfully.');
        } else {
          // If there's an error, handle it accordingly
          console.error('Failed to redeem code.');
          setRedeemedMessage('Failed to redeem code.');
        }
      } catch (error) {
        console.error('Error:', error);
        setRedeemedMessage('An error occurred.');
      }
    } else {
      setRedeemedMessage('Code already redeemed.');
    }
  };

  return (
    <div>
      <h1>Candidate Redeem</h1>
      <input
        type="text"
        value={currentCode}
        onChange={(e) => setCurrentCode(e.target.value)}
      />
      <button onClick={handleRedeemCode}>Redeem</button>
      {redeemedMessage && <p>{redeemedMessage}</p>}
      {couponIsRedeemed(currentCode) && (
        <p className="redeemed-text">Code already redeemed.</p> // Apply different styles for redeemed code
      )}
    </div>
  );
};

export default CandidateApp;
