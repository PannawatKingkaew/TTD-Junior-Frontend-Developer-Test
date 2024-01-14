import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import logo from "../pic/Ellipse 1.png";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const isAuthenticated = useAuth();

  useEffect(() => {
    const storedData = localStorage.getItem("Data");

    if (storedData) {
      const formData = JSON.parse(storedData);

      setProfileImage(formData.profile);

      const fieldIds = [
        "email",
        "password",
        "companyName",
        "taxId",
        "fullName",
        "country",
        "countryCode",
        "phoneNumber",
        "website",
        "address",
        "stateProvince",
        "subdistrict",
        "cityDistrict",
        "zipcode",
      ];
      fieldIds.forEach((fieldId) => {
        const element = document.getElementById(fieldId);

        if (element) {
          element.setAttribute(
            "value",
            isAuthenticated ? formData[fieldId] : null
          );
        }
      });

      const element = document.getElementById("address") as HTMLInputElement;
      if (element) {
        element.value = isAuthenticated ? formData.address : "";
      }
    }
  }, []);

  return (
    <div className="App">
      <form>
        <div className="w-[1920px] h-[1125px] relative bg-white">
          <div className="w-[1263px] h-[911px] left-[329px] top-[122px] absolute shadow">
            <div className="w-[1263px] h-[911px] left-0 top-0 absolute bg-white rounded-[20px]">
              <div className="h-[74px] left-[838px] top-[169px] absolute"></div>
              <div className="left-[65px] top-[35px] absolute flex-col justify-start items-center gap-6 inline-flex">
                {/* image */}
                <div className="w-[150px] h-[150px] rounded-full border border-sky-950 justify-center items-center inline-flex">
                  <label htmlFor="profileImage">
                    <div className="">
                      {profileImage && isAuthenticated ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="relative flex-col w-[150px] h-[150px] rounded-[100px] justify-start items-start inline-flex"
                        />
                      ) : (
                        <img
                          src={logo}
                          alt="Profile"
                          className="relative flex-col w-[150px] h-[150px] rounded-[100px] justify-start items-start inline-flex"
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
                            id="email"
                            className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                            readOnly
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
                                id="companyName"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal "
                                readOnly
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
                                id="taxId"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal "
                                readOnly
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
                                id="fullName"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                readOnly
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
                              <input
                                id="country"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                readOnly
                              />
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
                                <input
                                  id="countryCode"
                                  className="w-[92px] ml-2 h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                  readOnly
                                />
                                <input
                                  id="phoneNumber"
                                  className="w-[250px] ml-2 h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                  readOnly
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
                                id="website"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                readOnly
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
                                className="self-stretch w-[360px] h-[137px] pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                style={{ resize: "none" }}
                                readOnly
                              />
                            </div>
                          </div>

                          {/*  state */}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label className="block text-gray-700 font-bold mb-2">
                                State/Province
                              </label>
                              <input
                                id="stateProvince"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                readOnly
                              />
                            </div>
                          </div>

                          {/*  sub */}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label className="block text-gray-700 font-bold mb-2">
                                Sub-District
                              </label>
                              <input
                                id="subdistrict"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                readOnly
                              />
                            </div>
                          </div>

                          {/*  city */}
                          <div className="InputEmail w-[360px] h-[74px] flex-col justify-start items-start col-start-2 gap-1.5 inline-flex">
                            <div className="InputWithLabel self-stretch h-[74px] flex-col justify-start items-start gap-1.5 flex">
                              <label className="block text-gray-700 font-bold mb-2">
                                City/District
                              </label>
                              <input
                                id="cityDistrict"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                readOnly
                              />
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
                                id="zipcode"
                                className="self-stretch h-11 pl-3 pr-6 py-2 bg-white rounded shadow border border-gray-300 justify-start items-center gap-2 inline-flex font-normal"
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
