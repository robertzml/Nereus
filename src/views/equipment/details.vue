<template>
    <div>
        <Row :gutter="16">
            <Col span="12">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        设备信息
                    </p>
                    <a href="#" slot="extra" @click.prevent="refresh">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <Row>
                        <Col span="16" push="4">
                            <Form :model="equipmentInfo" :label-width="100">
                                <FormItem label="序列号">
                                    {{ equipmentInfo.serial_number }}
                                </FormItem>
                                <FormItem label="主板序列号">
                                    {{ equipmentInfo.mainboard_serial_number }}
                                </FormItem>
                                <FormItem label="产品名称">
                                    {{ equipmentInfo.product_name }}
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
                                <FormItem label="状态">
                                    {{ equipmentInfo.status | equipmentStatus }}
                                </FormItem>

                                <FormItem>
                                    <Button type="primary" @click="toIndex">返回</Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>

                    <br />
                </Card>
            </Col>
            <Col span="12">
                <Card style="margin-bottom: 20px;">
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        设备操作
                    </p>

                    <Row>
                        <Col span="12">
                            <Form ref="formLock" :model="equipmentLock" :rules="ruleLock" inline>
                                <FormItem prop="deadline">
                                    <DatePicker type="date" placeholder="选择日期" :options="deadlineOptions" v-model="equipmentLock.deadline"></DatePicker>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleLock('formLock')">解锁</Button>
                                </FormItem>
                            </Form>

                            <br />

                            <Button type="primary" @click="readStatus">Read</Button>
                            <Button type="primary" @click="inactivate" v-if="equipmentInfo.status === 2">同意注销</Button>
                        </Col>
                        <Col span="12">
                            <Form ref="formTrade" :model="equipmentTrade" inline>
                                <FormItem prop="tradeInMoney">
                                    <InputNumber :max="5000000" :min="0" :precision="2" v-model="equipmentTrade.tradeInMoney" style="width: 150px;"></InputNumber>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleTrade('formTrade')">充值</Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                   
                </Card>

                <equipment-status :serial_number="equipmentInfo.serial_number"></equipment-status>
            </Col>
        </Row>
    </div>
</template>

<script>
import equipment from '../../controllers/equipment.js'
import equipmentStatus from '../components/equipment-status.vue'
import moment from 'moment'

export default {
    name: 'equipment-details',
    components: {
        equipmentStatus
    },
    data () {
        return {
            equipmentId: 0,
            equipmentInfo: {},
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
                } else {
                    this.$Notice.error({
                        title: '获取设备信息失败',
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
        },

        readStatus () {
            equipment.getKeyStatus(this.equipmentInfo.serial_number).then(res => {
                console.log(res)
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
