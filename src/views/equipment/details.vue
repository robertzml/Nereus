<template>
    <div>
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

                    <Form :model="equipmentInfo" :label-width="100">
                        <Row>
                            <Col span="10" push="4">
                                <FormItem label="序列号">
                                    {{ equipmentInfo.serial_number }}
                                </FormItem>
                                <FormItem label="产品名称">
                                    {{ equipmentInfo.product_name }}
                                </FormItem>
                                <FormItem label="产品代码">
                                    {{ equipmentInfo.product_code }}
                                </FormItem>
                                <FormItem label="厂商名称">
                                    {{ equipmentInfo.vendor_company_name }}
                                </FormItem>
                                <FormItem label="代理商名称">
                                    {{ equipmentInfo.agent_company_name }}
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

                                <FormItem>
                                    <Button type="primary" @click="toIndex">返回</Button>
                                </FormItem>
                            </Col>
                            <Col span="10">
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
                                <FormItem label="状态">
                                    {{ equipmentInfo.status | equipmentStatus }}
                                </FormItem>

                                <FormItem label="消费者名称">
                                    {{ equipmentInfo.owner_name }}
                                </FormItem>
                                <FormItem label="消费者电话">
                                    {{ equipmentInfo.owner_phone }}
                                </FormItem>
                                <FormItem label="管理员名称">
                                    {{ equipmentInfo.owner_intendant_name }}
                                </FormItem>
                                <FormItem label="管理员电话">
                                    {{ equipmentInfo.owner_intendant_phone }}
                                </FormItem>

                                <FormItem label="消费者单位">
                                    {{ equipmentInfo.owner_company_name }}
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
                        </Row>
                    </Form>
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
                <Row>
                    <Col span="24">
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
                            </Form>

                            <br />
                            
                            <Button type="primary" @click="inactivate" v-if="equipmentInfo.status === 2">同意注销</Button>
                        </Card>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import equipment from '@/controllers/equipment.js'
import product from '@/controllers/product.js'
import equipmentStatus from '../components/equipment/equipment-status.vue'
import equipmentKey from '../components/equipment/equipment-key.vue'
import waterCleanerKey from '../components/equipment/water-cleaner-key.vue'
import waterCleanerStatus from '../components/equipment/water-cleaner-status.vue'
import saleRuleDetails from '../components/saleRule/sale-rule-details.vue'
import moment from 'moment'

export default {
    name: 'equipment-details',
    components: {
        equipmentStatus,
        equipmentKey,
        waterCleanerKey,
        waterCleanerStatus,
        saleRuleDetails
    },
    data () {
        return {
            equipmentId: 0,
            equipmentInfo: {},
            saleRuleInfo: {},
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
            }
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
            this.equipmentId = this.$route.params.id
            this.getEquipmentInfo(this.equipmentId)
        },
        
        getEquipmentInfo (id) {
            let vm = this
            equipment.detailsView(id).then(res => {
                if (res.status === 0) {
                    vm.equipmentInfo = res.entity
                    // vm.getWaterInfo1()
                    // vm.getWaterInfo2()

                    vm.getSaleRuleInfo()
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
