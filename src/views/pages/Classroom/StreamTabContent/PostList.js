// ** Components
import Post from "./Post";
import Spinner from "@components/spinner/Loading-spinner";

const PostList = ({ loadingFetchPost, posts = [], classId, canComment, isRoot }) => {
  return (
    <div>
      {loadingFetchPost && <Spinner />}
      {posts.map((post) => (
        <Post key={post._id} post={post} classId={classId} canComment={canComment} isRoot={isRoot} />
      ))}
    </div>
  );
};

export default PostList;
