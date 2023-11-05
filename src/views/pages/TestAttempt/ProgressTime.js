// ** Reactstrap
import { Progress } from "reactstrap";

// ** Icons
import { Clock } from "react-feather";

// ** I18n
import { useTranslation } from "react-i18next";

// ** React
import { useEffect, useState } from "react";

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const ProgressTime = ({ initTime, submitTest }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [time, setTime] = useState(initTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = time - 1;
      if (newTime >= 0) {
        setTime(newTime);
      } else {
        clearInterval(timer);
        submitTest({ doTime: initTime - time });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  return (
    <div>
      <div className="mb-50 d-flex justify-content-between">
        <div style={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
          <Clock size={20} style={{ marginRight: ".5rem" }} />
          <span style={{ fontSize: "1.2rem" }}>{t("common.timeLeft")}:</span>
        </div>
        <div style={{ fontSize: "1.2rem" }}>{formatTime(time)}</div>
      </div>
      <Progress style={{ height: 6 }} value={(time / initTime) * 100} />
    </div>
  );
};

export default ProgressTime;
