/* the nereus common function */

export const displayCompanyType = (type) => {
    switch (type) {
        case 1:
            return '平台'
        case 2:
            return '厂商'
        case 3:
            return '代理商'
    }
}
