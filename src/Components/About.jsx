import React, { useEffect, useState } from 'react';
// import './about.css';
// import axios from 'axios';
import cchos from './assets/chaos.svg';


function About() {


  

  return (
    <div className='about-main'>
      <div className="first">
        <h1>We believe that learning and fun can and should go together. With personalized active teaching methodologies to engage multitasking minds.
        </h1>
      </div>

      <div className="second">
        <div className="s-left">
          <h2>Aligned by Purpose</h2>
          <h4>
            Our mission in the world is to share knowledge that can create awareness and generate positive changes in a person's life and those around them.

            We work to do this in a true way, translating the world's great transformations into small doses of content, in a simple, empathetic and charming way.

            Adaptation, protagonism, trust and transparency are the preface to our history. And we believe that these values ​​generate sustainability in relationships
          </h4>
        </div>
        <div className="s-right">
          <img src="https://picsum.photos/3840/2160" alt="" />
        </div>
      </div>

      <div className="third">
        <div className="t-left">
          <img src={cchos} alt="" />
        </div>
        <div className="t-right">
          <h2>A multidisciplinary team</h2>
          <h4>Visual and Product Designers, Conversation Designers and Copywriters, Project and Service Managers, IT Professionals, Data Scientists, a complete team to make the user experience even better. <br /> To develop quality interactive content, we count on the support of psychologists, nutritionists, journalists, actors, filmmakers and researchers from different areas.</h4>
        </div>
      </div>

      <div className="four">
        <h2>Reinvent digital learning with us !</h2>
        <h4>Here, we believe that the desire to learn and contribute to the world is the most important thing. We value diversity and understand that people have multiple talents and capabilities. Transparency, innovation and adaptability guide our way of working and make everyday life a space of harmony and collaboration.</h4>

        <button className="button-89">Join Our Team</button>
      </div>
    </div>
  )
}

export default About
