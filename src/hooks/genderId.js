import { t } from 'i18next'

const genderId = (id) => {

    switch (id) {
        case 1:
            return t("male")
        case 2:
            return t("female")
        case 3:
            return t("other")
        default:
            return "none"
    }
}

export default genderId