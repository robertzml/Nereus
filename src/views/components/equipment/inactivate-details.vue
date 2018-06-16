<template>
    <Row>
        <Col span="24">
            <Form :model="info" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="消费者名称">
                            {{ info.owner_name }}
                        </FormItem>
                        <FormItem label="消费者电话">
                            {{ info.owner_phone }}
                        </FormItem>
                        <FormItem label="管理员名称">
                            {{ info.owner_intendant_name }}
                        </FormItem>
                        <FormItem label="管理员电话">
                            {{ info.owner_intendant_phone }}
                        </FormItem>
                        <FormItem label="消费者单位">
                            {{ info.owner_company_name }}
                        </FormItem>
                        <FormItem label="省">
                            {{ info.owner_address_province }}
                        </FormItem>
                        <FormItem label="市">
                            {{ info.owner_address_city }}
                        </FormItem>
                        <FormItem label="区">
                            {{ info.owner_address_district }}
                        </FormItem>

                        <FormItem label="详细地址">
                            {{ info.owner_address_detail }}
                        </FormItem>

                        <FormItem label="安装人名称">
                            {{ info.erector_name }}
                        </FormItem>

                        <FormItem label="安装人电话">
                            {{ info.erector_phone }}
                        </FormItem>
                        <FormItem label="代理商业务员名称">
                            {{ info.agent_account_name }}
                        </FormItem>
                        <FormItem label="代理商业务员电话">
                            {{ info.agent_account_phone }}
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="序列号">
                            {{ info.serial_number }}
                        </FormItem>

                        <FormItem label="销售类型">
                            {{ info.pay_type | payType }}
                        </FormItem>
                        <FormItem label="销售别名">
                            {{ info.another_name }}
                        </FormItem>
                        <FormItem label="租金类型">
                            {{ info.charge_type | chargeType }}
                        </FormItem>
                        <FormItem label="分期期数">
                            {{ info.divided_pay_pers }}
                        </FormItem>
                        <FormItem label="交费详细">
                            {{ info.fix_month_rent }}
                        </FormItem>
                        <FormItem label="分期详细">
                            {{ info.set_time_divided_pay_pers }}
                        </FormItem>                      

                        <FormItem label="设备安装费">
                            {{ info.installation_charge }}
                        </FormItem>
                        <FormItem label="设备押金">
                            {{ info.device_deposit }}
                        </FormItem>
                        <FormItem label="充值金额">
                            {{ info.prepay_rent }}
                        </FormItem>
                        <FormItem label="充值优惠券">
                            {{ info.prepay_coupon }}
                        </FormItem>

                        <FormItem label="创建时间">
                            {{ info.create_date | displayDateTime }}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Col>
    </Row>
</template>


<script>
import equipment from '@/controllers/equipment.js'

export default {
    name: 'inactivate-details',
    props: {
    },
    data () {
        return {
            id: 0,
            serailNumber: '',
            info: {}
        }
    },
    methods: {
        getInfo (id, serialNumber) {
            let vm = this
            this.id = id
            this.serailNumber = serialNumber

            equipment.getInactivateDetails(id, serialNumber).then(res => {
                if (res.status === 0) {
                    vm.info = res.entity
                }
            })
        }
    }
}
</script>
