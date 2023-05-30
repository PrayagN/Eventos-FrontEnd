import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import firebase from 'firebase/app';
import { auth } from "../../../firebase";  
import { useLocation } from 'react-router-dom';

const OTPVerificationPage = () => {
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();
    const location = useLocation()
    const { formData, confirmationResult } = location.state;
    console.log({formData},'asdfasdf');
    console.log({confirmationResult},'sdafsfd');
  const handleOTPVerification = () => {
    const confirmationResult = JSON.parse(localStorage.getItem('confirmationResult'));
    const code = otp;
    
    firebase
      .auth()
      .signInWithCredential(firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code))
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
        // Redirect to desired page after successful OTP verification
        navigate('/signin');
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // Handle the error, display error message, or take appropriate action
        console.log('Error verifying OTP:', error);
      });
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <input type="text-" className='text-red-600' value={otp} onChange={(e) => setOTP(e.target.value)} />
      <button onClick={handleOTPVerification}>Verify OTP</button>
    </div>
  );
};

export default OTPVerificationPage;
