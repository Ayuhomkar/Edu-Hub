import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';



function MyCart() {

    const [myCourses, setMyCourses] = useState(null);
    const { user } = useAuth0()
    const [trigger, setTrigger] = useState(false); 
    const [getTotal , setTotal] = useState(0)



    const deleteCartItem = async (id) =>{
        const title = id;
        const email = user.email
        try {
            const response = await axios.post('http://localhost:8000/deleteCartItem',{title,email})
            setTotal(0)
            setTrigger(!trigger);
        } catch (error) {
            console.log(error)
        }
    }




    useEffect(() => {
        async function getCartData() {
            const response = await axios.post("http://localhost:8000/cartData", { email: user.email });
            // console.log(response.data)
            const data = response.data[0];
            // console.log(data)
            if (data.courses) {
                console.log(data.courses.length);
                localStorage.setItem('cartNumber', data.courses.length)
                setMyCourses(data.courses);
                // data.courses.map((obj)=>{
                //     setTotal((prev)=>prev+obj.price)
                // })
                console.log("MyCourseList")
                console.log(myCourses);
            }
        }
        getCartData();
    }, [trigger])

    useEffect(()=>{
        setTotal(0);
        myCourses && myCourses.map((obj)=>{
            setTotal((prev)=>prev+obj.price)
        })
    },[myCourses])




    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Cart</h1>
                <div className="border-b border-gray-200 mb-6"></div>
                <div className="space-y-6">
                    {/** Cart Items */}
                    
                    {myCourses && myCourses.map((obj) => {
                        return (
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold">{obj.title}</h2>
                                    <p className="text-gray-500 w-[80%]">{obj.desc}.</p>
                                </div>
                                <div className="text-right w-[20%] flex flex-col items-right">
                                    <span className="text-xl ">INR ₹. {obj.price}</span>
                                    <button className="block text-blue-500 mt-2 text-right " onClick={()=>{deleteCartItem(obj.title)}}>Remove</button>
                                </div>
                            </div>
                        )
                    })}
                    {/* <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Push</h2>
                            <p className="text-gray-500">Sample, play melodies and chords, make beats, trigger loops and clips.</p>
                            <p className="text-green-500 font-semibold">Free shipping</p>
                            <p className="text-gray-500">Products in stock will typically be delivered in 1 to 6 work days.</p>
                        </div>
                        <div className="text-right">
                            <span className="text-xl">USD 799</span>
                            <button className="block text-blue-500 mt-2">Remove</button>
                        </div>
                    </div> */}
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6">
                    <p className="text-yellow-600 font-semibold">New</p>
                    <p>Pay in up to 6 monthly installments of 266.20 with no additional fees. <a href="#" className="text-blue-500">Learn more</a></p>
                </div>
                <div className="flex justify-between items-center mt-6">
                    <h2 className="text-xl font-bold">Total</h2>
                    <div className="text-right">
                        <span className="text-2xl">INR ₹. {getTotal}</span>
                        <p className="text-red-500">You save a total of INR ₹. 100.00</p>
                    </div>
                </div>
                <button className="w-full bg-blue-500 text-white py-3 mt-6">Proceed to Checkout</button>
                <div className="mt-6">
                    <a href="#" className="text-blue-500">Enter coupon code</a>
                </div>
            </main>

        </div>
    )
}

export default MyCart