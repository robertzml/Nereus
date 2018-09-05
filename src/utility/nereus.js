/* the nereus common function */

import productType from '../controllers/product-type.js'
import company from '../controllers/company.js'
import moment from 'moment'

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

export const displayDateTime = (date) => {
    if (date === null || date === '') {
        return ''
    } else {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
}

export const displayDate = (date) => {
    if (date === null || date === '') {
        return ''
    } else {
        return moment(date).format('YYYY-MM-DD')
    }
}

export const displayStatus = (status) => {
    switch (status) {
        case 0:
            return '正常'
        case 1:
            return '删除'
        case 2:
            return '禁用'
        default:
            return ''
    }
}

// 销售合同类型
export const payType = (val) => {
    switch (val) {
        case 1:
            return '一次性购买'
        case 2:
            return '分期付款'
        case 3:
            return '租金'
        case 4:
            return '浮动分期'
        default:
            return '未定义'
    }
}

//  租金类型
export const chargeType = (val) => {
    switch (val) {
        case 1:
            return '固定租金'
        case 2:
            return '混合租金'
        case 3:
            return '节能分享'
        case 4:
            return '浮动租金'
        default:
            return '未定义'
    }
}

// 付费类型
export const paymentType = (val) => {
    switch (val) {
        case 0:
            return '微信支付'
        case 1:
            return '支付宝支付'
        case 2:
            return '平台充值'
        case 3:
            return '自动付款'
        case 4:
            return '用户付款'
        case 5:
            return '平台付款'
        case 6:
            return '平台红冲'
        default:
            return ''
    }
}

// 交易种类
export const moneyType = (val) => {
    switch (val) {
        case -2:
            return '注销期间数据'
        case -1:
            return '免费期'
        case 1:
            return '一次性付款'
        case 2:
            return '分期付款'
        case 31:
            return '固定租金'
        case 32:
            return '混合租金'
        case 33:
            return '节能分享'
        case 34:
            return '浮动租金'
        case 4:
            return '浮动分期'
    }
}

//  交易结果
export const moneyTradeResult = (val) => {
    switch (val) {
        case -2:
            return '免费期待交易'
        case -1:
            return '不需要交易'
        case 0:
            return '交易待处理'
        case 1:
            return '交易成功'
        case 2:
            return '交易失败'
    }
}
