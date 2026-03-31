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

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 overflow-y-auto py-8 md:py-0 w-full pt-12 md:pt-0">
        <h1 className="intro-title-1 text-white text-center">Discover Amazing</h1>
        <h2 className="intro-title-2 text-center" >Destinations</h2>
        <div className="max-w-3xl px-4 mt-4 mb-8">
          <p className='text-white text-base sm:text-lg md:text-xl lg:text-2xl text-center leading-relaxed'>Share your travel experiences and get an opportunity to win free tickets on next trip,</p>
          <p className='text-white text-base sm:text-lg md:text-xl lg:text-2xl text-center leading-relaxed mt-2'>Recover items lost during your trip with our lost-and-found.</p>
        </div>
        <div className='feature-boxes flex flex-col md:flex-row justify-center md:justify-around items-center gap-6 md:gap-4 w-full px-6 max-w-6xl mx-auto pb-10 md:pb-0'>
          <Link to="/lost-and-found" className='block w-full sm:w-3/4 md:w-1/3'><Box img={img1} h3={"Lost & Found"} p={"Lost something? Let’s get it back where it belongs"} /></Link> 
          <Link to="/manora/gallery" className='block w-full sm:w-3/4 md:w-1/3'><Box img={img2} h3={"Photo Gallery"} p={"Collect your journeys. Relive them anytime"} /></Link>
          <div onClick={() => alert("This feature is currently not available")} className='block w-full sm:w-3/4 md:w-1/3 cursor-pointer'><Box img={img3} h3={"Places"} p={"Every corner of Jharkhand has a tale to tell Come visit, live the story"} /></div>
        </div>
      </div>
      
    </div>


  )
}

export default Home
