<template>
    <div class="dashboard">
        <Row>
            <Col span="24">
                <Card>
                    <div style="text-align:center">
                        <Form :label-width="120" inline>
                            <FormItem label="设备总数量" style="margin-bottom: 0">
                                {{ infoTotal.total_number }}
                            </FormItem>
                            <FormItem label="累计用热水量升" style="margin-bottom: 0">
                                {{ infoTotal.statistics_heat_water }}
                            </FormItem>
                            <FormItem label="累计用电量度" style="margin-bottom: 0">
                                {{ infoTotal.statistics_use_electricity }}
                            </FormItem>
                            <FormItem label="累计省电量度" style="margin-bottom: 0">
                                {{ infoTotal.statistics_electricity_saving }}
                            </FormItem>
                            <FormItem label="累计通电时间分" style="margin-bottom: 0">
                                {{ infoTotal.statistics_duration_machine }}
                            </FormItem>
                            <FormItem label="累计加热时间分" style="margin-bottom: 0">
                                {{ infoTotal.statistics_heat_time }}
                            </FormItem>
                            <FormItem label="更新时间" style="margin-bottom: 0">
                                {{ infoTotal.create_date | displayDateTime }}
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row>            
            <Col v-for="item in cityList" v-bind:key="item.city" span="4">
                <Form :label-width="120">
                    <FormItem label="累计用热水量升">
                        {{ item.statistics_heat_water }}
                    </FormItem>
                    <FormItem label="累计用电量度">
                        {{ item.statistics_use_electricity }}
                    </FormItem>
                    <FormItem label="累计省电量度">
                        {{ item.statistics_electricity_saving }}
                    </FormItem>
                    <FormItem label="累计通电时间分">
                        {{ item.statistics_duration_machine }}
                    </FormItem>
                    <FormItem label="累计加热时间分">
                        {{ item.statistics_heat_time }}
                    </FormItem>
                    <FormItem label="设备总数量">
                        {{ item.total_number }}
                    </FormItem>
                    <FormItem label="更新时间">
                        {{ item.create_date | displayDateTime }}
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
</template>

<script>
import statistic from '@/controllers/statistic.js'

export default {
    name: 'dashboard',
    data () {
        return {
            infoList: [],
            cityList: []
        }
    },
    computed: {
        infoTotal: function () {
            let total = {
                statistics_heat_water: 0,
                statistics_use_electricity: 0,
                statistics_electricity_saving: 0,
                statistics_duration_machine: 0,
                statistics_heat_time: 0,
                total_number: 0
            }
            this.infoList.forEach(element => {
                total.statistics_heat_water += element.statistics_heat_water
                total.statistics_use_electricity += element.statistics_use_electricity
                total.statistics_electricity_saving += element.statistics_electricity_saving
                total.statistics_duration_machine += element.statistics_duration_machine
                total.statistics_heat_time += element.statistics_heat_time
                total.total_number += element.total_number
            })

            if (this.infoList.length !== 0) {
                total.create_date = this.infoList[0].create_date
            }
            return total
        }
    },
    methods: {
        init () {
            let vm = this
            statistic.getTotalStatistic().then(res => {
                if (res.status === 0) {
                    vm.infoList = res.entities_total
                    vm.cityList = res.entities_city_total
                } else {
                    this.$Notice.error({
                        title: '获取统计失败',
                        desc: res.message
                    })
                }
            })
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
