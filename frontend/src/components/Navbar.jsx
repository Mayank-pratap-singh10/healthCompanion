import { Moon, Sun } from "lucide-react";
import { Link, useNavigate,NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";


import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";


export default function Navbar() {
  //const { user, logout } = useContext(AuthContext);
  

  const [darkMode, setDarkMode] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);

    document.documentElement.classList.toggle("dark", newMode);

    localStorage.setItem("darkMode", newMode);
  };
  const navigate = useNavigate();
  const [showmenu, setShowMenu] = useState(false);
  const {token,setToken} =useContext(AppContext)
  const logout = ()=>{
    setToken(false)
    localStorage.removeItem("token")
  }
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
                alt="logo"
                className="h-8 w-8"
              />
            </Link>
            <h1 className="text-xl font-bold text-sky-700 dark:text-sky-200">
              Health Companion
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-300">
              Serving across India
            </span>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-sky-100 dark:bg-gray-700 hover:bg-sky-200 dark:hover:bg-gray-600"
            >
              {darkMode ? (
                <Sun size={18} className="text-sky-500" />
              ) : (
                <Moon size={18} className="text-sky-700" />
              )}
            </button>

            <div className="flex items-center gap-4">
              {token ? (
                <div className="flex items-center gap-2 cursor-pointer group relative">
                  <img
                    src={assets.profile_pic}
                    alt="profile"
                    className="h-8 w-8 rounded-full"
                  />
                  <img
                    src={assets.dropdown_icon}
                    alt="dropdown"
                    className="w-2.5 cursor-pointer"
                  />
                  <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-200 hidden group-hover:block">
                    <div className="min-w-48 bg-stone-100 rounded flex flex-col p-4 gap-4">
                      <p
                        onClick={() => navigate("/my-profile")}
                        className="hover:text-black cursor-pointer"
                      >
                        My Profile
                      </p>
                      <p
                        onClick={() => navigate("/my-appointments")}
                        className="hover:text-black cursor-pointer"
                      >
                        MyAppointments
                      </p>
                      <p onClick={logout} className="hover:text-black cursor-pointer">Logout</p>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg hidden md:block"
                >
                  Create Account
                </button>
              )}
              <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="" />
              <div className={`md:hidden top-0 bottom-0 right-0 z-20 overflow-hidden bg-white transition-all`}>
                <div>
                  <img src={assets.Main_Logo} alt="" />
                  <img onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul>
                  <navlink>Home</navlink>
                  <navlink>All Doctors</navlink>
                  <navlink>About</navlink>
                  <navlink>Contact</navlink>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} /> */}
    </>
  );
}
