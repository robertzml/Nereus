/* the nereus common function */

import productType from '../controllers/product-type.js'
import company from '../controllers/company.js'

export const displayCompanyType = (type) => {
    switch (type) {
        case 1:
            return '平台'
        case 2:
            return '厂商'
        case 3:
            return '代理商'
        default:
            return ''
    }
}

export const getProductTypeName = (typeId) => {
    return productType.details(typeId).then(res => {
        if (res.status === 0) {
            return res.entity.name
        } else {
            return ''
        }
    })
}

export const getCompanyName = (companyId) => {
    return company.details(companyId).then(res => {
        if (res.status === 0) {
            return res.entity.name
        } else {
            return ''
        }
    })
}
