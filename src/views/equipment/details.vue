<template>
    <div>
        <Card>
            <p>
                <Icon type="ios-cloudy-outline"></Icon><span>设备序列号: </span><span style="margin-right:10px;">{{ equipmentInfo.serial_number }}</span>
                <Icon type="ios-person"></Icon><span>设备主人: </span><span>{{ equipmentInfo.owner_name }}</span>
            </p>
        </Card>
        <Tabs>
            <TabPane label="设备信息">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        设备信息
                    </p>
                    <a href="#" slot="extra" @click.prevent="refresh">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <equipment-details-view :equipment-info="equipmentInfo"></equipment-details-view>
                   
                    <Button type="primary" @click="toIndex">返回</Button>
                </Card>
            </TabPane>
            <TabPane label="实时状态">
                <Row :gutter="16">
                    <Col span="12">
                        <div v-if="equipmentInfo.product_type_code === '1'">
                            <equipment-status :serial_number="equipmentInfo.serial_number"></equipment-status>
                        </div>
                        <div v-else-if="equipmentInfo.product_type_code === '2'">
                            <water-cleaner-status :serial_number="equipmentInfo.serial_number"></water-cleaner-status>
                        </div>
                    </Col>
                    <Col span="12" >
                        <div v-if="equipmentInfo.product_type_code === '1'">
                            <equipment-key :serial_number="equipmentInfo.serial_number"></equipment-key>
                        </div>
                        <div v-else-if="equipmentInfo.product_type_code === '2'">
                            <water-cleaner-key :serial_number="equipmentInfo.serial_number"></water-cleaner-key>
                        </div>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="销售规则">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        销售规则信息
                    </p>

                    <sale-rule-details :sale-rule-info="saleRuleInfo"></sale-rule-details>
                </Card>
            </TabPane>
            <TabPane label="设备操作">
                <Row :gutter="16">
                    <Col span="12">
                         <Card>
                            <p slot="title">
                                <Icon type="grid"></Icon>
                                中途结算
                            </p>

                            <Form ref="formSettle" inline>                               
                                <FormItem>
                                    <Poptip
                                        confirm
                                        title="是否执行中途结算?"
                                        @on-ok="handleSettle('formSettle')"
                                        @on-cancel="cancelSettle">
                                        <Button>结算</Button>
                                    </Poptip>
                                </FormItem>
                            </Form>                          
                        </Card>
                    </Col>

                    <Col span="12">
                        <Card>
                            <p slot="title">
                                <Icon type="grid"></Icon>
                                设备解锁
                            </p>

                            <Form ref="formLock" :model="equipmentLock" :rules="ruleLock" inline>
                                <FormItem prop="deadline">
                                    <DatePicker type="date" placeholder="选择日期" :options="deadlineOptions" v-model="equipmentLock.deadline"></DatePicker>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleLock('formLock')">解锁</Button>
                                </FormItem>
                                <FormItem>
                                    <Button type="warning" @click="handleLockNow()">立即锁定</Button>
                                </FormItem>
                            </Form>

                            <br />
                            
                            <Button type="primary" @click="inactivate" v-if="equipmentInfo.status === 2">同意注销</Button>
                        </Card>
                    </Col>

                    <Col span="12">
                        <update-owner :serial-number="equipmentInfo.serial_number"></update-owner>
                    </Col>
                </Row>
            </TabPane>
            <TabPane label="账单记录">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        设备账单
                    </p>

                    <div v-if="equipmentInfo.product_type_code === '1'">
                        <equipment-bill :item-list="billInfo"></equipment-bill>
                    </div>
                    <div v-else-if="equipmentInfo.product_type_code === '2'">
                        <water-cleaner-bill :item-list="billInfo"></water-cleaner-bill>
                    </div>
                </Card>
            </TabPane>
            <TabPane label="设备统计">
                <div v-if="equipmentInfo.product_type_code === '1'">
                    <water-heater-statistic :month-info="waterHeaterStatisticMonthInfo" :total-info="waterHeaterStatisticTotalInfo" :serial-number="equipmentInfo.serial_number"></water-heater-statistic>
                </div>
                <div v-else-if="equipmentInfo.product_type_code === '2'">
                    <water-cleaner-statistic :month-info="waterCleanerStatisticMonthInfo" :total-info="waterCleanerStatisticTotalInfo" :serial-number="equipmentInfo.serial_number"></water-cleaner-statistic>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import equipment from '@/controllers/equipment.js'
import product from '@/controllers/product.js'
import statistic from '@/controllers/statistic.js'
import equipmentDetailsView from '../components/equipment/equipment-details-View.vue'
import equipmentStatus from '../components/equipment/equipment-status.vue'
import equipmentKey from '../components/equipment/equipment-key.vue'
import waterCleanerKey from '../components/equipment/water-cleaner-key.vue'
import waterCleanerStatus from '../components/equipment/water-cleaner-status.vue'
import saleRuleDetails from '../components/saleRule/sale-rule-details.vue'
import equipmentBill from '../components/equipment/equipment-bill.vue'
import waterCleanerBill from '../components/equipment/water-cleaner-bill.vue'
import waterHeaterStatistic from '../components/statistic/water-heater-statistic.vue'
import waterCleanerStatistic from '../components/statistic/water-cleaner-statistic.vue'
import updateOwner from '../components/equipment/update-owner.vue'
import moment from 'moment'

export default {
    name: 'equipment-details',
    components: {
        equipmentDetailsView,
        equipmentStatus,
        equipmentKey,
        waterCleanerKey,
        waterCleanerStatus,
        saleRuleDetails,
        equipmentBill,
        waterCleanerBill,
        waterHeaterStatistic,
        waterCleanerStatistic,
        updateOwner
    },
    data () {
        return {
            equipmentId: 0,
            roleType: 0,
            equipmentInfo: {},
            saleRuleInfo: {},
            billInfo: [],
            equipmentLock: {
                deadline: ''
            },
            equipmentTrade: {
                tradeInMoney: 0
            },
            ruleLock: {
                deadline: [
                    { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                ]
            },
            deadlineOptions: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000
                }
            },
            waterHeaterStatisticMonthInfo: {},
            waterHeaterStatisticTotalInfo: {},
            waterCleanerStatisticMonthInfo: {},
            waterCleanerStatisticTotalInfo: {}
        }
    },
    filters: {
        displayDateTime: function (date) {
            if (date === null || date === '') {
                return ''
            } else {
                return moment(date).format('YYYY-MM-DD HH:mm:ss')
            }
        },
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
    methods: {
        init () {
            this.equipmentInfo = {}
            this.roleType = this.$store.state.user.roleType
            this.equipmentId = this.$route.params.id
            this.getEquipmentInfo(this.equipmentId)
        },
        
        getEquipmentInfo (id) {
            let vm = this
            equipment.detailsView(id).then(res => {
                if (res.status === 0) {
                    vm.equipmentInfo = res.entity
                    vm.getSaleRuleInfo()

                    if (vm.equipmentInfo.product_type_code === '1') {
                        vm.getWaterHeaterStatistic()
                        vm.getBillInfo()
                    } else if (vm.equipmentInfo.product_type_code === '2') {
                        vm.getWaterCleanerStatistic()
                        vm.getWaterCleanerBillnfo()
                    }
                } else {
                    this.$Notice.error({
                        title: '获取设备信息失败',
                        desc: res.message
                    })
                }
            })
        },

        getWaterInfo1 () {
            equipment.getWaterCleanerLockStatus(this.equipmentInfo.serial_number).then(res => {
                console.log(res)
            })
        },

        getWaterInfo2 () {
            equipment.getWaterCleanerStatus(this.equipmentInfo.serial_number).then(res => {
                console.log(res)
            })
        },

        getSaleRuleInfo () {
            let vm = this

            product.findSaleRule(this.equipmentInfo.product_sale_rule_id).then(res => {
                if (res.status === 0) {
                    vm.saleRuleInfo = res.entity
                } else {
                    this.$Notice.error({
                        title: '获取销售规则失败',
                        desc: res.message
                    })
                }
            })
        },

        getBillInfo () {
            let vm = this

            equipment.getBillList(this.equipmentInfo.serial_number).then(res => {
                if (res.status === 0) {
                    vm.billInfo = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取账单记录失败',
                        desc: res.message
                    })
                }
            })
        },

        getWaterCleanerBillnfo () {
            let vm = this

            equipment.getWaterCleanerBillList(this.equipmentInfo.serial_number).then(res => {
                if (res.status === 0) {
                    vm.billInfo = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取账单记录失败',
                        desc: res.message
                    })
                }
            })
        },

        // 热水器统计信息
        getWaterHeaterStatistic () {
            let vm = this

            statistic.getWaterHeaterCurrent(this.equipmentInfo.serial_number).then(res => {
                if (res.status === 0) {
                    vm.waterHeaterStatisticMonthInfo = res.entity
                    vm.waterHeaterStatisticTotalInfo = res.entity_of_total
                } else {
                    this.$Notice.error({
                        title: '获取月统计失败',
                        desc: res.message
                    })
                }
            })

            /*
            statistic.getWaterHeaterTotal(this.equipmentInfo.serial_number).then(res => {
                if (res.status === 0) {
                    vm.waterHeaterStatisticTotalInfo = res.entity
                } else {
                    this.$Notice.error({
                        title: '获取总统计失败',
                        desc: res.message
                    })
                }
            })
            */
        },

        // 直饮机统计信息
        getWaterCleanerStatistic () {
            let vm = this

            statistic.getWaterCleanerCurrent(this.equipmentInfo.serial_number).then(res => {
                if (res.status === 0) {
                    vm.waterCleanerStatisticMonthInfo = res.entity
                } else {
                    this.$Notice.error({
                        title: '获取月统计失败',
                        desc: res.message
                    })
                }
            })

            statistic.getWaterCleanerTotal(this.equipmentInfo.serial_number).then(res => {
                if (res.status === 0) {
                    vm.waterCleanerStatisticTotalInfo = res.entity
                } else {
                    this.$Notice.error({
                        title: '获取总统计失败',
                        desc: res.message
                    })
                }
            })
        },

        refresh () {
            this.getEquipmentInfo(this.equipmentId)
        },

        toIndex () {
            this.$router.push({ name: 'equipment-index' })
        },

        activation () {
            let act = [{
                serial_number: this.equipmentInfo.serial_number,
                is_activate: 1
            }]
       
            equipment.activation(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '激活成功',
                        desc: res.message
                    })
                } else {
                    this.$Notice.error({
                        title: '激活失败',
                        desc: res.message
                    })
                }
            })
        },

        inactivate () {
            let act = [{
                serial_number: this.equipmentInfo.serial_number,
                apply_state: 1
            }]

            equipment.inactivate(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '注销成功',
                        desc: res.message
                    })
                } else {
                    this.$Notice.error({
                        title: '注销失败',
                        desc: res.message
                    })
                }
            })
        },

        handleSettle (name) {
            let act = {
                serial_number: this.equipmentInfo.serial_number
            }

            equipment.settle(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '结算成功',
                        desc: res.message
                    })
                } else {
                    this.$Notice.error({
                        title: '结算失败',
                        desc: res.message
                    })
                }
            })
        },

        cancelSettle () {
        },

        handleLock (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let act = [{
                        serial_number: this.equipmentInfo.serial_number,
                        is_activate: 1,
                        is_unlock: 1,
                        device_deadline_date: this.equipmentLock.deadline
                    }]

                    equipment.lock(act).then(res => {
                        if (res.status === 0) {
                            this.$Notice.success({
                                title: '解锁成功',
                                desc: res.message
                            })
                        } else {
                            this.$Notice.error({
                                title: '解锁失败',
                                desc: res.message
                            })
                        }
                    })
                }
            })
        },

        // 立即锁定
        handleLockNow () {
            let act = {
                serial_number: this.equipmentInfo.serial_number,
                is_unlock: 0
            }

            equipment.lockEquipment(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '锁定成功',
                        desc: res.message
                    })
                } else {
                    this.$Notice.error({
                        title: '锁定失败',
                        desc: res.message
                    })
                }
            })
        },

        handleTrade (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                     let act = {
                        serial_number: this.equipmentInfo.serial_number,
                        equipment_id: this.equipmentId,
                        trade_in_money: this.equipmentTrade.tradeInMoney
                    }

                     equipment.tradeIn(act).then(res => {
                        if (res.code === 0) {
                            this.$Notice.success({
                                title: '充值成功',
                                desc: res.message
                            })
                        } else {
                            this.$Notice.error({
                                title: '充值失败',
                                desc: res.message
                            })
                        }
                    })
                }
            })
        }
    },
    mounted: function () {
        this.init()
    },
    deactivated: function () {
    }
}
</script>

<style scoped>
.ivu-form-item .ivu-form-item-label {
    font-weight: 1000;
}
</style>
