<template>
    <div class="water-cleaner-statis-list">
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
    name: 'water-cleaner-statis-list',
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
                    title: '累计通电时间',
                    key: 'statistics_duration_machine',
                    render: (h, params) => {
                        return (
                            <span>{ this.minutesToHour(params.row.statistics_duration_machine) }</span>
                        )
                    }
                },
                {
                    title: '累计加热时间',
                    key: 'statistics_heat_time',
                    render: (h, params) => {
                        return (
                            <span>{ this.minutesToHour(params.row.statistics_heat_time) }</span>
                        )
                    }
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
        },
        minutesToHour (val) {
            if (val === undefined || val === null) {
                return ''
            }
            
            let h = Math.floor(val / 60)
            let m = val % 60

            return h.toString() + ' 小时 ' + m.toString() + ' 分'
        },

        fixDigits (val) {
            if (val === undefined || val === null) {
                return ''
            }

            return val.toFixed(2)
        }
    }
}
</script>
