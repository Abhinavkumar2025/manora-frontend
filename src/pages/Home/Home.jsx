import React from 'react'
import Slider from '../../components/Slider/Slider'
import './Home.css'
import Box from '../../components/box-page/Box'
import img1 from '../../assets/images/lost_found_search_icon.png'
import img2 from '../../assets/images/photo_contest_icon.png'
import img3 from '../../assets/images/location_icon.png'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative h-[90vh] overflow-hidden">
      <Slider />   {/* background slideshow */}

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <h1 className="intro-title-1 text-white ">Discover Amazing</h1>
        <h2 className="intro-title-2 " >Destinations</h2>
        <p className='text-white text-2xl'>Share your travel experiences and get an opportunity to win free tickets on next trip,</p>
        <p className='text-white text-2xl'>Recover items lost during your trip with our lost-and-found.</p>
        <div className='feature-boxes flex justify-around items-center mt-5'>
          <Link to="/lost-and-found" className='block w-1/4'><Box img={img1} h3={"Lost & Found"} p={"Lost something? Let’s get it back where it belongs"} /></Link> 
          <Link to="/manora/gallery" className='block w-1/4'><Box img={img2} h3={"Photo Gallery"} p={"Collect your journeys. Relive them anytime"} /></Link>
          <Link to="" className='block w-1/4'><Box img={img3} h3={"Places"} p={"Every corner of Jharkhand has a tale to tell Come visit, live the story"} /></Link>
        </div>
      </div>
      
    </div>


  )
}

export default Home
