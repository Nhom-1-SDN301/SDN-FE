// ** Components
import Post from "./Post";
import Spinner from "@components/spinner/Loading-spinner";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "reactstrap";

const PostList = ({
  loadingFetchPost,
  posts = [],
  setPosts,
  classId,
  canComment,
  isRoot,
  hasMorePost,
  setOffset,
}) => {
  // ** Hooks
  const { t } = useTranslation();

  // ** Handler
  const handleIncreaseOffset = () => {
    setOffset((prev) => prev + 1);
  };

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          classId={classId}
          canComment={canComment}
          isRoot={isRoot}
          setPosts={setPosts}
        />
      ))}
      {hasMorePost && (
        <div className="d-flex justify-content-center">
          <Button.Ripple
            disabled={loadingFetchPost}
            size="sm"
            color="primary"
            onClick={handleIncreaseOffset}
          >
            {t("common.loadMore")}
          </Button.Ripple>
        </div>
      )}
      {loadingFetchPost && <Spinner />}
    </div>
  );
};

export default PostList;
