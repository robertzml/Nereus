<template>
    <div class="water-cleaner-statistic">
        <Tabs>
            <TabPane label="累计统计">
                 <Row :gutter="16">
                    <Col span="12">
                        <Card>
                            <p slot="title">
                                <Icon type="grid"></Icon>
                                直饮机当月统计数据
                            </p>

                            <Form :model="monthInfo" :label-width="100">
                                <Row>
                                    <Col span="12" push="4">
                                        <FormItem label="设备序列号">
                                            {{ monthInfo.serial_number }}
                                        </FormItem>

                                        <FormItem label="累计计算月份">
                                            {{ monthInfo.statistics_year_month }}
                                        </FormItem>

                                        <FormItem label="累计用水量">
                                            {{ monthInfo.statistics_heat_water }} 升
                                        </FormItem>

                                        <FormItem label="累计通电时间">
                                            {{ monthInfo.statistics_duration_machine | minutesToHour }}
                                        </FormItem>

                                        <FormItem label="累计加热时间">
                                            {{ monthInfo.statistics_heat_time | minutesToHour }}
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
                                直饮机历史总统计数据
                            </p>

                            <Form :model="totalInfo" :label-width="100">
                                <Row>
                                    <Col span="12" push="4">
                                        <FormItem label="设备序列号">
                                            {{ totalInfo.serial_number }}
                                        </FormItem>

                                        <FormItem label="累计计算月份">
                                            {{ monthInfo.statistics_year_month }}
                                        </FormItem>

                                        <FormItem label="累计用水量">
                                            {{ totalInfo.statistics_heat_water }} 升
                                        </FormItem>                                     

                                        <FormItem label="累计通电时间">
                                            {{ totalInfo.statistics_duration_machine | minutesToHour }}
                                        </FormItem>

                                        <FormItem label="累计加热时间">
                                            {{ monthInfo.statistics_heat_time | minutesToHour }}
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
                
                <water-cleaner-statis-list :item-list="rangeInfo"></water-cleaner-statis-list>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import statistic from '@/controllers/statistic.js'
import waterCleanerStatisList from './water-cleaner-statis-list.vue'

export default {
    name: 'water-cleaner-statistic',
    props: {
        serialNumber: { require: true },
        monthInfo: { require: true },
        totalInfo: { require: true }
    },
    components: {
        waterCleanerStatisList
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

            statistic.getWaterCleanerRange(this.serialNumber, this.startDate, this.endDate).then(res => {
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
