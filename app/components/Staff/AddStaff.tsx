"use client";

import { getAllowedRoles } from "@/app/rtk/slices/rolesSlice";
import { StaffTypes } from "@/app/rtk/slices/staffSlice";
import { AppDispatch, RootState } from "@/app/rtk/store";
import { StaffValidationSchema } from "@/app/validation/StaffSchema";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../CustomInput/CustomInput";
import CustomSelectOptions from "../CustomSelectOptions/CustomSelectOptions";
import Loading from "../Loading/Loading";

interface AddStaffFormProps {
  onSubmit: (values: Omit<StaffTypes, "id" | "status">) => void;
}
const AddStaff = ({ onSubmit }: AddStaffFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.staff);
  const { allowedRoles } = useSelector((state: RootState) => state.roles);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const renderedImage = selectedImage ? URL.createObjectURL(selectedImage) : "";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      image: "",
      role: "",
    },
    validationSchema: StaffValidationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      formik.setFieldValue("image", file);
    }
  };

  useEffect(() => {
    dispatch(getAllowedRoles());
  }, [dispatch]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold ">Add New Staff Member</h2>
      <form onSubmit={formik.handleSubmit}>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* name */}
              <div>
                <CustomInput
                  type="text"
                  id="name"
                  label="name"
                  placeHolder="Enter Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>}
              </div>

              {/* email */}
              <div>
                <CustomInput
                  type="email"
                  id="email"
                  label="email"
                  placeHolder="Enter Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>}
              </div>

              {/* password */}
              <div>
                <CustomInput
                  type="password"
                  id="password"
                  label="Password"
                  placeHolder="Enter Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>}
              </div>

              {/* phone */}
              <div>
                <CustomInput
                  type="tel"
                  id="phone"
                  label="phone"
                  placeHolder="Enter Phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>}
              </div>

              {/* role */}
              <div>
                <CustomSelectOptions
                  id="role"
                  label="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  hasError={!!formik.errors.role && !!formik.touched.role}
                  options={allowedRoles}
                />
                {formik.touched.role && formik.errors.role && <div className="text-red-500 text-xs mt-1">{formik.errors.role}</div>}
              </div>

              {/* image */}
              <div className="md:col-span-2">
                <div className="flex flex-wrap items-center gap-5 w-full mt-4">
                  {renderedImage && (
                    <div className="p-3 bg-slate-100 rounded-lg border border-gray_dark w-[200px]">
                      <div className="h-[200px] w-full overflow-hidden">
                        <Image src={renderedImage} alt="staff image" width={200} height={200} style={{ width: "auto", height: "auto" }} />
                      </div>
                    </div>
                  )}

                  <div className="w-[200px] p-3 bg-slate-100 rounded-lg border border-gray_dark">
                    <label className="flex items-center justify-center w-full h-[200px] border-2 border-dashed rounded-lg cursor-pointer hover:border-primary hover:text-primary">
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      <div className="flex flex-col items-center">
                        <FaImage className="text-4xl mb-2" />
                        <span className="text-sm">Upload Staff Image</span>
                      </div>
                    </label>
                  </div>

                  {!selectedImage && formik.submitCount > 0 && <div className="text-red-500 text-xs mt-1">Image is required</div>}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-85 focus:outline-none disabled:opacity-50">
                Add Staff Member
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AddStaff;
