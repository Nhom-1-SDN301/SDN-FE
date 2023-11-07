// ** Components
import Post from "./Post";
import Spinner from "@components/spinner/Loading-spinner";

const PostList = ({ loadingFetchPost, posts = [], classId }) => {
  return (
    <div>
      {loadingFetchPost && <Spinner />}
      {posts.map((post) => (
        <Post key={post._id} post={post} classId={classId} />
      ))}
    </div>
  );
};

export default PostList;
