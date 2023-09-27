import { useTranslation } from "react-i18next";

import style from "./style.module.scss";
import classNames from "classnames";
import { useState } from "react";

const Classroom = () => {
  const { t } = useTranslation();
  const [isOke, setIsOke] = useState(true);

  return (
    <div
      className={classNames({
        [style.container]: isOke,
      })}
    >
      {t("validationMessage.required", { field: "Phone" })}
    </div>
  );
};

export default Classroom;
