<template>
    <div class="water-heater-statistic">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                热水器当月统计数据
            </p>

            <Form :model="monthInfo" :label-width="100">
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
            </Form>

         </Card>
    </div>
</template>

<script>
export default {
    name: 'water-heater-statistic',
    props: {
        monthInfo: { require: true }
    },
    data () {
        return {
            
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
        
    }
}
</script>
