import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/Firebase";
import "./FormStyle.css";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {
  const navigate = useNavigate();

  //get user
  const [user, loading] = useAuthState(auth);

  //form input format
  const schema = yup.object().shape({
    title: yup.string().required("You must enter a title"),
    description: yup.string().required("You must enter a description"),
  });

  //declare obj register and functions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //decalre which collection to add of database
  const postsRef = collection(db, "posts");

  //function when submit the form
  const onCreatePost = async (data) => {
    await addDoc(postsRef, {
      //   title: data.title,
      //   description: data.description,
      //include title and description aldready
      ...data,
      username: user?.displayName,
      userAvt: user?.photoURL,
      userId: user?.uid,
    });
    message.success("Posted!");
    navigate('/');
  };

  const loadingGif = "https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif"

  return (
    <form className="createPostForm" onSubmit={handleSubmit(onCreatePost)}>
      <div className="UsMetaPost">
        <img src={loading ? loadingGif : user?.photoURL} />
        <p>{user?.displayName}</p>
      </div>

      <input
        className="postTitle"
        placeholder="Title..."
        {...register("title")}
      />
      <textarea
        className="postDescription"
        placeholder="Description..."
        {...register("description")}
      />
      <input type="submit" value="POST" />
      <div className="createPostValErr">{errors.title?.message}</div>
      <div className="createPostValErr">{errors.description?.message}</div>
    </form>
  );
};
