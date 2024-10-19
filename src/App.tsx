import Header from "./Components/Layout/Header/Header";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import SignIn from "./Pages/SignIn/SignIn";
import Register from "./Pages/Register/Register";
import Error from "./Pages/Error/Error";
import Footer from "./Components/Layout/Footer/Footer";
import Profile from "./Pages/Profile/Profile";
import RouteGuard from "./Components/Shared/RouteGuard";
import MyCards from "./Pages/MyCards/MyCards";
// import { useSelector } from "react-redux";
// import { TRootState } from "./Store/BigPie";
import Favorites from "./Pages/Favorites/Favorites";
import Home from "./Pages/Home/Home";
import CardDetails from "./Pages/CardDetails/CardDetails";
import CreateCard from "./Pages/CreateCards/CreateCards";
import EditCards from "./Pages/EditCards/EditCards";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Crm from "./Pages/Admin/Crm";


function App() {
  // const user = useSelector((state: TRootState) => state.UserSlice.user)
  return (
    <>
      <Header />

      <Routes>
        {/* תוכן מתחלף */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/edit-cards/:id" element={<EditCards />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />

        <Route path="/*" element={<Error />} />

        <Route
          path="/profile"
          element={
            <RouteGuard>
              <Profile />
            </RouteGuard>
          }
        />

        <Route
          path="/favorites"
          element={
            <RouteGuard >
              <Favorites />
            </RouteGuard>
          }
        />

        <Route path="/crm"
          element={
            <RouteGuard adminOnly>
              <Crm />
            </RouteGuard>
          } />

        <Route
          path="/mycards"
          element={
            <RouteGuard bizOnly>
              <MyCards />
            </RouteGuard>
          }
        />

        <Route
          path="/createcard"
          element={
            <RouteGuard bizOnly>
              <CreateCard />
            </RouteGuard>
          }
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;