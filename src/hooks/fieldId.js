import { t } from 'i18next'

const fieldId = (id) => {

    switch (id) {
        case 1:
            return t('name').toUpperCase()
        case 2:
            return t('last_name').toUpperCase()
        case 3:
            return t('second_last_name').toUpperCase()
        case 4:
            return t('email').toUpperCase()
        case 5:
            return t('phone_number').toUpperCase()
        case 6:
            return t('gender').toUpperCase()
        case 7:
            return t('status').toUpperCase()
        case 8:
            return t('user_type').toUpperCase()
        case 9:
            return t('dob').toUpperCase()
        case 10:
            return t('extra_data').toUpperCase()
        case 21:
            return t('brand').toUpperCase()
        case 22:
            return t('color').toUpperCase()
        case 23:
            return t('model').toUpperCase()
        case 24:
            return t('plate').toUpperCase()
        case 25:
            return t('serial_number').toUpperCase()
        case 26:
            return t('sub_brand').toUpperCase()
        case 27:
            return t('vin').toUpperCase()
        case 28:
            return t('tag').toUpperCase()
        case 31:
            return t('name').toUpperCase()
        case 32:
            return t('serial_number').toUpperCase()
        case 33:
            return t('device_type').toUpperCase()
        case 34:
            return t('zone').toUpperCase()
        case 41:
            return t('user').toUpperCase()
        case 42:
            return t('device').toUpperCase()
        case 43:
            return t('zone').toUpperCase()
        case 44:
            return t('access_method').toUpperCase()
        case 45:
            return t('created_at').toUpperCase()
        case 46:
            return t('success').toUpperCase()
        case 51:
            return t('vehicle').toUpperCase()
        case 52:
            return t('device').toUpperCase()
        case 53:
            return t('zone').toUpperCase()
        case 54:
            return t('access_method').toUpperCase()
        case 55:
            return t('created_at').toUpperCase()
        case 56:
            return t('success').toUpperCase()
        case 57:
            return t('department').toUpperCase()
        case 58:
            return t('document').toUpperCase()
        case 59:
            return t('department').toUpperCase()
        case 60:
            return t('document').toUpperCase()
        case 61:
            return t('department').toUpperCase()
        case 62:
            return t('document').toUpperCase()
        case 63:
            return t('department').toUpperCase()
        case 64:
            return t('document').toUpperCase()
        case 65:
            return t('document').toUpperCase()
        case 66:
            return t('department').toUpperCase()
        case 67:
            return t('name').toUpperCase()
        case 68:
            return t('name').toUpperCase()
        case 69:
            return t('name').toUpperCase()
        case 70:
            return t('name').toUpperCase()
        case 71:
            return t('contractor').toUpperCase()
        case 72:
            return t('start_date').toUpperCase()
        case 73:
            return t('end_date').toUpperCase()
        case 74:
            return t('status').toUpperCase()
        case 75:
            return t('folio').toUpperCase()
        case 76:
            return t('status').toUpperCase()
        case 77:
            return t('folio').toUpperCase()
        case 78:
            return t('supplier').toUpperCase()
        case 79:
            return t('supplier_employee').toUpperCase()
        case 80:
            return t('supplier_vehicle').toUpperCase()
        case 81:
            return t('user_received').toUpperCase()
        case 82:
            return t('item').toUpperCase()
        case 83:
            return t('delivery_date').toUpperCase()
        case 84:
            return t('role').toUpperCase()
        case 85:
            return t('user').toUpperCase()
        case 86:
            return t('zone').toUpperCase()
        case 87:
            return t('created_at').toUpperCase()
        case 88:
            return t('notification_type').toUpperCase()
        case 89:
            return t('user').toUpperCase()
        // contractor user
        case 91:
            return t('name').toUpperCase()
        case 92:
            return t('last_name').toUpperCase()
        case 93:
            return t('second_last_name').toUpperCase()
        case 94:
            return t('email').toUpperCase()
        case 95:
            return t('phone_number').toUpperCase()
        case 96:
            return t('gender').toUpperCase()
        case 97:
            return t('status').toUpperCase()
        case 98:
            return t('user_type').toUpperCase()
        case 99:
            return t('dob').toUpperCase()
        case 100:
            return t('extra_data').toUpperCase()
        case 101:
            return t('contractor_company_name').toUpperCase()
        case 102:
            return t('acronym').toUpperCase()
        case 103:
            return t('contractor_status').toUpperCase()
        //supplier user
        case 104:
            return t('name').toUpperCase()
        case 105:
            return t('last_name').toUpperCase()
        case 106:
            return t('second_last_name').toUpperCase()
        case 107:
            return t('email').toUpperCase()
        case 108:
            return t('phone_number').toUpperCase()
        case 109:
            return t('gender').toUpperCase()
        case 110:
            return t('status').toUpperCase()
        case 111:
            return t('user_type').toUpperCase()
        case 112:
            return t('dob').toUpperCase()
        case 113:
            return t('extra_data').toUpperCase()
        case 114:
            return t('supplier_company_name').toUpperCase()
        case 115:
            return t('acronym').toUpperCase()
        case 116:
            return t('status').toUpperCase()
        // employeeUser Filter
        case 117:
            return t('name').toUpperCase() 
        case 118:
            return t('last_name').toUpperCase()
        case 119:
            return t('second_last_name').toUpperCase()
        case 120:
            return t('email').toUpperCase()
        case 121:
            return t('phone_number').toUpperCase()
        case 122: 
            return t('gender').toUpperCase()
        case 123:
            return t('status').toUpperCase()
        case 124:
            return t('user_type').toUpperCase()
        case 125:
            return t('dob').toUpperCase()
        case 126:
            return t('extra_data').toUpperCase()
        case 127:
            return t('employee_id').toUpperCase() //employee
        case 128:
            return t('role').toUpperCase()  //employee
        case 129:
            return t('department').toUpperCase()    //employee
        case 130:
            return t('work_station').toUpperCase()  //employee
        case 131:
            return t('start_date').toUpperCase()    //employee
        case 132:
            return t('end_date').toUpperCase()  //employee
        default:
            return "none"
    }
}

export default fieldId