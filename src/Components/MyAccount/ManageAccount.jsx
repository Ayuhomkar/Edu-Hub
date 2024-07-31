import React from 'react'
import { Link } from 'react-router-dom';



function ManageAccount() {
    return (
        <div className="flex h-screen">
          <div className="w-1/4 bg-white p-4">
            <div className="flex items-center space-x-2 mb-8">
              <i className="ri-home-line ri-lg text-green-600"></i>
              <span className="text-2xl font-bold text-green-600">EduHub</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                <i className="ri-book-line ri-lg"></i>
                <span>LEARN</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                <i className="ri-bar-chart-box-line ri-lg"></i>
                <span>LEADERBOARDS</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                <i className="ri-shopping-cart-line ri-lg"></i>
                <span>SHOP</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                <i className="ri-user-line ri-lg"></i>
                <span>PROFILE</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
                <i className="ri-more-2-line ri-lg"></i>
                <span>MORE</span>
              </div>
            </div>
          </div>
          <div className="flex-1 p-8 bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
            <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Personal Information</h2>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="JohnDoe88447"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="johndoe@example.com"
                    />
                  </div>
                </div>
              </div>
    
              <div>
                <h2 className="text-xl font-bold mb-2">Change Password</h2>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                      type="password"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="********"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                      type="password"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="********"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                      type="password"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="********"
                    />
                  </div>
                </div>
              </div>
    
              <div>
                <h2 className="text-xl font-bold mb-2">Social Accounts</h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <i className="ri-google-line ri-lg text-gray-700"></i>
                    <span>Connected to Google</span>
                    <button className="ml-auto text-blue-500 hover:underline">Disconnect</button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-facebook-line ri-lg text-gray-700"></i>
                    <span>Connected to Facebook</span>
                    <button className="ml-auto text-blue-500 hover:underline">Disconnect</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4 p-8 bg-gray-100">
          <div className="text-center mb-8 flex flex-col items-center gap-[5px]">
                    <img
                        src="https://picsum.photos/id/67/400/400"
                        alt="German Flag"
                        className="w-14 h-14 rounded-xl object-contain"
                    />
                    <div className="text-xl font-bold">JohnDoe88447</div>
                    <a href="#" className="text-blue-500 hover:underline">VIEW YOUR PROFILE</a>
                </div>
            <div className="space-y-4">
              <div className="cursor-pointer bg-gray-200 p-2 rounded">Account</div>
              <div className="cursor-pointer hover:bg-gray-200 p-2 rounded"><Link to="/MyAccount">Manage Courses</Link></div>
              <div className="cursor-pointer hover:bg-gray-200 p-2 rounded">Password</div>
              <div className="cursor-pointer hover:bg-gray-200 p-2 rounded">Notifications</div>
              <div className="cursor-pointer hover:bg-gray-200 p-2 rounded">Edit Daily Goal</div>
              <div className="cursor-pointer hover:bg-gray-200 p-2 rounded">Duolingo for Schools</div>
              <div className="cursor-pointer hover:bg-gray-200 p-2 rounded">Privacy</div>
            </div>
          </div>
        </div>
      );
}

export default ManageAccount