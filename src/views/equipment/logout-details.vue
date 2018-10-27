<template>
    <div id="logout-details">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                待注销设备详情
            </p>

            <Row>
                <Col span="10" push="2">
                    <Form :model="info" :label-width="120">
                        <FormItem label="设备主人姓名">
                            {{ info.owner_name }}
                        </FormItem>
                        <FormItem label="设备主人手机号">
                            {{ info.owner_phone }}
                        </FormItem>
                        <FormItem label="设备用户省地址">
                            {{ info.owner_address_province }}
                        </FormItem>
                        <FormItem label="设备用户市地址">
                            {{ info.owner_address_city }}
                        </FormItem>
                        <FormItem label="设备用户区地址">
                            {{ info.owner_address_district }}
                        </FormItem>
                        <FormItem label="设备用户详细地址">
                            {{ info.owner_address_detail }}
                        </FormItem>
                    </Form>
                </Col>
                <Col span="12">
                     <Form :model="info" :label-width="120">
                        <FormItem label="设备主人钱包金额">
                            {{ consumer_wallet.wallet_amount }}
                        </FormItem>
                        <FormItem label="设备主人钱包优惠券">
                            {{ consumer_wallet.waller_coupon }}
                        </FormItem>

                        <FormItem label="扣款后退还押金金额(若为负数则表示死账金额)" class='imp' style="font-weight: bold; color: #F00;">
                            {{ return_equipment_deposit }}
                        </FormItem>
                        <FormItem label="总应付金额">
                            {{ equipment_total_unpaid_bill }}
                        </FormItem>

                        <FormItem label="是否够扣款状态" style="font-weight: bold; color: #F00;">
                            {{ is_enough_money === 1 ? '是' : '否' }}
                        </FormItem>

                        <FormItem label="设备押金">
                            {{ equipment_deposit }}
                        </FormItem>
                     </Form>
                </Col>
            </Row>
            
            <Row>
                <Col span="24">
                    <Table :data="billData" :columns="columns" border stripe>
                    </Table>
                </Col>
            </Row>

            <br />

            <p>
                <Button type="primary" @click="toIndex" style="margin-left: 8px">返回</Button>

                <Poptip
                    confirm
                    title="是否确认注销"
                    :transfer='true'
                    placement='top'
                    @on-ok="agree">
                    <Button type='warning' :loading="loading">注销</Button>
                </Poptip>
            </p>
        </Card>
    </div>
</template>

<script>
import equipment from '@/controllers/equipment.js'
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'equipment-logout-details',
    data () {
        return {
            serialNumber: '',
            info: {},
            return_equipment_deposit: 0,
            equipment_total_unpaid_bill: 0,
            is_enough_money: 0,
            equipment_deposit: 0,
            consumer_wallet: {},
            loading: false,
            billData: [],
            columns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序列号',
                    key: 'serial_number'
                },
                {
                    title: '应付金额',
                    key: 'money_to_consumer'
                },
                {
                    title: '账单月份',
                    key: 'statistics_year_month'
                },
                {
                    title: '账单计算开始日期',
                    key: 'statistics_number_of_periods_start',
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.statistics_number_of_periods_start) 
                        )
                    }
                },
                {
                    title: '账单计算截至日期',
                    key: 'statistics_number_of_periods_end',
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.statistics_number_of_periods_end)
                        )
                    }
                }
            ]
        }
    },
    methods: {
        init () {
            this.serialNumber = this.$route.params.serialNumber
            
            this.loadDetails()
        },

        loadDetails () {
            let vm = this
            equipment.getLogoutDetails(this.serialNumber).then(res => {
                if (res.status === 0) {
                    vm.info = res.entity

                    vm.return_equipment_deposit = res.return_equipment_deposit
                    vm.equipment_total_unpaid_bill = res.equipment_total_unpaid_bill
                    vm.is_enough_money = res.is_enough_money
                    vm.equipment_deposit = res.equipment_deposit
                    vm.consumer_wallet = res.map_consumer_wallet

                    vm.billData = res.list_equipment_unpaid_bill
                } else {
                    this.$Notice.error({
                        title: '获取数据失败',
                        desc: res.message,
                        duration: 5
                    })
                }
            })
        },

        toIndex () {
            this.$router.push({ name: 'equipment-logout' })
        },

        agree () {
            let vm = this
            let act = [{
                serial_number: this.serialNumber,
                apply_state: 1
            }]
            this.loading = true
       
            equipment.inactivate(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '注销成功',
                        desc: res.message,
                        duration: 5
                    })
                    vm.loading = false

                    this.$router.push({ name: 'equipment-logout' })
                } else {
                    this.$Notice.error({
                        title: '注销失败',
                        desc: res.message,
                        duration: 5
                    })
                    vm.loading = false
                }
            })
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>

<style scoped>
.imp .ivu-form-item-label {
    color: #FF0000;
}
</style>
