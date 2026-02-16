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
      const res = await fetch("http://localhost:5000/manora/report");
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
          className={`background_report h-[625px] w-[1350px] rounded-4xl bg-[#fbfbfb6f]
      transition-all duration-700 ease-in-out ${mode !== "hero" ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}>
          <div className="flex flex-col items-center text-center pt-32">
            <div>
              <h1 className="text-white heading-1">
                Don’t worry<br />You’re not alone
              </h1>
              <p className="text-white sub-heading-1 pt-4">
                Report your lost item and increase the <br />
                chances of finding it with help from others
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setMode("report")}
                className="background_report_btn w-[270px] text-white py-2 rounded"
              >
                Report here
              </button>
              <button onClick={() => setMode("search")} type='submit' className='background_report_btn w-[270px] text-white py-2 rounded hover:bg-gray-800'>Search here</button>
            </div>
          </div>
        </div>

        {/* REPORT SECTION */}
        <div className='background_report'>
          <div
            className={`background_report absolute inset-0 flex items-center justify-center px-16 gap-96
        transition-all duration-700 ease-in-out
        ${mode === "report" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-24 pointer-events-none"}
      `}
          >
            {/* LEFT TEXT */}
            <div className='glass p-12'>
              <div className="w-[420px] report_section_left">
                <h2 className=" mb-4">Reporting is easy</h2>
                <p className="text-lg opacity-90">
                  Share the details you have-item name, location, description,and image.
                  Clear information helps connect lost items with the right people.
                </p>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="report_form w-[400px] text-white rounded-xl shadow-white-xl/30 py-2">
              <h2 className="text-center font-bold text-xl p-4">
                REPORT ITEM
              </h2>
              <Lost_Found_Report />
              <button onClick={() => setMode("hero")} className='flex items-center mx-auto rounded px-14 py-1 my-2'>Go back</button>
            </div>
          </div>
        </div>
      </div>

      {/*Search Section */}
      <div className={`search_section h-full absolute inset-0 z-10 mt-18 transition-all duration-700 ease-in-out
        ${mode === "search" ? "opacity-100 translate-x-0 search_active" : "opacity-0 translate-x-24 pointer-events-none"}`}>
        <div className=" found_items relative h-[770px] z-20 flex flex-row justify-between">
          <div className='found_left_side w-[35%] h-[772px] bg-cover flex flex-col justify-start text-center items-center'>
            <div className="hanging_board mt-16">
              <div className='glass_2 p-8'>
                <h2 className="font-bold title text-center text-gray-900">FOUND ITEMS</h2>
                <p className='text-3xl'>Your lost item might be <br /> waiting right here</p>
              </div>
            </div>
          </div>
          <div className='found_right_side w-[65%] relative '>
            <div className='found_items_upper p-3 flex justify-between '>
              <input type="text" placeholder=' Search here' value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} className='bg-white w-[400px]' />
              <button onClick={() => setMode("hero")} className='flex rounded bg-neutral-300 px-10 py-1 pb-2 text-black hover:bg-gray-950 hover:!text-amber-50'>Go back</button>
            </div>
            {/* <hr className='m-0' /> */}
            <div className='something'>
              <div className='blue_water overflow-y-auto h-[704px]'>
                <div className="grid grid-cols-3 gap-6 p-6">
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
