import { t } from 'i18next'

const conditionId = (id) => {

    switch (id) {
        case 1:
            return t('equal').toUpperCase()
        case 2:
            return t('less_than').toUpperCase()
        case 3:
            return t('less_than_equal').toUpperCase()
        case 4:
            return t('greater_than').toUpperCase()
        case 5:
            return t('greater_than_equal').toUpperCase()
        case 6:
            return t('between').toUpperCase()
        case 7:
            return t('not_between').toUpperCase()
        case 8:
            return t('in').toUpperCase()
        case 9:
            return t('not_in').toUpperCase()
        case 10:
            return t('less_than').toUpperCase()
        case 11:
            return t('less_than_equal').toUpperCase()
        case 12:
            return t('greater_than').toUpperCase()
        case 13:
            return t('greater_than_equal').toUpperCase()
        case 14:
            return t('between').toUpperCase()
        case 15:
            return t('not_between').toUpperCase()
        case 16:
            return t('equal').toUpperCase()
        case 17:
            return t('not_equal').toUpperCase()
        case 18:
            return t('in').toUpperCase()
        case 19:
            return t('not_in').toUpperCase()
        case 20:
            return t('equal').toUpperCase()
        case 21:
            return t('not_equal').toUpperCase()
        case 22:
            return t('in').toUpperCase()
        case 23:
            return t('not_in').toUpperCase()
        case 24:
            return t('begins_with').toUpperCase()
        case 25:
            return t('does_not_begin_with').toUpperCase()
        case 26:
            return t('contains').toUpperCase()
        case 27:
            return t('does_not_contain').toUpperCase()
        case 28:
            return t('ends_with').toUpperCase()
        case 29:
            return t('does_not_ends_with').toUpperCase()
        case 30:
            return t('null').toUpperCase()
        case 31:
            return t('not_null').toUpperCase()
        case 32:
            return t('equal').toUpperCase()
        case 33:
            return t('not_equal').toUpperCase()
        case 34:
            return t('in').toUpperCase()
        case 35:
            return t('not_in').toUpperCase()
        case 36:
            return t('null').toUpperCase()
        case 37:
            return t('not_null').toUpperCase()
        default:
            return "none"
    }
}

export default conditionId