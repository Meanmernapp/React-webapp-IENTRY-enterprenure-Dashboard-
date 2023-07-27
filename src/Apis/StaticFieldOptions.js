import { t } from 'i18next'

export const fieldOptions = {
    deviceType: {
      1: "MANTRA MFSTAB II",
      2: "PDA CARIBE PL50L",
      3: "TELPO F6",
      4: "TELPO TPS 980",
      5: "TELPO TPS 450",
      6: "TELPO K5",
      7: "TELPO F10"
    },
    gender: {
        1: t("male"),
        2: t("female")
    },
    status: {
        1: t("pre_registered"),
        2: t("to_change_password"),
        3: t("to_approve_documentS"),
        4: t("active"),
        5: t("on_vacations"),
        6: t("in_active")
    }
  };