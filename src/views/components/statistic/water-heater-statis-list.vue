<template>
    <div class="water-heater-statis-list">
        <Table :data="tableData" :columns="columns" stripe border></Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
    </div>
</template>

<script>
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'water-heater-statis-list',
    props: {
        itemList: { type: Array, required: true },
        showPager: { type: Boolean, default: true }
    },
    data () {
        return {
            columns: [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '累计计算月份',
                    key: 'statistics_year_month'
                },
                {
                    title: '累计用水量(升)',
                    key: 'statistics_heat_water'
                },
                {
                    title: '累计用电量(度)',
                    key: 'statistics_use_electricity'
                },
                {
                    title: '累计省电量(度)',
                    key: 'statistics_electricity_saving'
                },
                {
                    title: '累计通电时间',
                    key: 'statistics_duration_machine'
                },
                {
                    title: '累计加热时间',
                    key: 'statistics_heat_time'
                },
                {
                    title: '累计综合节电量(度)',
                    key: 'statistics_comprehensive_electricity_saving'
                },
                {
                    title: '每月综合节能率',
                    key: 'fractional_energy_saving_comprehensive_each_month'
                },
                {
                    title: '每月节能率',
                    key: 'fractional_energy_saving_each_month'
                },
                {
                    title: '每月平均流量(升/每分钟)',
                    key: 'mean_flow_each_month'
                }
            ],
            pageSize: 10,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30]
        }
    },
    computed: {
        itemsCount () {
            return this.itemList.length
        },
        tableData () {
            let temp = this.itemList
            return temp.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }
    },
    methods: {
        changePageSize (pageSize) {
            this.pageSize = pageSize
        }
    }
}
</script>
