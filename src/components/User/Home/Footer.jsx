import React from 'react'
import companyLogo  from '../../../assets/companyLogo.png'


function Footer() {
  return (
      <footer>
        <div className="p-10 mt-10  bg-gray-900  text-gray-200">
            <div className='grid justify-items-center mb-5 '>
                <img src={companyLogo} className='w-40' alt="" />
            </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2">
              <div className="mb-5">
                <h4 className="text-2xl pb-4">Eventos.</h4>
                <p className="text-gray-500">
                  A123 Lost street <br />
                  Chandigarh,PB 23425 <br />
                  india <br />
                  <br />
                  <strong>Phone:</strong>+1 232 2321 4543 <br />
                  <strong>Email:</strong>Eventos@gmail.com <br />
                </p>
              </div>
              <div className="mb-5">
                <h4 className="pb-4">Useful Links</h4>
                <ul className="text-gray-500">
                  <li className="pb-4 hover:text-blue-600">Home</li>
                  <li className="pb-4 hover:text-blue-600">Services</li>
                  <li className="pb-4 hover:text-blue-600">Terms of Services</li>
                  <li className="pb-4 hover:text-blue-600">Privacy Policy</li>
                </ul>
              </div>
              <div className="mb-5">
                <h4 className="pb-4">Our Services</h4>
                <ul className="text-gray-500">
                  <li className="pb-4 hover:text-blue-600">Wedding Events</li>
                  <li className="pb-4 hover:text-blue-600">BirthDay Parties</li>
                  <li className="pb-4 hover:text-blue-600">Reception Events</li>
                  <li className="pb-4 hover:text-blue-600">Tech Events</li>
                </ul>
              </div>
              <div className="mb-5">
                <h4 className="pb-4">Join Our Newsletter</h4>
                <p className="text-gray-500 pb-2">
                  Join 25,000+ others and never miss out on new tips, tutorials,
                  and more
                </p>
                <form>
                  <input className="text-gray-500 w-2/3 p-2 focus:border-blue-600" type="text" />
                  <button className="p-2 2-1/3 bg-blue-100 text-black hover:bg-gray-400">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-900 text-gray-500 px-10">
          <div>
            <div className="text-center">
              <div>
                Copyright <strong><span>Eventos</span></strong>. All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </footer>

  )
}

export default Footer
