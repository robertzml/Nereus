<template>
    <div class="water-heater-real-list">
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
                    align: 'center',
                    fixed: 'left'
                },
                {
                    title: '设备序列号',
                    key: 'serial_number',
                    width: 100
                },
                {
                    title: '主板序列号',
                    key: 'mainboard_serial_number',
                    width: 100
                },
                {
                    title: '记录时间',
                    key: 'log_time',
                    width: 100,
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.log_time)
                        )
                    }
                },
                {
                    title: '电源',
                    key: 'power',
                    width: 80,
                    render: (h, params) => {
                        return (
                            this.power(params.row.power)
                        )
                    }
                },
                {
                    title: '出水温度',
                    key: 'outlet_water_temp',
                    width: 100
                },
                {
                    title: '出水流量',
                    key: 'output_flow_rate',
                    width: 100
                },
                {
                    title: '冷水进水温度',
                    key: 'cold_water_Input_temp',
                    width: 100
                },
                {
                    title: '热水进水温度',
                    key: 'hot_water_Input_temp',
                    width: 100
                },
                {
                    title: '告警',
                    key: 'alarm',
                    width: 80
                },
                {
                    title: '加锁',
                    key: 'lock',
                    width: 80,
                    render: (h, params) => {
                        return (
                            this.lock(params.row.lock)
                        )
                    }
                },
                {
                    title: '激活',
                    key: 'active',
                    width: 80,
                    render: (h, params) => {
                        return (
                            this.active(params.row.active)
                        )
                    }
                },
                {
                    title: '设置温度',
                    key: 'setting_temp',
                    width: 100
                },
                {
                    title: '输出功率',
                    key: 'output_capacity_factor',
                    width: 100
                },
                {
                    title: '清洗开关',
                    key: 'clean_control',
                    width: 100,
                    render: (h, params) => {
                        return (
                            this.cleanControl(params.row.clean_control)
                        )
                    }
                },
                {
                    title: '设备允许使用时间',
                    key: 'setting_allow_usetime',
                    width: 100,
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.setting_allow_usetime)
                        )
                    }
                },
                {
                    title: '主板激活时间',
                    key: 'active_time',
                    width: 100,
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.active_time)
                        )
                    }
                },
                {
                    title: '离线/在线',
                    key: 'is_online',
                    width: 100,
                    render: (h, params) => {
                        return (
                            this.online(params.row.is_online)
                        )
                    }
                },
                {
                    title: '离线/在线变化时间点',
                    key: 'line_time',
                    width: 100,
                    render: (h, params) => {
                        return (
                            nereus.displayDateTime(params.row.line_time)
                        )
                    }
                }
            ],
            pageSize: 10,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30]
        }
    },
    watch: {
        itemList: function (val) {
            this.currentPage = 1
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

        power (val) {
            if (val === '1') {
                return '开机'
            } else if (val === '0') {
                return '关机'
            }
        },
        
        lock (val) {
            if (val === '0') {
                return '加锁'
            } else if (val === '1') {
                return '解锁'
            }
        },

        active (val) {
            if (val === '0') {
                return '未激活'
            } else if (val === '1') {
                return '激活'
            }
        },

        online (val) {
            if (val === '0') {
                return '离线'
            } else if (val === '1') {
                return '在线'
            }
        },

        cleanControl (val) {
            if (val === '0') {
                return '非清洗状态'
            } else if (val === '1') {
                return '清洗状态'
            }
        }
    }
}
</script>
