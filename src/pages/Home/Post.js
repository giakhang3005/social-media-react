import { Card, Space, Button, message, Empty } from "antd";
import { LikeOutlined, CommentOutlined } from "@ant-design/icons";
import "./HomeStyle.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/Firebase";

export const Post = (props) => {
  //get user
  const [user] = useAuthState(auth);

  const postsList = props.postsList; //postsList?.length

  //function when submit the form
  const addLike = async (postid) => {
    message.open({
      type: "info",
      content: "Liked",
      icon: <LikeOutlined />,
    });
  };

  //if no post to display

  return (
    <>
      <Space direction="vertical" size={16}>
        {postsList === null ? (
          <img
            src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-11-849_512.gif"
            style={Object.assign({ height: "50px" }, { width: "50px" })}
          />
        ) : (
          <>
            {
            postsList?.map((post) => {
              return (
                <Card
                  title={
                    <>
                      <img src={post.userAvt} />
                      <p>{post.username}</p>
                    </>
                  }
                  hoverable={true}
                  style={{ width: 500 }}
                >
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <Button onClick={() => addLike(post)} icon={<LikeOutlined />}>
                    Like
                  </Button>
                  <Button icon={<CommentOutlined />}>Comment</Button>
                </Card>
              );
            })}
          </>
        )}
      </Space>

      {postsList?.length === 0 && <Empty description="There is no post" />}
    </>
  );
};
