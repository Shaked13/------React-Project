import { DarkThemeToggle, Navbar, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { CiSearch } from "react-icons/ci";
import { searchActions } from "../../../Store/SearchSlice";
import Swal from "sweetalert2";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";


const Header = () => {
    const user = useSelector((state: TRootState) => state.UserSlice.user);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const location = useLocation().pathname;

    const AdminProfile = () => {
        if (user?.isAdmin) {
            nav("/profile");
        } else {
            nav("/*");
        };
    };

    const SignOut = () => {
        const backgroundColor = document.documentElement.classList.contains('dark') ? '#333333' : '#ffffff';
        const textColor = document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000';
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            background: backgroundColor,
            color: textColor,
            confirmButtonText: "Yes, sign out!"
        }).then((result) => {
            if (result.isConfirmed) {

                // מחיקת ה-token מה-localStorage
                localStorage.removeItem("token");

                dispatch(userActions.Signout());
                Swal.fire({
                    showConfirmButton: false,
                    title: "You Signed Out!",
                    background: backgroundColor,
                    color: textColor,
                    icon: "success",
                    timerProgressBar: true,
                    timer: 2000,
                    showCloseButton: true
                });
            }
            nav("/");
        });
    };

    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch(searchActions.searchWord(value));
    };

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            (async () => {
                axios.defaults.headers.common['x-auth-token'] =
                    token;
                const user = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" +
                    (jwtDecode(token) as { _id: string })._id);
                dispatch(userActions.login(user.data));
            })();
        } else {
            token = "";
        }
    }, []);

    return (
        <Navbar fluid className="bg-slate-800">
            <Navbar.Brand as={Link} href="/" to="/" className="mr-48 max-md:m-auto">
                <img src="/web.images.jpg" alt="admin's pic" style={{ width: "50px", height: "40px", borderRadius: "50%", marginRight: "10px" }} />
                <span className="self-center text-xl font-semibold text-white whitespace-nowrap">
                    Shaked
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />

            <Navbar.Collapse>
                <Navbar.Link
                    as={Link}
                    to={"/"}
                    href="/"
                    className="text-white "
                    active={location === "/"}
                >
                    Home
                </Navbar.Link>

                <Navbar.Link
                    as={Link}
                    to={"/about"}
                    href="/about"
                    className="text-white "
                    active={location === "/about"}
                >
                    About
                </Navbar.Link>

                {!user && (<Navbar.Link
                    as={Link}
                    to={"/signin"}
                    href="/signin"
                    className="text-white"
                    active={location === "/signin"}
                >
                    Sign In
                </Navbar.Link>
                )}

                {!user && (<Navbar.Link
                    as={Link}
                    to="/register"
                    href="/register"
                    className="text-white"
                    active={location === "/register"}
                >
                    Register
                </Navbar.Link>
                )}

                {/*-------------------------profile------------------------*/}

                {user && !user.isAdmin && (
                    <Navbar.Link
                        as={Link}
                        href="/profile"
                        to="/profile"
                        className="text-white "
                        active={location === "/profile"}>
                        Profile
                    </Navbar.Link>
                )}

                {/*-------------------------admin's profile------------------------*/}

                <Navbar.Brand onClick={AdminProfile}>
                    <img src="/admin.jpg" alt="admin's profile rabbit icon"
                        style={{ width: "40px", borderRadius: "50%", marginRight: "10px" }}
                        className="cursor-pointer" />
                </Navbar.Brand>

                {/*-------------------------CRM------------------------*/}

                {user?.isAdmin && (<Navbar.Link
                    as={Link}
                    href="/crm"
                    to="/crm"
                    className="text-white "
                    active={location === "/crm"}>
                    CRM
                </Navbar.Link>)}

                {user && (<Navbar.Link
                    as={Link}
                    to={"/favorites"}
                    href="/favorites"
                    className="text-white "
                    active={location === "/favorites"}
                >
                    Favorites
                </Navbar.Link>
                )}

                {user?.isBusiness && (<Navbar.Link
                    as={Link}
                    to={"/mycards"}
                    href="/mycards"
                    className="text-white "
                    active={location === "/mycards"}
                >
                    My Cards
                </Navbar.Link>
                )}

                {user && (<Navbar.Link
                    className="text-white cursor-pointer"
                    onClick={SignOut}
                >
                    Sign Out
                </Navbar.Link>
                )}
            </Navbar.Collapse>

            <div className="flex mr-15">
                <TextInput rightIcon={CiSearch} onChange={search} placeholder="Search..." />
                <DarkThemeToggle />
            </div>
        </Navbar>
    );
};

export default Header;