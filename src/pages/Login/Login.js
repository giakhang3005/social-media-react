import "./LoginStyle.css";
import { auth, provider } from "../../config/Firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

export const Login = () => {
  //create a redirect
  const navigate = useNavigate();

  //get user
  const [user, loading] = useAuthState(auth);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);

    message.success('Signed in');

    //redirect to home page
    navigate("/");
  };

  return (
    <div>
      <h1>Login Page</h1>
      {!user ? (
        <Button
          icon={<GoogleOutlined />}
          className="signinwithgg"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      ) : (
        <p>You have aldready signed in</p>
      )}
    </div>
  );
};
