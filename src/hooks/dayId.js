import { t } from 'i18next'

const dayId = (id) => {

    switch (id) {
        case 0:
            return t("sunday")?.toUpperCase()
        case 1:
            return t("monday")?.toUpperCase()
        case 2:
            return t("tuesday")?.toUpperCase()
        case 3:
            return t("wednesday")?.toUpperCase()
        case 4:
            return t("thursday")?.toUpperCase()
        case 5:
            return t("firday")?.toUpperCase()
        case 6:
            return t("saturday")?.toUpperCase()
        default:
            return "-"
    }
}

export default dayId