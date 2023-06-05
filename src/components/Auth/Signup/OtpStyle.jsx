{/* OTP Modal */}
{isOTPOpen && (
    <div className="w-20">
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
          <button className=" -my-4 ml-2  text-red-600 " onClick={()=>setOTPOpen(false)}>{<ImCross/>}</button>
        </div>
        <input
          type="text"
          name="otp"
          {...formik.getFieldProps("otp")}
          className="border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Enter OTP"
        />
        <button
          onClick={handleOTPVerification}
          className="bg-blue-500 text-white rounded-md py-2 px-4 ml-3 mr-2"
        >
          Verify
        </button>
      </div>
    </div>
  </div>
           
   )}