export const ACTION_MEMBERS = (t) => [
  {
    value: 0,
    label: t("common.classroom.sendEmail"),
  },
  {
    value: 1,
    label: t("common.classroom.removeFromClass"),
  },
];

export const QUESTION_TYPES_OPTIONS = (t) => [
  {
    value: "single",
    label: t("common.classroom.singleChoice"),
  },
  {
    value: "multiple",
    label: t("common.classroom.multipleChoice"),
  },
];

export const LIMIT_ANSWER_OPTIONS = (t) => [
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3,
  },
  {
    value: 4,
    label: 4,
  },
];
