import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UnauthorizedRoutes = ({ role }) => {
  if (role === "admin") {
    const { authorized } = useSelector((state) => state.admin);
    console.log(authorized);
    return !authorized ? <Outlet /> : <Navigate to={"/admin/dashboard"} />;
  } else if (role === "user") {
    const { authorized } = useSelector((state) => state.user);
    return !authorized ? <Outlet /> : <Navigate to={"/"} />;
  } else if (role === "organizer") {
    const { authorized } = useSelector((state) => state.organizer);
    return !authorized ? <Outlet /> : <Navigate to={"/organizer/dashboard"} />;
  }
};
export default UnauthorizedRoutes;
