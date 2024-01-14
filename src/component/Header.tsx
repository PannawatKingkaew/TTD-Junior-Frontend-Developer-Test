import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../pic/Ellipse 1.png";
import tempPic from "../pic/temp_pic.png";
import { useAuth } from "./AuthContext";

interface HeaderProps {
  onSignInClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignInClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [fullName, setFullName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("Data");
    console.log("Stored Data from localStorage:", storedData);

    if (storedData) {
      const userData = JSON.parse(storedData);
      const { profile, fullName } = userData;
      setProfileImageUrl(profile);
      setFullName(fullName);
      console.log("Profile Image URL:", profile);
    }

  }, []); 

  const handleHomeClick = () => {};

  const handleLogout = (option: string) => {
    setDropdownOpen(false); 
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="w-full h-20 relative bg-white shadow-2xl border">
      <div className="w-16 h-16 left-[162px] top-[8px] absolute">
        <Link to="/" onClick={handleHomeClick}>
          <div
            style={{
              backgroundImage: `url(${logo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "65px",
              width: "65px",
            }}
          >
            <div className="w-[42px] h-[18px] left-[11px] top-[23px] absolute text-center text-white text-sm font-bold font-['Inter']">
              LOGO
            </div>
          </div>
        </Link>
      </div>

      <div className="left-[931px] top-[25px] absolute text-cyan-900 text-xl font-semibold underline">
        Home
      </div>

      <div>
        {isAuthenticated ? (
          <div className="w-[92px] h-16 left-[1666px] top-[8px] absolute relative inline-block">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-16 h-16 left-0 top-0 absolute rounded-full"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              />
            ) : (
              <img
                src={tempPic} 
                alt="Profile"
                className="w-16 h-16 left-0 top-0 absolute rounded-full"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              />
            )}
            {isDropdownOpen && (
              <div
                className="w-40 h-[165px] top-20 relative bg-white rounded-lg shadow"
                style={{ zIndex: 998 }}
              >
                <div className="Frame427322427 left-[22px] top-[14px] absolute flex-col justify-center items-center gap-1 inline-flex">
                  <div className="Frame48097112 w-10 h-10 relative bg-white">
                    {profileImageUrl ? (
                      <img
                        src={profileImageUrl}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <img
                        src={tempPic} 
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                  </div>
                  <div className="Frame427322431 flex-col justify-center items-center gap-1 flex">
                    <div className="Lisa w-[117px] text-center">
                      <span>{fullName}</span>
                    </div>
                  </div>
                </div>
                <div className="Line32 w-[127px] h-[0px] left-[17px] top-[86px] absolute border border-cyan-900"></div>
                <Link
                  to="/profile"
                  className="Profile left-[17px] top-[93px] absolute text-cyan-900 text-lg font-medium"
                >
                  Profile
                </Link>
                <button
                  className="Logout left-[17px] top-[124px] absolute text-cyan-900 text-lg font-medium"
                  onClick={() => handleLogout("logout")}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onSignInClick}
            className="w-[141px] h-12 left-[1617px] top-[16px] absolute rounded-[33px] bg-cyan-900 hover:bg-cyan-500 text-white font-bold py-2 px-4 shadow justify-center items-center gap-[30px] inline-flex"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};
export default Header;
