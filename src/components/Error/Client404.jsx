import React from 'react'
import { useNavigate } from 'react-router-dom';
import NotFoundImage from "../../assets/gallery/404page.gif";
import {Button} from '@material-tailwind/react'
function Client404() {
    const navigate = useNavigate()
    return (
      <main className="min-h-screen max-w-screen-2xl mx-auto w-full flex flex-col justify-center items-center">
        
        <div className="w-full flex justify-center">
            <img src={NotFoundImage} alt="" />
        </div>
        <Button className='animate-pulse' variant='outlined'  onClick={() => navigate("/")}>
          go home
        </Button>
      </main>
    );
}

export default Client404
