import "./NavStyle.css";
import { Link } from "react-router-dom";
import { auth } from "../../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Popover, Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

//logout box (contain logout button)
const logoutBTN = (logOut) => {
  return (
    <Button danger icon={<LogoutOutlined />} onClick={logOut}>
      Log out
    </Button>
  );
};

export const Navbar = () => {
  const loadingGif =
    "https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif";

  const navigate = useNavigate();

  //get user
  const [user, loading] = useAuthState(auth);

  //Log out function
  const logOut = () => {
    signOut(auth);
    message.success("Signed out");
    navigate("/")
  };

  return (
    <nav>
      <div className="Logo">Logo</div>
      <div className="navBtn">
        <Link to="/">Home</Link>
        {!user && <Link to="/login">Login</Link>}
        {user && <Link to="/createpost">Create post</Link>}
      </div>

      {user && (
        <div className="profile">
          <p>{user?.displayName}</p>

          {/* Hover avatar -> show logout box */}
          <Popover
            placement="bottom"
            content={() => logoutBTN(logOut)}
            trigger="hover"
          >
            <img src={loading ? loadingGif : user?.photoURL} />
          </Popover>
        </div>
      )}
    </nav>
  );
};
