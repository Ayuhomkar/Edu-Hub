import React, { useEffect, useState } from 'react'
import axios from 'axios';



function WatchCourse() {
    const [courseInfo, setcourseInfo] = useState(null);
    const source = 'E:\BE_SEM-1\Project\eduhub_project\eduhub_remastered\src\course_1.mp4';
    const chapters = ['Introduction to the Subject','Fundamental Concepts','Core Skills and Techniques','Advanced Topics and Techniques','Practical Applications','Tools and Technologies','Best Practices and Standards','Problem Solving and Troubleshooting','Project Development and Implementation','Future Trends and Opportunities']
    useEffect(() => {
        async function getData() {
            try {
                const rowdata = localStorage.getItem('courseData');
                const data = JSON.parse(rowdata);
                console.log(data.title);
                setcourseInfo(data);
                console.log(courseInfo)
            } catch (error) {
                console.log("Getting Error while collecting course info", error)
            }
        }
        getData();
    }, [])

    useEffect(()=>{
        async function getVideo(){
            const response = axios.get()
        }
    })




    return (
        <div className=' relative w-full h-fit flex flex-row items-start bg-slate-200'>
            <div className="videocontainer relative w-full h-fit flex-[4]">
                <video class="h-full w-full rounded-sm" controls >
                    <source
                        src="https://docs.material-tailwind.com/demo.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <div className="courseInfo relative w-full h-fit flex flex-col p-4 gap-4">
                    {courseInfo &&
                        <>
                            <h1 className=' relative text-2xl font-bold'><i class="ri-global-line mx-2"></i>{courseInfo.title}</h1>
                            <h3 className='relative text-xl font-medium'><i class="ri-terminal-box-line mx-2"></i>{courseInfo.courseDesc}</h3>
                            <h3 className='relative text-xl font-medium'><i class="ri-presentation-fill mx-2"></i><b>Instructor</b> : {courseInfo.instructor}</h3>
                            <div className='relative w-full h-fit flex flex-row items-center px-6 gap-8'>
                                <h3 className='relative text-xl font-medium text-yellow-600'>
                                    {Array(Math.floor(courseInfo.courseRating)).fill().map((_, index) => (
                                        <i key={index} className="ri-star-fill text-yellow-600"></i>
                                    ))}
                                    {courseInfo.courseRating % 1 !== 0 && <i className="ri-star-half-line text-yellow-600"></i>}
                                    {Array(5 - Math.ceil(courseInfo.courseRating)).fill().map((_, index) => (
                                        <i key={index + Math.floor(courseInfo.courseRating)} className="ri-star-line"></i>
                                    ))}{courseInfo.courseRating}/5</h3>

                                <i class="ri-global-line text-xl flex flex-row"><h3 className='mx-1 text-lg'>English</h3></i>
                            </div>
                        </>}
                </div>
            </div>
            <div className="videocontainer relative w-full h-[100vh] flex-[1] flex-col p-2 items-center">
                <h1 className=' relative text-2xl font-bold '>Chapters</h1>
                <div className='chapterNames w-full h-fit flex flex-col items-start gap-2'>
                    {chapters && chapters.map((obj)=>{
                    return(
                       <h3 className='relative text-md my-2 shadow-md w-full h-14 font-normal text-center border-4 border-gray-600 rounded-lg flex flex-row items-center justify-center hover:bg-gray-600 hover:text-white'>{obj}</h3> 
                    )})}
                </div>
            </div>

        </div>
    )
}

export default WatchCourse