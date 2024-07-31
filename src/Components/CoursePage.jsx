import React, { useEffect, useState } from 'react'

import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom';


function CoursePage() {
    const [couese, setCourse] = useState();
    const navigate = useNavigate();
    const [whatYouWillLearn, setWhatYouWillLearn] = useState([
        'Learn to program with one of the most powerful programming languages that exists today, C++.',
        'Learn Modern C++ rather than an obsolete version of C++ that most other courses teach',
        'Learn C++ using a proven curriculum that covers more material than most C++ university courses',
        'Includes Quizzes, Live Coding Exercises, Challenge Coding Exercises and Assignments',
        'New Section: Learn all about using C++ Lambda Expressions',
        'Obtain the key concepts of programming that will also apply to other programming languages',
        'Learn C++ features from basic to more advanced such as inheritance and polymorphic functions',
        'Learn C++ from an experienced university full professor who has been using and teaching C++ for more than 25 years',
    ]);

    const [open, setOpen] = useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    function Icon({ id, open }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        );
    }

    function watchCourse (title){
        navigate(`/Courses/watch/${title}`)
    }

    useEffect(() => {
        const rowdata = localStorage.getItem('courseData')
        const data = JSON.parse(rowdata);
        console.log(data);
        setCourse(data);
        // getRatings();
    }, [])

    return (
        <div className='CoursePage' >
            {couese && <div className="top">
                <div className="right">
                    <h2>{couese.title}</h2>
                    <h4 >{couese.subject}</h4>
                    <h4 >{couese.courseDesc}</h4>
                    <div className="rating"><h3>
                        {Array(Math.floor(couese.courseRating)).fill().map((_, index) => (
                            <i key={index} className="ri-star-fill"></i>
                        ))}
                        {couese.courseRating % 1 !== 0 && <i className="ri-star-half-line"></i>}
                        {Array(5 - Math.ceil(couese.courseRating)).fill().map((_, index) => (
                            <i key={index + Math.floor(couese.courseRating)} className="ri-star-line"></i>
                        ))}{couese.courseRating}/5</h3></div>
                    <h4 style={{ backgroundColor: 'rgba(255, 255, 158,0.7)', color: 'black', padding: '0 20px 0 10px', width: 'max-content', borderRadius: '5px' }}>Instructor : {couese.instructor}</h4>
                    <button className='button-89' onClick={()=>{watchCourse(couese.title)}}>Enroll Now</button>
                </div>
                <div className="left">
                    <img src={couese.img} alt="" />
                </div>
            </div>}

            <div className="detailedDesc">
                <h3>What you'll learn ?</h3>
                <div className="learn bg-red-400">
                    {whatYouWillLearn.map((ele) => {
                        return <h3 className='text-sm w-[60%] tracking-normal font-light'><i class="ri-terminal-line" style={{ margin: '5px', fontWeight: '700' }}></i>{ele}</h3>
                    })}
                </div>
            </div>

            <div className="chapters flex flex-col items-start justify-start w-full ml-5">
                <h2 className="text-2xl font-bold mb-4">Course Chapters</h2>
                <Accordion open={open === 1} icon={<Icon id={1} open={open} className='accordion' />}>
                    <AccordionHeader onClick={() => handleOpen(1)} className='accordion-header'>What is Material Tailwind?</AccordionHeader>
                    <AccordionBody className='accordion-body'>
                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                        ourselves and actualize our dreams.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2} icon={<Icon id={2} open={open} className='accordion' />}>
                    <AccordionHeader onClick={() => handleOpen(2)} className='accordion-header'>
                        How to use Material Tailwind?
                    </AccordionHeader>
                    <AccordionBody className='accordion-body'>
                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                        ourselves and actualize our dreams.
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3} icon={<Icon id={3} open={open} />} className='accordion'>
                    <AccordionHeader onClick={() => handleOpen(3)} className='accordion-header'>
                        What can I do with Material Tailwind?
                    </AccordionHeader>
                    <AccordionBody className='accordion-body'>
                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                        ourselves and actualize our dreams.
                    </AccordionBody>
                </Accordion>
            </div>

            <div className="courseInclude relative w-[100%] h-[50vh] bg-white flex flex-col items-start p-10">
                <h2 className='text-3xl font-bold tracking-[2px]'>This course Includes :</h2>
                <div className="includeDesc relative m-4 w-[70%] h-full  flex flex-row flex-wrap p-10 justify-start bg-green-100 border-2 rounded-lg gap-2">
                    <h4 className='text-lg w-[40%] font-semibold'><i class="ri-youtube-line"></i> 25.5 hours on-demand video</h4>
                    <h4 className='text-lg w-[40%] font-semibold'><i class="ri-file-3-line"></i> 1 article</h4>
                    <h4 className='text-lg w-[40%] font-semibold'><i class="ri-folder-download-line"></i> 23 downloadable resources</h4>
                    <h4 className='text-lg w-[40%] font-semibold'><i class="ri-smartphone-line"></i> Access on mobile and TV</h4>
                    <h4 className='text-lg w-[40%] font-semibold'><i class="ri-trophy-line"></i> Certificate of completion</h4>
                </div>
            </div>
        </div>
    )
}

export default CoursePage