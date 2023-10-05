// ** Reactstrap
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";

// ** Hooks
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";

// ** Apis
import { studySetApi } from "../../../@core/api/quiz";

// ** Icons
import { Star } from "react-feather";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Redux
import { useSelector } from "react-redux";

// ** Components
import InfiniteScroll from "react-infinite-scroll-component";
import Avatar from "@components/avatar";
import Rating from "react-rating";

// ** Third libs
import { formatDistance, subDays } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import toast from "react-hot-toast";

// ** Init
const initRateForm = {
  star: 0,
  comment: "",
};

const RateStudySet = ({
  user,
  star,
  comment,
  userId,
  createdAt,
  updatedAt,
  lang,
}) => {
  // ** Context
  const themeColors = useContext(ThemeColors);
  return (
    <div
      style={{
        padding: "1.25rem .5rem",
        backgroundColor: user._id === userId && "rgba(250, 184, 2, 0.05)",
        borderRadius: 12,
      }}
    >
      <div className="d-flex align-items-center">
        <div>
          <Avatar
            img={
              user?.picture ||
              "/src/assets/images/portrait/small/avatar-s-11.jpg"
            }
          />
        </div>
        <div style={{ marginLeft: "1rem" }}>
          <div>
            <span style={{ fontWeight: 700 }}>{user.fullName}</span>
            <span
              style={{
                fontSize: ".85rem",
                opacity: 0.8,
                margin: "0 .25rem 0 .75rem",
              }}
            >
              {formatDistance(new Date(createdAt), new Date(), {
                addSuffix: true,
                locale: lang === "vn" ? vi : enUS,
              })}
            </span>
            {createdAt !== updatedAt && (
              <span
                style={{ fontSize: ".85rem", opacity: 0.8 }}
              >{`(Đã chỉnh sửa)`}</span>
            )}
          </div>
          <div>
            <Rating
              readonly
              initialRating={star}
              emptySymbol={<Star size={16} fill="#babfc7" stroke="#babfc7" />}
              fullSymbol={
                <Star
                  size={16}
                  fill={themeColors.colors.warning.main}
                  stroke={themeColors.colors.warning.main}
                />
              }
            />
            <span style={{ marginLeft: ".25rem" }}>{`(${star})`}</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: ".5rem", fontStyle: "italic" }}>{comment}</div>
    </div>
  );
};

const ModalRating = ({ open, setOpen, studySetId }) => {
  // ** Hooks
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const [offset, setOffset] = useState(0);
  const [rates, setRates] = useState([]);
  const [isStillHMore, setIsStillMore] = useState(false);
  const [limit] = useState(3);
  const [userRate, setUserRate] = useState(null);

  const [loadSubmit, setLoadSubmit] = useState(false);

  // ** Context
  const themeColors = useContext(ThemeColors);

  useEffect(() => {
    fetchRates({ studySetId, limit, offset });
    fetchUserRate({ userId: user?._id, studySetId });
  }, []);

  // ** handler
  const fetchRates = async ({ studySetId, limit, offset }) => {
    const { data } = await studySetApi.getRatesOfStudySet({
      studySetId,
      limit,
      offset,
    });

    if (data.isSuccess) {
      const ratesResponse = data.data.rates;
      setRates((prev) => [...prev, ...ratesResponse]);
      setIsStillMore(data.data.isHasMore);
      setOffset((prev) => prev + 1);
    }
  };

  const fetchUserRate = async ({ userId, studySetId }) => {
    const { data } = await studySetApi.getRateStudySetOfUser({
      studySetId,
      userId,
    });

    if (data.isSuccess) {
      const rateResponse = data.data?.rate;
      if (rateResponse)
        setUserRate({
          star: rateResponse.star,
          comment: rateResponse.comment,
        });
      else setUserRate(initRateForm);
    }
  };

  const handleSubmitRate = async () => {
    setLoadSubmit(true);
    const { data } = await studySetApi.putRateStudySet({
      studySetId,
      ...userRate,
    });

    if (data.isSuccess) {
      const rate = data.data.rate;
      const isNew = !Boolean(rates.find((r) => r._id === rate._id));

      if (isNew && data.data.isCreate) setRates((prev) => [rate, ...prev]);
      if (!isNew && data.data.isUpdate)
        setRates((prev) => prev.map((r) => (r._id === rate._id ? rate : r)));
      toast.success(t("message.rateSuccess"));
    } else toast.error(t("error.unknow"));

    setLoadSubmit(false);
  };

  return (
    <Modal className="modal-dialog-centered modal-lg" isOpen={open}>
      <ModalHeader toggle={() => setOpen(false)}>
        {t("title.peopleReviews")}
      </ModalHeader>
      <ModalBody>
        {user && (
          <div>
            <div style={{ marginBottom: "1rem", marginTop: "1.5rem" }}>
              <Rating
                initialRating={userRate?.star}
                emptySymbol={
                  <Star
                    style={{ margin: "0 .5rem" }}
                    size={24}
                    fill="#babfc7"
                    stroke="#babfc7"
                  />
                }
                fullSymbol={
                  <Star
                    style={{ margin: "0 .5rem" }}
                    size={24}
                    fill={themeColors.colors.warning.main}
                    stroke={themeColors.colors.warning.main}
                  />
                }
                onChange={(star) => setUserRate((prev) => ({ ...prev, star }))}
              />
            </div>
            <Input
              type="textarea"
              rows="2"
              placeholder={t("common.placeholder.ratingStudySet")}
              spellCheck={false}
              value={userRate?.comment}
              onChange={(e) =>
                setUserRate((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
            />
            <div
              style={{
                marginTop: ".5rem",
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Button.Ripple
                disabled={loadSubmit}
                color="primary"
                onClick={handleSubmitRate}
              >
                {loadSubmit && (
                  <Spinner
                    style={{ width: 14, height: 14 }}
                    type="grow"
                    color="dark"
                  />
                )}
                <span style={{ marginLeft: loadSubmit && ".5rem" }}>
                  {t("fieldName.submit")}
                </span>
              </Button.Ripple>
            </div>
          </div>
        )}
        <InfiniteScroll
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
          height={300}
          dataLength={rates.length}
          next={() => {
            fetchRates({ studySetId, limit, offset });
          }}
          hasMore={isStillHMore}
          loader={
            <div className="d-flex justify-content-center">
              <Spinner color="primary" />
            </div>
          }
          endMessage={
            <div className="divider">
              <div className="divider-text">
                {t("message.noMoreData", { value: t("common.reviews") })}
              </div>
            </div>
          }
        >
          {rates.map((rate) => (
            <RateStudySet
              key={rate._id}
              star={rate.star}
              comment={rate.comment}
              user={rate.user}
              userId={user?._id}
              createdAt={rate.createdAt}
              updatedAt={rate.updatedAt}
              lang={i18n.language}
            />
          ))}
        </InfiniteScroll>
      </ModalBody>
    </Modal>
  );
};

export default ModalRating;
