import { t } from 'i18next'

const statusId = (id) => {

    switch (id) {
        case 1:
            return t("pre_registered")
        case 2:
            return t("to_change_password")
        case 3:
            return t("to_approve_documentS")
        case 4:
            return t("active")
        case 5:
            return t("on_vacations")
        case 6:
            return t("in_active")
        case 22:
            return t("contract_active")
        case 23:
            return t("contract_cancel")
        default:
            return "none"
    }
}

export default statusId