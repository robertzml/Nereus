<template>
    <div class="equipment-status">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                设备实时状态
            </p>

            <Form :model="realInfo" :label-width="100">
                <i-switch v-model="openReal" @on-change="changeReal"></i-switch>

                <Row>
                    <Col span="10" push="2">
                        <FormItem label="开关机状态">
                            {{ realInfo.power == 1 ? '开机' : '关机' }}
                        </FormItem>

                        <FormItem label="冷水进水温度">
                            {{ parseInt(realInfo.cold_water_Input_temp, 16) }} &#8451;
                        </FormItem>
                        <FormItem label="热水进水温度">
                            {{ parseInt(realInfo.hot_water_Input_temp, 16) }} &#8451;
                        </FormItem>
                       
                        <FormItem label="累计加热时间">
                            {{ parseInt(realInfo.cummlative_heat_time, 16) }} 分钟
                        </FormItem>
                        <FormItem label="累计使用热水量">
                            {{ parseInt(realInfo.cummlative_heat_water, 16) }} 升
                        </FormItem>

                        <FormItem label="次数">
                            {{ counter }}
                        </FormItem>
                    </Col>

                    <Col span="10">
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

                        <FormItem label="累计使用电量">
                            {{ parseInt(realInfo.cummlative_use_electricity, 16) }} 度
                        </FormItem>
                        <FormItem label="累计节省电量">
                            {{ parseInt(realInfo.cummlative_electricity_saving, 16) }} 度
                        </FormItem>

                        <FormItem label="日志时间">
                            {{ realInfo.log_time | displayDateTime }}
                        </FormItem>
                    </Col>
                </Row>
               
            </Form>
        </Card>
    </div>
</template>

<script>
import equipment from '../../controllers/equipment.js'

export default {
    name: 'equipment-status',
    data () {
        return {
            counter: 0,
            intervalId1: 0,
            openReal: true,
            realInfo: {} // 实时状态
        }
    },
    methods: {
        init () {
            this.counter = 0
            this.openReal = true

            this.intervalId1 = setInterval(() => {
                this.readRealStatus()
            }, 2000)
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

        changeReal (status) {
            this.$Message.info('开关状态：' + status)
        }
    }
}
</script>
