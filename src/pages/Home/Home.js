import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useState, State, useEffect } from "react";
import { Post } from "./Post.js"
import { useAuthState } from "react-firebase-hooks/auth";

export const Home = () => {
  const postRef = collection(db, "posts");

  const [postsList, setPostsList] = useState(null);

  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostsList(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Post postsList={postsList} />
  );
};
