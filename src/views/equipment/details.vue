<template>
    <Row :gutter="16">
        <Col span="12">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    设备信息
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form :model="equipmentInfo" :label-width="100">
                            <FormItem label="序列号">
                                <Input v-model="equipmentInfo.serial_number" readonly></Input>
                            </FormItem>
                            <FormItem label="主板序列号">
                                <Input v-model="equipmentInfo.mainboard_serial_number" readonly></Input>
                            </FormItem>
                            <FormItem label="产品名称">
                                <Input v-model="equipmentInfo.product_name" readonly></Input>
                            </FormItem>
                            <FormItem label="厂商名称">
                                <Input v-model="equipmentInfo.vendor_company_name" readonly></Input>
                            </FormItem>
                            <FormItem label="代理商名称">
                                <Input v-model="equipmentInfo.agent_company_name" readonly></Input>
                            </FormItem>
                            <FormItem label="激活状态">
                                <Checkbox v-model="equipmentInfo.is_activate" disabled></Checkbox>
                            </FormItem>
                            <FormItem label="激活日期">
                                <Input v-model="equipmentInfo.activate_date" readonly></Input>
                            </FormItem>
                            <FormItem label="解锁状态">
                                <Checkbox v-model="equipmentInfo.is_unlock" disabled></Checkbox>
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
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    设备操作
                </p>

                <Button type="primary" @click="activation">激活</Button> <Button type="primary" @click="search">查询</Button>

                <br /><br />
                <Form ref="formLock" :model="equipmentLock" :rules="ruleLock" inline>
                    <FormItem prop="deadline">
                        <DatePicker type="date" placeholder="选择日期" v-model="equipmentLock.deadline"></DatePicker>
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

export default {
    name: 'equipment-details',
    data () {
        return {
            equipemntId: 0,
            equipmentInfo: {
                id: 0,
                serial_number: '',
                mainboard_serial_number: '',
                product_id: 0,
                product_name: '',
                company_id: 0,
                vendor_company_name: '',
                agent_id: 0,
                agent_company_name: '',
                is_activate: false
            },
            equipmentLock: {
                deadline: ''
            },
            ruleLock: {
                deadline: [
                    { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                ]
            }
        }
    },
    computed: {

    },
    methods: {
        getEquipmentInfo (id) {
            let vm = this
            equipment.detailsView(id).then(res => {
                vm.equipmentInfo = res.entity
            })
        },

        showDate (dt) {
            return new Date(dt)
        },

        toIndex () {
            this.$router.push({ name: 'equipment-index' })
        },

        activation () {
            let act = [{
                serial_number: this.equipmentInfo.serial_number,
                is_activation: 1
            }]
       
            equipment.activation(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: res.message
                    })
                } else {
                    this.$Notice.error({
                        title: res.message,
                        desc: ''
                    })
                }
            })
        },

        handleLock (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let act = [{
                        serial_number: this.equipmentInfo.serial_number,
                        is_activation: 1,
                        is_unlock: 1,
                        device_deadline_date: this.equipmentLock.deadline
                    }]

                    equipment.lock(act).then(res => {
                        if (res.status === 0) {
                            this.$Notice.success({
                                title: res.message
                            })
                        } else {
                            this.$Notice.error({
                                title: res.message,
                                desc: ''
                            })
                        }
                    })
                }
            })
        },

        search () {
            equipment.getStatus(this.equipmentInfo.serial_number).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: res.entity.is_activation
                    })
                }
            })
        }
    },
    activated: function () {
        this.equipemntId = this.$route.params.id
        this.getEquipmentInfo(this.equipemntId)
    }
}
</script>
