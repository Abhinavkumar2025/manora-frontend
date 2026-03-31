import React from 'react'
import './Lost_And_Found.css'
import Lost_Found_Report from '../../components/Lost_Found_Report/Lost_Found_Report'
import Lost_Stuff_Container from "../../components/Lost_Stuff_Container/Lost_Stuff_Container";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const Lost_And_Found = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mode, setMode] = useState("hero");

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/manora/report`);
      const data = await res.json();
      setReports(data);
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`main_div bg-fixed ${mode === "search" ? "no-stars" : ""}`}>
      <div className="relative h-screen overflow-hidden flex items-center justify-center">

        {/* HERO */}
        <div
          className={`background_report h-[80vh] md:h-[625px] w-[95%] max-w-[1350px] lg:w-[1350px] rounded-4xl bg-[#fbfbfb6f] flex flex-col items-center justify-center
      transition-all duration-700 ease-in-out ${mode !== "hero" ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}>
          <div className="flex flex-col items-center text-center px-4 w-full">
            <div>
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Don’t worry<br />You’re not alone
              </h1>
              <p className="text-white pt-4 text-sm sm:text-base md:text-lg max-w-lg mx-auto whitespace-pre-line">
                Report your lost item and increase the 
                chances of finding it with help from others
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto px-4 sm:px-0">
              <button
                onClick={() => setMode("report")}
                className="background_report_btn w-full sm:w-[270px] text-white py-3 sm:py-2 rounded font-semibold"
              >
                Report here
              </button>
              <button onClick={() => setMode("search")} type='submit' className='background_report_btn w-full sm:w-[270px] text-white py-3 sm:py-2 rounded hover:bg-gray-800 font-semibold'>Search here</button>
            </div>
          </div>
        </div>

        {/* REPORT SECTION */}
        <div className='background_report'>
          <div
            className={`background_report absolute inset-0 flex flex-col lg:flex-row items-center justify-center px-4 md:px-16 gap-8 lg:gap-32
        transition-all duration-700 ease-in-out overflow-y-auto pt-24 pb-20 lg:py-0
        ${mode === "report" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24 pointer-events-none"}
      `}
          >
            {/* LEFT TEXT */}
            <div className='glass p-6 md:p-12 w-full sm:w-auto'>
              <div className="w-full lg:w-[420px] report_section_left text-center lg:text-left">
                <h2 className="mb-2 md:mb-4 text-2xl md:text-3xl font-bold">Reporting is easy</h2>
                <p className="text-sm md:text-lg opacity-90">
                  Share the details you have-item name, location, description,and image.
                  Clear information helps connect lost items with the right people.
                </p>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="report_form w-full sm:w-[500px] lg:w-[400px] text-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] py-4 backdrop-blur-md">
              <h2 className="text-center font-bold text-xl p-2 pb-0">
                REPORT ITEM
              </h2>
              <Lost_Found_Report />
              <button onClick={() => setMode("hero")} className='flex items-center justify-center mx-auto rounded px-14 py-2 mt-4 bg-white/20 hover:bg-white/30 transition-colors w-3/4'>Go back</button>
            </div>
          </div>
        </div>
      </div>

      {/*Search Section */}
      <div className={`search_section h-full absolute inset-0 z-10 mt-18 transition-all duration-700 ease-in-out
        ${mode === "search" ? "opacity-100 translate-x-0 search_active" : "opacity-0 translate-x-24 pointer-events-none"}`}>
        <div className=" found_items relative min-h-screen lg:h-[770px] z-20 flex flex-col lg:flex-row justify-between overflow-y-auto lg:overflow-hidden bg-[#e0f1fc]">
          <div className='found_left_side w-full lg:w-[35%] h-auto pt-24 pb-12 lg:py-0 lg:h-[772px] bg-cover flex flex-col justify-start text-center items-center'>
            <div className="hanging_board lg:mt-16 mx-4">
              <div className='glass_2 p-6 lg:p-8'>
                <h2 className="font-bold title text-center text-gray-900 text-2xl lg:text-3xl mb-2">FOUND ITEMS</h2>
                <p className='text-lg lg:text-3xl text-gray-800 font-semibold'>Your lost item might be <br className="hidden lg:block"/> waiting right here</p>
              </div>
            </div>
          </div>
          <div className='found_right_side w-full lg:w-[65%] relative flex flex-col h-full lg:h-[770px]'>
            <div className='found_items_upper p-4 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 sticky top-0 z-30 bg-[#cbe7fa] shadow-sm'>
              <input type="text" placeholder=' Search here' value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} className='bg-white w-full sm:w-[400px] border border-gray-300 rounded px-4 py-2' />
              <button onClick={() => setMode("hero")} className='flex justify-center shrink-0 rounded bg-neutral-800 px-10 py-2 text-white hover:bg-gray-950 font-semibold'>Go back</button>
            </div>
            {/* <hr className='m-0' /> */}
            <div className='something flex-1'>
              <div className='blue_water overflow-y-auto h-full max-h-[800px] lg:max-h-[704px]'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 lg:p-6 pb-24">
                  {filteredReports.map(item => (
                    <Lost_Stuff_Container
                      key={item._id}
                      itemName={item.itemName}
                      location={item.location}
                      description={item.description}
                      reportType={item.reportType}
                      imageUrl={item.imageUrl}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lost_And_Found
