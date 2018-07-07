<template>
    <div class="water-heater-statistic">
        <Tabs>
            <TabPane label="累计统计">
                 <Row :gutter="16">
                    <Col span="12">
                        <Card>
                            <p slot="title">
                                <Icon type="grid"></Icon>
                                热水器当月统计数据
                            </p>

                            <Form :model="monthInfo" :label-width="100">
                                <Row>
                                    <Col span="12">
                                        <FormItem label="设备序列号">
                                            {{ monthInfo.serial_number }}
                                        </FormItem>

                                        <FormItem label="累计用水量">
                                            {{ monthInfo.statistics_heat_water }} 升
                                        </FormItem>

                                        <FormItem label="累计用电量">
                                            {{ monthInfo.statistics_use_electricity }} 度
                                        </FormItem>
                                        <FormItem label="累计省电量">
                                            {{ monthInfo.statistics_electricity_saving }} 度
                                        </FormItem>

                                        <FormItem label="累计通电时间">
                                            {{ monthInfo.statistics_duration_machine | minutesToHour }}
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="累计加热时间">
                                            {{ monthInfo.statistics_heat_time | minutesToHour }}
                                        </FormItem>
                                        <FormItem label="累计综合节电量">
                                            {{ monthInfo.statistics_comprehensive_electricity_saving }} 度
                                        </FormItem>

                                        <FormItem label="每月综合节能率">
                                            {{ monthInfo.fractional_energy_saving_comprehensive_each_month | fixDigits }}
                                        </FormItem>
                                        <FormItem label="每月节能率">
                                            {{ monthInfo.fractional_energy_saving_each_month | fixDigits }}
                                        </FormItem>
                                        <FormItem label="每月平均流量">
                                            {{ monthInfo.mean_flow_each_month }} (升/每分钟)
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>

                    <Col span="12">
                        <Card>
                            <p slot="title">
                                <Icon type="grid"></Icon>
                                热水器历史总统计数据
                            </p>

                            <Form :model="totalInfo" :label-width="100">
                                <Row>
                                    <Col span="12">
                                        <FormItem label="设备序列号">
                                            {{ totalInfo.serial_number }}
                                        </FormItem>

                                        <FormItem label="累计用水量">
                                            {{ totalInfo.statistics_heat_water }} 升
                                        </FormItem>

                                        <FormItem label="累计用电量">
                                            {{ totalInfo.statistics_use_electricity }} 度
                                        </FormItem>
                                        <FormItem label="累计省电量">
                                            {{ totalInfo.statistics_electricity_saving }} 度
                                        </FormItem>

                                        <FormItem label="累计通电时间">
                                            {{ totalInfo.statistics_duration_machine | minutesToHour }}
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="累计加热时间">
                                            {{ totalInfo.statistics_heat_time | minutesToHour }}
                                        </FormItem>

                                        <FormItem label="累计综合节电量">
                                            {{ totalInfo.statistics_comprehensive_electricity_saving }} 度
                                        </FormItem>

                                        <FormItem label="每月综合节能率">
                                            {{ totalInfo.fractional_energy_saving_comprehensive_each_month | fixDigits }}
                                        </FormItem>
                                        <FormItem label="每月节能率">
                                            {{ totalInfo.fractional_energy_saving_each_month | fixDigits }}
                                        </FormItem>
                                        <FormItem label="每月平均流量">
                                            {{ totalInfo.mean_flow_each_month }} (升/每分钟)
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </TabPane>

            <TabPane label="统计查询">
                

                    <div class="filter-panel">
                        <DatePicker type="month" placement="bottom-end" placeholder="选择起始月份" style="width: 200px" v-model="startDate"></DatePicker>

                        <DatePicker type="month" placement="bottom-end" placeholder="选择结束月份" style="width: 200px" v-model="endDate"></DatePicker>

                        <Button type="primary" @click="searchRange">查询</Button>
                    </div>
                   
                    <water-heater-statis-list :item-list="rangeInfo"></water-heater-statis-list>
                
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import statistic from '@/controllers/statistic.js'
import waterHeaterStatisList from './water-heater-statis-list.vue'

export default {
    name: 'water-heater-statistic',
    props: {
        serialNumber: { require: true },
        monthInfo: { require: true },
        totalInfo: { require: true }
    },
    components: {
        waterHeaterStatisList
    },
    data () {
        return {
            rangeInfo: [],
            startDate: '',
            endDate: ''
        }
    },
    filters: {
        minutesToHour: function (val) {
            if (val === undefined || val === null) {
                return ''
            }
            
            let h = Math.floor(val / 60)
            let m = val % 60

            return h.toString() + ' 小时 ' + m.toString() + ' 分'
        },

        fixDigits: function (val) {
            if (val === undefined || val === null) {
                return ''
            }

            return val.toFixed(2)
        }
    },
    methods: {
        searchRange () {
            let vm = this

            statistic.getWaterHeaterRange(this.serialNumber, this.startDate, this.endDate).then(res => {
                if (res.status === 0) {
                    vm.rangeInfo = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取月统计失败',
                        desc: res.message
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.filter-panel {
    margin-bottom: 10px;
}
</style>
