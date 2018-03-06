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
                <Card style="margin-bottom: 15px">
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        设备实时状态
                    </p>

                    <div>
                        <Button type="primary" @click="readStatus">Read</Button>
                        <Button type="primary" :disabled="openReal" @click="openRealStatus">开启实时读取状态</Button>
                        <Button type="primary" :disabled="!openReal" @click="closeRealStatus">关闭实时读取状态</Button>
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
                                <FormItem label="冷水进水温度">
                                    {{ parseInt(realInfo.cold_water_Input_temp, 16) }} &#8451;
                                </FormItem>
                                <FormItem label="热水进水温度">
                                    {{ parseInt(realInfo.hot_water_Input_temp, 16) }} &#8451;
                                </FormItem>
                                <FormItem label="设定温度">
                                    {{ parseInt(realInfo.setting_temp, 16) }} &#8451;
                                </FormItem>
                                <FormItem label="出水温度">
                                    {{ parseInt(realInfo.outlet_water_temp, 16) }} &#8451;
                                </FormItem>
                                <FormItem label="出水流量">
                                    {{ parseInt(realInfo.output_flow_rate, 16) * 0.1 }} 升/分钟
                                </FormItem>
                                <FormItem label="当前输出功率">
                                    {{ parseInt(realInfo.output_capacity_factor, 16) }} KW
                                </FormItem>
                                <FormItem label="累计加热时间">
                                    {{ parseInt(realInfo.cummlative_heat_time, 16) }} 分钟
                                </FormItem>
                                <FormItem label="累计使用热水量">
                                    {{ parseInt(realInfo.cummlative_heat_water, 16) }} 升
                                </FormItem>
                                <FormItem label="累计使用电量">
                                    {{ parseInt(realInfo.cummlative_use_electricity, 16) }} 度
                                </FormItem>
                                <FormItem label="累计节省电量">
                                    {{ parseInt(realInfo.cummlative_electricity_saving, 16) }} 度
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

                    <br />

                    <Button type="primary" @click="inactivate" v-if="equipmentInfo.status === 2">同意注销</Button>
                </Card>
            </Col>
        </Row>
            <Col span="12">
                <equipment-status></equipment-status>
            </Col>
        <Row>

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
            realInfo: {}, // 实时状态
            counter: 0,
            intervalId1: 0,
            openReal: true
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
            this.counter = 0
            this.openReal = true

            this.intervalId1 = setInterval(() => {
                this.readRealStatus()
            }, 2000)
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
        },

        openRealStatus () {
            if (!this.openReal) {
                this.intervalId1 = setInterval(() => {
                    this.readRealStatus()
                }, 2000)
                this.openReal = true
            }
        },

        closeRealStatus () {
            if (this.openReal) {
                clearInterval(this.intervalId1)
                this.openReal = false
            }
        }
    },
    activated: function () {
        this.init()
    },
    deactivated: function () {
        clearInterval(this.intervalId1)
        this.openReal = false
    }
}
</script>

<style scoped>
.ivu-form-item .ivu-form-item-label {
    font-weight: 1000;
}
</style>
