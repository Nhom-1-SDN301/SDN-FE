// ** Component import
import Spinner from "@components/spinner/Loading-spinner";

const PageLoading = ({ height }) => {
  return (
    <div
      style={{
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  );
};

export default PageLoading;
