<template>
    <div class="equipment-status">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                热水器实时状态
            </p>

            <div slot="extra">
                <i-switch v-model="openReal" @on-change="changeReal">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </i-switch>
            </div>

            <Form :model="realInfo" :label-width="100">
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
                       
                        <FormItem label="当前输出功率">
                            {{ realInfo.output_capacity_factor }} W
                        </FormItem>

                        <FormItem label="刷新次数">
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
                            {{ (parseInt(realInfo.output_flow_rate, 16) * 0.1).toFixed(2) }} 升/分钟
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
import equipment from '@/controllers/equipment.js'

export default {
    name: 'equipment-status',
    props: {
        serial_number: { type: String, require: true }
    },
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
        },

        readRealStatus () {
            let vm = this
            this.counter += 1

            equipment.getRealStatus(this.serial_number).then(res => {
                if (res.status === 0) {
                    vm.realInfo = res.entities[0]
                 
                    vm.realInfo.output_capacity_factor = vm.transDigit(vm.realInfo.output_capacity_factor, 4)
                } else {
                    this.$Notice.error({
                        title: '获取实时状态出错',
                        desc: res.message
                    })
                }
            })
        },

        changeReal (status) {
            if (status === true) {
                console.log('1' + status)
                this.intervalId1 = setInterval(() => {
                    this.readRealStatus()
                }, 10000)
            } else {
                console.log('2' + status)
                clearInterval(this.intervalId1)
            }
        },

        transDigit (input, len) {
            let output = ''
            for (let i = 0; i < len;) {
                let sub = input.substring(i, i + 2)
                output += parseInt(sub, 16).toString().padStart(2, '0')

                i = i + 2
            }

            return parseInt(output)
        }
    },
    mounted: function () {
        this.init()
        this.changeReal(true)
    },
    beforeDestroy: function () {
        clearInterval(this.intervalId1)
        this.openReal = false
    }
}
</script>
