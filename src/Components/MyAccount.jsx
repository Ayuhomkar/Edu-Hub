import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';



function MyAccount() {

    const [myCourses, setMyCourses] = useState(null);
    const { user } = useAuth0()
    useEffect(() => {
        async function getCartData() {
            const response = await axios.post("http://localhost:8000/cartData", { email: user.email });
            // console.log(response.data)
            const data = response.data[0];
            // console.log(data)
            if (data.courses) {
                console.log(data.courses.length);
                localStorage.setItem('cartNumber',data.courses.length)
                setMyCourses(data.courses);
                console.log("MyCourseList")
                console.log(myCourses);
            }
        }
        getCartData();
    }, [])


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
            <div className="flex-1 p-8 bg-gray-50 flex flex-col">
                <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>
                {myCourses && myCourses.map((obj) => {
                    return (
                        <div className="bg-white p-4 rounded-lg shadow-md mt-3 ">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <img
                                        src="https://flagcdn.com/w320/de.png"
                                        alt="German Flag"
                                        className="w-8 h-6"
                                    />
                                    <span>{obj.title}</span>
                                </div>
                                <div className='flex flex-row items-center gap-2'>
                                    <button className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-md duration-100">Reset</button>
                                    <button className="text-green-500 hover:text-white hover:bg-green-500 p-2 rounded-md duration-100">View</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="w-1/4 p-8 bg-gray-100">
                <div className="text-center mb-8 flex flex-col items-center gap-[5px]">
                    <img
                        src={`${user.picture || 'https://picsum.photos/id/67/400/400'}`}
                        alt="German Flag"
                        className="w-14 h-14 rounded-xl object-contain"
                    />
                    <div className="text-xl font-bold">{user.name}</div>
                    <a href="#" className="text-blue-500 hover:underline">VIEW YOUR PROFILE</a>
                </div>
                <div className="space-y-4">
                    <div className="cursor-pointer hover:bg-gray-200 p-2 rounded"><Link to='/UpdateMyAccount'>Account</Link></div>
                    <div className="cursor-pointer bg-gray-200 p-2 rounded">Manage Courses</div>
                    <div className="cursor-pointer hover:bg-gray-200 p-2 rounded">Password</div>
                    <div className="cursor-pointer hover:bg-gray-200 p-2 rounded">Notifications</div>
                    <div className="cursor-pointer hover:bg-gray-200 p-2 rounded">Edit Daily Goal</div>
                    <div className="cursor-pointer hover:bg-gray-200 p-2 rounded">EduHub for Schools</div>
                    <div className="cursor-pointer hover:bg-gray-200 p-2 rounded">Privacy</div>
                </div>
            </div>
        </div>
    );
}

export default MyAccount