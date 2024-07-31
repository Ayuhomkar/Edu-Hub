import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Alert from '@mui/material/Alert';
// import CheckIcon from '@mui/icons-material/Check';

function Courses() {
  const { user, isAuthenticated } = useAuth0()
  const navigate = useNavigate()
  const [filterSearch, setfilterSearch] = useState('');
  const [getCourses, setCourses] = useState(null);
  const [getCourseImages, setgetCourseImages] = useState([]);
  const [loading, setloading] = useState(false);
  const [getAlert, setAlert] = useState(false)
  const apiKey = '44080195-c1425845d29c0dda8a633855e';
  const imgArray = []
  const [cartNumber , setCartNumber] = useState(0)

  useEffect(() => {
    async function getCourses() {
      const rowData = await axios.get('http://localhost:8000/get/courses');
      const data = await rowData.data;
      setCourses(data);
      console.log(data);
      await data.map(async (obj, index) => {
        const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${obj.subject}&image_type=photo&pretty=true`);
        const rowData = await response.data.hits;
        const imgUrl = await rowData.map((obj) => { return obj.largeImageURL });
        imgArray.push(imgUrl[0])
        // setgetCourseImages(()=>[imgUrl[0]])

        if (data.length === imgArray.length) {
          setloading(true);
          console.log(imgArray);
          setgetCourseImages(imgArray)
        }
      })
    }
    getCourses();

  }, [])

  function goToCourse(title, img, courseDesc, coursePrice, courseRating, subject, instructor) {
    if (isAuthenticated) {
      const courseData = { title, courseDesc, coursePrice, img, courseRating, subject, instructor }
      localStorage.setItem('courseData', JSON.stringify(courseData));
      navigate(`/Courses/${title}`)
    }
    else {
      alert('login / signup first')
    }
  }


  async function addtocart(obj) {
    if (isAuthenticated) {
      try {
        const email = user.email;
        const newObj = {
          ...obj,
          userEmail: email
        }
        // console.log(newObj)
        // setCartNumber((prev)=>{prev+1})
        localStorage.setItem('cartNumber',cartNumber)
        const response = await axios.post('http://localhost:8000/addToCart', newObj);
        const res = response.data;
        console.log(res);
        setAlert(true);
        setTimeout(()=>{setAlert(false)},2000)
      } catch (error) {
        console.log("Error Getting Details")
      }

    }
    else {
      alert('Login / Signup first');
    }
  }



  return (
    <div className='courses-page'>
      {getAlert &&
        <Alert variant="filled" severity="success" className='sticky top-[15vh] z-20' >
          Course Added To Cart
          {/* {setAlert(false)} */}
        </Alert>
      }
      <div className="first">
        <h1>Explore Our Wide Range Of Courses </h1>
        <div className="searchBox">
          <input className="searchInput" type="text" name="" placeholder="Search something" id='filterCourse' value={filterSearch} onChange={(e) => setfilterSearch(e.target.value)} />
          <button className="searchButton" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
              <g clipPath="url(#clip0_2_17)">
                <g filter="url(#filter0_d_2_17)">
                  <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" shapeRendering="crispEdges"></path>
                </g>
              </g>
              <defs>
                <filter id="filter0_d_2_17" x="-0.418549" y="3.70435" width="29.7139" height="29.7139" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                  <feOffset dy="4"></feOffset>
                  <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_17"></feBlend>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_17" result="shape"></feBlend>
                </filter>
                <clipPath id="clip0_2_17">
                  <rect width="28.0702" height="28.0702" fill="white" transform="translate(0.403503 0.526367)"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="course-div">

          {getCourses && getCourseImages && loading ? getCourses.filter((obj) =>
            obj.title.toLowerCase().includes(filterSearch.toLowerCase())).map((obj, index) => {
              return (
                <div className="course-card" key={obj._id}>
                  <img src={getCourseImages[index]} alt={obj.subject} key={obj._id} />
                  <div className='course-info'>
                    <h3>{obj.level}</h3>
                    <h1>{obj.title}</h1>
                    <p >{obj.desc}</p>
                    <div className='stars'>
                      {Array(Math.floor(obj.rating)).fill().map((_, index) => (
                        <i key={index} className="ri-star-fill"></i>
                      ))}
                      {obj.rating % 1 !== 0 && <i className="ri-star-half-line"></i>}
                      {Array(5 - Math.ceil(obj.rating)).fill().map((_, index) => (
                        <i key={index + Math.floor(obj.rating)} className="ri-star-line"></i>
                      ))}
                      <h3>{obj.rating} ratings</h3>
                    </div>
                    <h1><span> Rs {obj.price}</span></h1>
                    <button className='addtocart' onClick={() => { goToCourse(obj.title, getCourseImages[index], obj.desc, obj.price, obj.rating, obj.subject, obj.instructor) }}>Enroll Now</button>
                    <i class="ri-shopping-cart-2-line absolute right-28 bottom-1 text-2xl bg-red-100 text-red-900 cursor-pointer p-2 rounded-lg hover:scale-105 hover:text-green-100 hover:bg-green-900 duration-200" id='addToCart' onClick={() => { addtocart(obj);setCartNumber(cartNumber+1) }}></i>
                  </div>
                </div>
              )
            }) : null}


        </div>
      </div>
    </div>
  )
}

export default Courses