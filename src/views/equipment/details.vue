<template>
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
            <Card style="margin-bottom: 15px">
                <p slot="title">
                    <Icon type="grid"></Icon>
                    设备实时状态
                </p>

                <div>
                    <Button type="primary" @click="readStatus">Read</Button>
                    <Button type="primary" @click="readRealStatus">Real</Button>
                </div>

                <Row>
                    <Col span="16" push="4">
                        <Form :model="realInfo" :label-width="100">
                            <FormItem label="次数">
                                {{ counter }}
                            </FormItem>
                            <FormItem label="开关机状态">
                                {{ realInfo.power == 1 ? '开机' : '关机' }}
                            </FormItem>
                            <FormItem label="设定温度">
                                {{ parseInt(realInfo.setting_temp, 16) }} &#8451;
                            </FormItem>
                            <FormItem label="日志时间">
                                {{ realInfo.log_time | displayDateTime }}
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    设备操作
                </p>

                <Form ref="formLock" :model="equipmentLock" :rules="ruleLock" inline>
                    <FormItem prop="deadline">
                        <DatePicker type="date" placeholder="选择日期" :options="deadlineOptions" v-model="equipmentLock.deadline"></DatePicker>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleLock('formLock')">解锁</Button>
                    </FormItem>
                </Form>
            </Card>
        </Col>
    </Row>
</template>

<script>
import equipment from '../../controllers/equipment.js'
import moment from 'moment'

export default {
    name: 'equipment-details',
    data () {
        return {
            equipmentId: 0,
            equipmentInfo: {},
            equipmentLock: {
                deadline: ''
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
            realInfo: {},    // 实时状态
            counter: 0,
            intervalId1: 0
        }
    },
    computed: {

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
        }
    },
    methods: {
        getEquipmentInfo (id) {
            let vm = this
            equipment.detailsView(id).then(res => {
                vm.equipmentInfo = res.entity
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

        readStatus () {
            equipment.getKeyStatus(this.equipmentInfo.serial_number).then(res => {
                console.log(res)
            })
        },

        readRealStatus () {
            let vm = this
            this.counter += 1

            equipment.getRealStatus(this.equipmentInfo.serial_number).then(res => {
                if (res.status === 0) {
                    vm.realInfo = res.entities[0]
                } else {
                    this.$Notice.error({
                        title: '获取实时状态出错',
                        desc: res.message
                    })
                }
            })
        }
    },
    activated: function () {
        this.equipmentId = this.$route.params.id
        this.getEquipmentInfo(this.equipmentId)
        this.counter = 0

        this.intervalId1 = setInterval(() => {
            this.readRealStatus()
        }, 2000)
    },
    deactivated: function () {
        clearInterval(this.intervalId1)
    }
}
</script>

<style scoped>
.ivu-form-item .ivu-form-item-label {
    font-weight: 1000;
}
</style>
