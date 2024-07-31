import React,{useState , useEffect} from 'react'
import '../index.css';
function Cursor() {

    const cur =  {
        "pointerEvents": 'none',
        'position': 'fixed',
        'display': 'block',
        'borderRadius': '0',
        'mixBlendMode': 'difference',
        'top:': '0',
        'left': '0',
        'zIndex': '99999999999999'
      }
      
     const cir = {
        "position": "absolute",
        "display": "block",
        "width": "1.2vmax",
        "height": "1.2vmax",
        "borderRadius": "20px",
        "backgroundColor": "#fff"
      }





    const [isDomRendered, setIsDomRendered] = useState(false);
    useEffect(() => {
        setIsDomRendered(true);
    },[]);

    if(isDomRendered){
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    const cursor = document.querySelector(".cursor");

    circles.forEach(function (circle, index) {
        circle.x = 0;
        circle.y = 0;
        circle.style.backgroundColor = "white";
        // circle.style.zIndex = 999999999;
    });

    window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        cursor.style.top = x;
        cursor.style.left = y;

        circles.forEach(function (circle, index) {
            circle.style.left = x - 12 + "px";
            circle.style.top = y - 12 + "px";

            circle.style.scale = (circles.length - index) / circles.length;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();

}


    return (
        <div className="cursor" style={cur}>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
            <div className="circle" style={cir}></div>
        </div>
    )
}

export default Cursor