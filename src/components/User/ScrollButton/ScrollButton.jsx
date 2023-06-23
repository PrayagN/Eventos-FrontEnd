import React,{useState,useEffect} from 'react'

import { FaArrowUp } from 'react-icons/fa';
function ScrollButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    return (
        <>
     <button
      className={`fixed bottom-4 right-4 p-3 rounded-full bg-blue-500 text-white ${
          showButton ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        onClick={scrollToTop}
        >
      <FaArrowUp />
    </button>
        </>
    );
}

export default ScrollButton
