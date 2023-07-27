import { t } from 'i18next'

const deviceTypeId = (id) => {

    switch (id) {
        case 1:
            return t('MANTRA MFSTAB II')
        case 2:
            return t('PDA CARIBE PL50L')
        case 3:
            return t('TELPO F6')
        case 4:
            return t('TELPO TPS 980')
        case 5:
            return t('TELPO TPS 450')
        case 6:
            return t('TELPO K5')
        case 7:
            return t('TELPO F10')
        default:
            return "none"
    }
}

export default deviceTypeId