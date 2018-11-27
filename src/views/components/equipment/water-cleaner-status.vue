<template>
    <div class="water-cleaner-status">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                直饮机实时状态
            </p>

            <div slot="extra">
                <i-switch v-model="openReal" @on-change="changeReal">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </i-switch>
            </div>

            <Form :model="realInfo" :label-width="200">
                <Row>
                    <Col span="10" push="1">
                        <FormItem label="开关机状态">
                            {{ realInfo.power == 1 ? '开机' : '关机' }}
                        </FormItem>

                        <FormItem label="热水进水温度">
                            {{ realInfo.hot_water_Input_temp }} &#8451;
                        </FormItem>

                        <FormItem label="设定温度">
                            {{ realInfo.setting_temp }} &#8451;
                        </FormItem>

                        <FormItem label="出水温度">
                            {{ realInfo.outlet_water_temp }} &#8451;
                        </FormItem>

                        <FormItem label="童锁">
                            {{ realInfo.child_lock | childLock }}
                        </FormItem>

                        <FormItem label="当前输出功率">
                            {{ realInfo.output_capacity_factor }} W
                        </FormItem>

                        <FormItem label="1号滤芯（PP棉）寿命">
                            {{ realInfo.filter_cartridge_age_1 }} 小时
                        </FormItem>

                        <FormItem label="2号滤芯（前置活性炭）寿命">
                            {{ realInfo.filter_cartridge_age_2 }} 小时
                        </FormItem>

                        <FormItem label="3号滤芯（RO膜）寿命">
                            {{ realInfo.filter_cartridge_age_3 }} 小时
                        </FormItem>

                        <FormItem label="4号滤芯（后置活性炭）寿命">
                            {{ realInfo.filter_cartridge_age_4 }} 小时
                        </FormItem>

                        <FormItem label="刷新次数">
                            {{ counter }}
                        </FormItem>
                    </Col>

                    <Col span="10" push="1">
                        <FormItem label="出水状态">
                            {{ realInfo.stop_start_cold_hot | outType }}
                        </FormItem>

                        <FormItem label="设定出水量">
                            {{ realInfo.set_water_yield }} mL
                        </FormItem>

                        <FormItem label="当前出水量">
                            {{ realInfo.curr_water_yield }} mL
                        </FormItem>

                        <FormItem label="出水流量">
                            {{ (realInfo.output_flow_rate * 0.01).toFixed(2) }} 升/分钟
                        </FormItem>

                        <FormItem label="原水tds">
                            {{ realInfo.raw_water_tds }}
                        </FormItem>

                        <FormItem label="净水tds">
                            {{ realInfo.pure_water_tds }}
                        </FormItem>

                         <FormItem label="1号滤芯（PP棉）使用时间">
                            {{ realInfo.filter_cartridge_used_time_1 }} 小时
                        </FormItem>

                        <FormItem label="2号滤芯（前置活性炭）使用时间">
                            {{ realInfo.filter_cartridge_used_time_2 }} 小时
                        </FormItem>

                        <FormItem label="3号滤芯（RO膜）使用时间">
                            {{ realInfo.filter_cartridge_used_time_3 }} 小时
                        </FormItem>

                        <FormItem label="4号滤芯（后置活性炭）使用时间">
                            {{ realInfo.filter_cartridge_used_time_4 }} 小时
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
    name: 'water-cleaner-status',
    props: {
        serial_number: { type: String, require: true }
    },
    data () {
        return {
            counter: 0,
            intervalId1: 0,
            openReal: false,
            realInfo: {} // 实时状态
        }
    },
    filters: {
        outType: function (val) {
            if (val === '0') {
                return '停止'
            } else if (val === '1') {
                return '启动凉水'
            } else if (val === '2') {
                return '启动热水'
            } else {
                return ''
            }
        },
        childLock: function (val) {
            if (val === '0') {
                return '关闭'
            } else if (val === '1') {
                return '开启'
            }
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

            equipment.getWaterCleanerStatus(this.serial_number).then(res => {
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
            if (status === true) {
                this.intervalId1 = setInterval(() => {
                    this.readRealStatus()
                }, 10000)
            } else {
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
