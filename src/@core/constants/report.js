export const STUDYSET_REPORT_TYPES = (t) => [
  {
    value: 1,
    label: t("common.reports.inacurrateInfomation"),
  },
  {
    value: 2,
    label: t("common.reports.InappropriateContent"),
  },
  {
    value: 3,
    label: t("common.reports.ifraudulentPurposes"),
  },
  {
    value: 4,
    label: t("common.reports.intellectualPropertyRights"),
  },
  {
    value: 5,
    label: t("common.reports.other"),
  },
];

export const STUDYSET_REPORT_TYPES_MODERATE = (t) => [
  {
    value: 1,
    label: `1. ${t("common.reports.inacurrateInfomationShort")}`,
  },
  {
    value: 2,
    label: `2. ${t("common.reports.InappropriateContentShort")}`,
  },
  {
    value: 3,
    label: `3. ${t("common.reports.ifraudulentPurposesShort")}`,
  },
  {
    value: 4,
    label: `4. ${t("common.reports.intellectualPropertyRightsShort")}`,
  },
  {
    value: 5,
    label: `5. ${t("common.reports.other")}`,
  },
];

export const STATUS_MODERATE = () => [
  {
    value: 0,
    label: t("common.reports.pending"),
  },
  {
    value: 1,
    label: t("common.reports.accepted"),
  },
  {
    value: 2,
    label: t("common.reports.rejected"),
  },
];
