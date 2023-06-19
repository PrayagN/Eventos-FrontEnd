import React, { useState, useEffect } from "react";
import { checkoutPayment } from "../../../Services/userApi";
import { BiRupee } from "react-icons/bi";
function Checkout({ status, values }) {
  const [checkoutModal, setCheckoutModal] = useState(false);
  useEffect(() => {
    setCheckoutModal(status);
  }, [status]);

  const closeModal = () => {
    setCheckoutModal(false);
  };
  console.log(values,'values');
  const handleSubmit = () => {
    checkoutPayment(values)
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  const date = values.selectedDate;
  const formattedDate = date.toLocaleDateString("en-GB");
  
  return (
    <div className="relative">
      {checkoutModal && (
        <div className=" fixed inset-0 bg-black bg-opacity-25  flex justify-center items-center">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between border-b-2 p-4">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-4 text-black">
              <h5 className="text-xl font-bold mb-5  text-black">
                Booking summery
              </h5>
              {/* <h4 className="text-2xl mb-5 ">
                        Thanks for your order
                      </h4>
                      <p className="mb-2 font-semibold">
                        Payment summary
                      </p> */}
              <hr className="my-2 border-t-2 border-dashed border-gray-400" />
              <div className="flex justify-between">
                <p className="font-bold mb-2">Event Date</p>
                <p className="text-blue-600 mb-2">{formattedDate}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm mb-2 font-medium">Guests</p>
                <p className="text-sm mb-2 font-arimo">{values.guests}</p>
              </div>
              <div className="flex justify-between pb-1">
                <p className="text-sm">TotalAmount</p>
                <p className="text-sm flex items-center font-medium">
                  <BiRupee className="mr-1" />
                  {values.budget * values.guests}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Advance Amount</p>
                <p className="font-bold flex items-center ">
                <BiRupee className="mr-1" />
                  {values.budget * values.guests * values.advance/100}
                </p>
              </div>
            </div>
            <div className="flex justify-center border-t-2 py-4">
              <button
                className="bg-blue-600 text-white rounded-lg py-3 px-4 text-lg font-semibold"
                onClick={handleSubmit}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
