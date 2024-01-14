import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../pic/temp_pic.png";
import bin from "../pic/bin.png";
import eye from "../pic/eye.png";
import { useAuth } from "./AuthContext";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsAuthenticated(true);
    const form = e.currentTarget;

    const formData = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
      companyName: (form.elements.namedItem("companyName") as HTMLInputElement)
        .value,
      taxId: (form.elements.namedItem("taxId") as HTMLInputElement).value,
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      country: (form.elements.namedItem("country") as HTMLInputElement).value,
      countryCode: (form.elements.namedItem("countryCode") as HTMLInputElement)
        .value,
      phoneNumber: (form.elements.namedItem("phoneNumber") as HTMLInputElement)
        .value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      stateProvince: (
        form.elements.namedItem("stateProvince") as HTMLInputElement
      ).value,
      subdistrict: (form.elements.namedItem("subdistrict") as HTMLInputElement)
        .value,
      cityDistrict: (
        form.elements.namedItem("cityDistrict") as HTMLInputElement
      ).value,
      zipcode: (form.elements.namedItem("zipcode") as HTMLInputElement).value,
    };


    const existingData = localStorage.getItem("Data");
    const existingFormData = existingData ? JSON.parse(existingData) : {};
    const updatedFormData = { ...existingFormData, ...formData };
    localStorage.setItem("Data", JSON.stringify(updatedFormData));
    localStorage.removeItem("profileImage");
    navigate("/profile");
    window.location.reload();
  };

  const handleCancel = () => {
    navigate("/");
  };

  const [profileImage, setProfileImage] = useState<string | null>(
    localStorage.getItem("profileImage") || null
  );
  const [isHovered, setIsHovered] = useState(false);
  const [showFullSize, setShowFullSize] = useState(false);
  const [fileSelected, setFileSelected] = useState(
    localStorage.getItem("profileImage") !== null
  );
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        localStorage.setItem("profileImage", reader.result as string);

        // Save profile path in the "Data" object
        const existingData = localStorage.getItem("Data");
        const existingFormData = existingData ? JSON.parse(existingData) : {};
        const updatedFormData = {
          ...existingFormData,
          profile: reader.result as string,
        };
        localStorage.setItem("Data", JSON.stringify(updatedFormData));
      };

      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
      setFileSelected(true);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
    setFileSelected(false);
    localStorage.removeItem("profileImage");

    const existingData = localStorage.getItem("Data");
    const existingFormData = existingData ? JSON.parse(existingData) : {};
    const updatedFormData = { ...existingFormData, profile: null };
    localStorage.setItem("Data", JSON.stringify(updatedFormData));
  };

  const handleViewFullSize = () => {
    setShowFullSize(true);
  };

  const handleCloseFullSize = () => {
    setShowFullSize(false);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="w-full h-[1125px] relative bg-white">
          <div className="w-[1263px] h-[911px] left-[329px] top-[122px] absolute shadow">
            <div className="w-[1263px] h-[911px] left-0 top-0 absolute bg-white rounded-[20px]">
              <div className="h-[74px] left-[838px] top-[169px] absolute"></div>

              <div className="left-[65px] top-[35px] absolute flex-col justify-start items-center gap-6 inline-flex">
                {/* image */}
                <div className="w-[150px] h-[150px] rounded-full border border-sky-950 justify-center items-center inline-flex">
                  <label
                    htmlFor="profileImage"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {profileImage && isHovered && (
                      <>
                        <div
                          className="absolute w-[150px] h-[150px] rounded-full bg-gray-800 bg-opacity-50 justify-center items-center inline-flex"
                          style={{ zIndex: 900 }}
                        >
                          <button
                            type="button"
                            className="m-2 rounded-full p-1"
                            onClick={handleViewFullSize}
                          >
                            <img src={eye} alt="View" className="w-6 h-6" />
                          </button>
                          <button
                            type="button"
                            className="m-2 rounded-full p-1"
                            onClick={handleDeleteImage}
                          >
                            <img src={bin} alt="Delete" className="w-6 h-6" />
                          </button>
                        </div>
                      </>
                    )}

                    <div>
                      <img
                        src={profileImage || logo}
                        alt="Profile"
                        className="relative flex-col w-[150px] h-[150px] rounded-[100px] justify-start items-start inline-flex"
                      />
                      {showFullSize && (
                        <div
                          style={{ zIndex: 998 }}
                          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75"
                          onClick={handleCloseFullSize}
                        >
                          <div className="w-[452px] h-[424px] bg-white flex items-center justify-center relative">
                            <button
                              onClick={handleCloseFullSize}
                              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 cursor-pointer z-10"
                            >
                              {/* Close button (X) */}
                              &#x2715;
                            </button>

                            <div className="w-[434px] h-[404px] flex items-center justify-center">
                              <img
                                src={profileImage || logo}
                                alt="Full Size"
                                className="max-w-full max-h-full"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {!fileSelected && (
                        <input
                          type="file"
                          id="profileImage"
                          name="profileImage"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      )}
                    </div>
                  </label>
                </div>

                <div className="h-[554px] flex-col justify-start items-start gap-[72px] flex">
                  <div className="flex-col justify-start items-start gap-8 flex">
                    {/* row 1 */}
                    <div className="justify-start items-start gap-6 inline-flex">
                      {/* email */}
                      <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                          <label
                            htmlFor="email"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Email:
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                            className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal "
                            required
                          />
                        </div>
                      </div>

                      {/* password */}
                      <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                          <label
                            htmlFor="password"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Password:
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal "
                            required
                          />
                        </div>
                      </div>

                      {/* cpassword */}
                      <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                          <label
                            htmlFor="cpassword"
                            className="block text-gray-700 font-bold mb-2"
                          >
                            Confirm Password:
                          </label>
                          <input
                            type="password"
                            id="cpassword"
                            name="cpassword"
                            placeholder="Enter your password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal "
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*  row2 */}
                  <div className="Frame48097178 w-[1131px] h-[416px] flex-col justify-start items-start gap-2 inline-flex">
                    <div className="Label text-blue-800 text-xl font-semibold font-['Poppins']">
                      Information
                    </div>

                    <div className="Frame48097160 w-[1131px] h-[378px] relative">
                      <div className="Frame48097155 left-0 top-0 absolute justify-start items-start gap-6 inline-flex">
                        <div className="Frame48097153 h-[180px] justify-start items-start grid grid-rows-4 gap-y-[89px] grid-cols-3 gap-x-6 flex">
                          {/* company */}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label
                                htmlFor="companyName"
                                className="block text-gray-700 font-bold mb-2"
                              >
                                Company Name
                              </label>
                              <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                placeholder="Enter company name"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal "
                                required
                              />
                            </div>
                          </div>

                          {/* tax*/}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label
                                htmlFor="taxId"
                                className="block text-gray-700 font-bold mb-2"
                              >
                                Company Name
                              </label>
                              <input
                                type="text"
                                id="taxId"
                                name="taxId"
                                placeholder="Enter Tax ID"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal "
                                required
                              />
                            </div>
                          </div>

                          {/* name */}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label
                                htmlFor="fullName"
                                className="block text-gray-700 font-bold mb-2"
                              >
                                Full Name:
                              </label>
                              <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder="Enter Full name"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                required
                              />
                            </div>
                          </div>

                          {/*  country */}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label
                                htmlFor="country"
                                className="block text-gray-700 font-bold mb-2"
                              >
                                Country:
                              </label>
                              <select
                                id="country"
                                name="country"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                required
                              >
                                <option value="Thailand">Thailand</option>
                                <option value="Japan">Japan</option>
                                <option value="Korea">Korea</option>
                              </select>
                            </div>
                          </div>

                          {/* pnumber */}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label
                                htmlFor="phoneNumber"
                                className="block text-gray-700 font-bold mb-2"
                              >
                                Phone Number:
                              </label>
                              <div className="flex items-center">
                                <select
                                  id="countryCode"
                                  name="countryCode"
                                  className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                  required
                                >
                                  <option value="+66">+66</option>
                                  <option value="+81">+81</option>
                                  <option value="+82">+82</option>
                                </select>
                                <input
                                  type="tel"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  className="w-[250px] ml-2 h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          {/* web */}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label
                                htmlFor="website"
                                className="block text-gray-700 font-bold mb-2"
                              >
                                Website
                              </label>
                              <input
                                type="url"
                                id="website"
                                name="website"
                                placeholder="Enter website"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                required
                              />
                            </div>
                          </div>

                          {/* address*/}
                          <div className="InputEmail w-[360px] h-[166px] flex-col justify-start items-start row-span-2 gap-1.5">
                            <div className="InputWithLabel self-stretch flex-col justify-start items-start gap-1.5">
                              <label
                                htmlFor="address"
                                className="block text-gray-700 font-bold mb-2"
                              >
                                Address
                              </label>
                              <textarea
                                id="address"
                                name="address"
                                placeholder="Enter Address"
                                className="self-stretch w-[360px] h-[137px] pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                style={{ resize: "none" }}
                                required
                              />
                            </div>
                          </div>

                          {/*  state */}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label className="block text-gray-700 font-bold mb-2">
                                State/Province
                              </label>
                              <select
                                id="stateProvince"
                                name="stateProvince"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                required
                              >
                                <option value="Bangkok">Bangkok</option>
                                <option value="Tokyo">Tokyo</option>
                                <option value="Seoul">Seoul</option>
                              </select>
                            </div>
                          </div>

                          {/*  sub */}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label className="block text-gray-700 font-bold mb-2">
                                Sub-District
                              </label>
                              <select
                                id="subdistrict"
                                name="subdistrict"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                required
                              >
                                <option value="Chatuchak">Chatuchak</option>
                                <option value="Hachijō">Hachijō</option>
                                <option value="Segok">Segok</option>
                              </select>
                            </div>
                          </div>

                          {/*  city */}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start col-start-2 gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label className="block text-gray-700 font-bold mb-2">
                                City/District
                              </label>
                              <select
                                id="cityDistrict"
                                name="cityDistrict"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                required
                              >
                                <option value="Chatuchak">Chatuchak</option>
                                <option value="Aogashima">Aogashima</option>
                                <option value="Gangnam">Gangnam</option>
                              </select>
                            </div>
                          </div>

                          {/* zip*/}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label
                                htmlFor="zipcode"
                                className="block text-gray-700 font-bold mb-2"
                              >
                                Zip Code
                              </label>
                              <input
                                type="text"
                                id="zipcode"
                                name="zipcode"
                                placeholder="Enter Zip Code"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="inset-x-0 bottom-16 absolute justify-center items-center inline-flex">
                <div className="Frame48097179 w-[1128px] h-12 relative">
                  <button
                    type="button"
                    className="w-40 h-12 px-4 py-3.5 left-[40px] top-0 absolute bg-sky-950 rounded-[33px] shadow justify-center items-center gap-2.5 inline-flex text-white text-xl font-semibold"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-40 h-12 px-4 py-3.5 left-[928px] top-0 absolute bg-green-400 rounded-[33px] shadow justify-center items-center gap-2.5 inline-flex text-white text-xl font-semibold"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
