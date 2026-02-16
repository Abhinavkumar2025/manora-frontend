import React from "react";

const Lost_Stuff_Container = ({
    itemName,
    location,
    imageUrl,
    description,
    reportType,
}) => {
    return (
        <div className="antialiased text-gray-900 lost_card">
            <div className="p-4 flex items-center justify-center">

                {/* CARD */}
                <div
                    className="bg-white rounded-tr-3xl rounded-bl-3xl shadow-2xl
                     xl:w-80 lg:w-72 md:w-64 sm:w-1/2
                     h-80 flex flex-col
                     group  "
                >

                    {/* IMAGE */}
                    <div className="bg-black rounded-tr-3xl h-36 w-full overflow-hidden shrink-0">
                        {imageUrl && (
                            <img
                                className="h-full w-full object-contain"
                                src={imageUrl}
                                alt={itemName}
                            />
                        )}
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 flex flex-col flex-1  overflow-y-auto scrollbar-thin ">

                        <span className="text-xs uppercase tracking-wide text-gray-500  ">
                            {reportType}
                        </span>

                        <h3 className="text-lg font-semibold mt-1 ">
                            {itemName}
                        </h3>

                        <p className="text-sm text-gray-600 mt-1">
                            📍 {location}
                        </p>

                        {/*  SCROLLABLE DESCRIPTION (FIXED HEIGHT) */}
                        <div className="mt-2 max-h-[90px]  pr-2 ">
                            <p className="text-sm text-gray-500 ">
                                {description}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lost_Stuff_Container;
