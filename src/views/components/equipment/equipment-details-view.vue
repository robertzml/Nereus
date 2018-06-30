<template>
    <div class="equipment-details-view">

        <Form :model="equipmentInfo" :label-width="120">
            <Row>
                <Col span="7" push="1">
                    <FormItem label="序列号">
                        {{ equipmentInfo.serial_number }}
                    </FormItem>
                    <FormItem label="产品名称">
                        {{ equipmentInfo.product_name }}
                    </FormItem>
                    <FormItem label="产品代码">
                        {{ equipmentInfo.product_code }}
                    </FormItem>
                   
                    <FormItem label="激活状态">
                        {{ equipmentInfo.is_activate | activateState }}
                    </FormItem>
                    <FormItem label="激活日期">
                        {{ equipmentInfo.activate_date | displayDateTime }}
                    </FormItem>
                    <FormItem label="解锁状态">
                        {{ equipmentInfo.is_unlock | lockState }}
                    </FormItem>
                    <FormItem label="解锁日期">
                        {{ equipmentInfo.unlock_date | displayDateTime }}
                    </FormItem>
                    <FormItem label="使用截至日期">
                        {{ equipmentInfo.device_deadline_date | displayDateTime }}
                    </FormItem>

                    <FormItem label="状态">
                        {{ equipmentInfo.status | equipmentStatus }}
                    </FormItem>
                </Col>

                <Col span="8">
                    <FormItem label="设备主人">
                        {{ equipmentInfo.owner_name }}
                    </FormItem>
                    <FormItem label="手机号">
                        {{ equipmentInfo.owner_phone }}
                    </FormItem>
                    <FormItem label="省">
                        {{ equipmentInfo.owner_address_province }}
                    </FormItem>
                    <FormItem label="市">
                        {{ equipmentInfo.owner_address_city }}
                    </FormItem>
                    <FormItem label="区">
                        {{ equipmentInfo.owner_address_district }}
                    </FormItem>
                    <FormItem label="地址">
                        {{ equipmentInfo.owner_address_detail }}
                    </FormItem>

                    <FormItem label="消费者单位">
                        {{ equipmentInfo.owner_company_name }}
                    </FormItem>
                    
                    <FormItem label="第二联系人名称">
                        {{ equipmentInfo.owner_intendant_name }}
                    </FormItem>
                    <FormItem label="第二联系人电话">
                        {{ equipmentInfo.owner_intendant_phone }}
                    </FormItem>
                </Col>

                <Col span="8">
                    <FormItem label="厂商名称">
                        {{ equipmentInfo.vendor_company_name }}
                    </FormItem>
                    <FormItem label="代理商名称">
                        {{ equipmentInfo.agent_company_name }}
                    </FormItem>

                    <FormItem label="安装人名称">
                        {{ equipmentInfo.erector_name }}
                    </FormItem>
                    <FormItem label="安装人电话">
                        {{ equipmentInfo.erector_phone }}
                    </FormItem>

                    <FormItem label="代理商业务员名称">
                        {{ equipmentInfo.agent_account_name }}
                    </FormItem>
                    <FormItem label="代理商业务员电话">
                        {{ equipmentInfo.agent_account_phone }}
                    </FormItem>
                </Col>
                
            </Row>
        </Form>

        <div v-if="false">
            <FormItem label="销售类型">
                {{ equipmentInfo.pay_type | payType }}
            </FormItem>
            <FormItem label="销售别名">
                {{ equipmentInfo.another_name }}
            </FormItem>

            <FormItem label="租金类型">
                {{ equipmentInfo.charge_type | chargeType }}
            </FormItem>
            <FormItem label="分期期数">
                {{ equipmentInfo.divided_pay_pers }}
            </FormItem>
            <FormItem label="交费详细">
                {{ equipmentInfo.fix_month_rent }}
            </FormItem>
            <FormItem label="每期时间(月)">
                {{ equipmentInfo.set_time_divided_pay_pers }}
            </FormItem>
            <FormItem label="设备安装费">
                {{ equipmentInfo.installation_charge }}
            </FormItem>
            <FormItem label="设备押金">
                {{ equipmentInfo.device_deposit }}
            </FormItem>

            <FormItem label="充值金额">
                {{ equipmentInfo.prepay_rent }}
            </FormItem>
            <FormItem label="充值优惠券">
                {{ equipmentInfo.prepay_coupon }}
            </FormItem>

            <FormItem label="免费天数">
                {{ equipmentInfo.set_free_time }}
            </FormItem>
        </div>
    </div>
</template>

<script>
import equipment from '@/controllers/equipment.js'

export default {
    name: 'equipment-details-view',
    props: {
         equipmentInfo: { required: true }
    },
    filters: {
        activateState: function (isActivate) {
            return isActivate ? '已激活' : '未激活'
        },
        lockState: function (isUnlock) {
            return isUnlock ? '已解锁' : '未解锁'
        },
        equipmentStatus: function (status) {
            switch (status) {
                case 0:
                    return '正常'
                case 1:
                    return '删除'
                case 2:
                    return '申请注销'
                case 3:
                    return '已注销'
            }
        }
    },
    data () {
        return {
            id: 0
        }
    },
    methods: {
    }
}
</script>
