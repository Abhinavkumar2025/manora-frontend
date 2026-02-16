import React from 'react'
import { useForm } from "react-hook-form";
import './Lost_Found_Report.css'


const Lost_Found_Report = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm();

    const onSubmit = async(data) => {
        const formData = new FormData();
        formData.append("reportType", data.reportType);
        formData.append("itemName", data.itemName);
        formData.append("location", data.location);
        formData.append("description", data.description);
        formData.append("image", data.image[0]);

        const res = await fetch('http://localhost:5000/manora/report',{
            method: "POST",
            // headers: {"Content-Type" : "application/json"},
            body: formData,
        });

        const result = await res.json();

        if (!res.ok && result.errors) {
            result.errors.forEach((err) => {
                setError(err.field, {
                    type: "server",
                    message: err.message,
                });
            });
            return;
        }

        console.log("Success:", result);
        reset();
    };

  return (
    <form id='report_form' onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 p-6 pt-0 pb-1">

        {/* Report Type */}
        <div className="flex flex-col">
            <label htmlFor="reportType">Report Type</label>
            <select
                id='reportType'
                {...register("reportType", { required: "Please select report type" })}
                className="border p-2 rounded "
            >
                <option value="">Lost / Found</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
            </select>
            {errors.reportType && (
                <span className="text-red-500 text-sm">
                    {errors.reportType.message}
                </span>
            )}
        </div>

        {/* Item Name */}
        <div className="flex flex-col">
            <label htmlFor="itemName">Item Name</label>
            <input
                type="text"
                id='itemName'
                placeholder="Item Name"
                {...register("itemName", { required: "Item name is required" })}
                className="border p-2 rounded"
            />
            {errors.itemName && (
                <span className="text-red-500 text-sm">
                    {errors.itemName.message}
                </span>
            )}
        </div>

        {/* Location */}
        <div className="flex flex-col">
            <label htmlFor="location">Location</label>
            <input type="text" id='location' placeholder="Location" {...register("location", { required: "Location is required" })} className="border p-2 rounded"/>
        </div>
        
        {/* Description */}
        <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea id='description' placeholder="Description" {...register("description")} className="border p-2 rounded"/>

        </div>
        {/* Image */}
        <div className="flex flex-col">
            <label htmlFor="image">Image</label>
            <input type="file" id='image' accept='image/*' {...register("image", { required: "Image is required" })} className="border p-2 rounded" />
            {errors.image && (
                <span className="text-red-500 text-sm">
                    {errors.image.message}
                </span>
            )}
        </div>

        {/* Submit */}
          <button type="submit" disabled={isSubmitting} className=" text-white py-2 rounded ">
              {isSubmitting ? "Submitting..." : "Submit Report"}
        </button>
    </form>
    
  )
}

export default Lost_Found_Report
