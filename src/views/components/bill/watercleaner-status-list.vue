<template>
    <div class="watercleaner-status-list">
        <Table :data="tableData" :columns="columns" ref="table" stripe border>
            <div slot="footer" class="footer">
                <span style="margin-left:20px;margin-right:20px;">共 {{ itemsCount }} 条记录</span>
            </div>
        </Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div>
                <Button type="primary" size="large" @click="exportData()"><Icon type="ios-download-outline"></Icon> 导出数据</Button>
            </div>
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
    </div>
</template>

<script>
/** 热水器状态列表 */
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'watercleaner-status-list',
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
                    key: 'Serialnumber',
                    width: 150
                },
                {
                    title: '主板序列号',
                    key: 'MainboardSerialnumber',
                    width: 100
                },
                {
                    title: '记录时间',
                    key: 'LogTime',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.LogTime) }</span>
                        )
                    },
                    width: 100
                },
                {
                    title: '电源',
                    key: 'Power',
                    render: (h, params) => {
                        return (
                            <span>{ this.power(params.row.Power) }</span>
                        )
                    },
                    width: 100
                },
                {
                    title: '出水温度',
                    key: 'OutletWaterTemp',
                    width: 100
                },
                {
                    title: '出水流量',
                    key: 'OutputFlowRate',
                    width: 100
                },
                {
                    title: '热水进水温度',
                    key: 'HotWaterInputTemp',
                    width: 100
                },
                {
                    title: '告警',
                    key: 'Alarm',
                    width: 100
                },
                {
                    title: '告警状态变化时间',
                    key: 'AlarmTime',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.AlarmTime) }</span>
                        )
                    },
                    width: 100
                },
                {
                    title: '告警描述',
                    key: 'AlarmDesp',
                    width: 100
                },
                {
                    title: '加锁',
                    key: 'Lock',
                    render: (h, params) => {
                        return (
                            <span>{ this.isUnlock(params.row.Lock) }</span>
                        )
                    },
                    width: 100
                },
                {
                    title: '激活',
                    key: 'Active',
                    render: (h, params) => {
                        return (
                            <span>{ this.isActivate(params.row.Active) }</span>
                        )
                    },
                    width: 100
                },
                {
                    title: '设置温度',
                    key: 'SettingTemp',
                    width: 100
                },
                {
                    title: '输出功率',
                    key: 'OutputCapacityFactor',
                    width: 100
                },
                {
                    title: '设备允许使用时间',
                    key: 'SettingAllowUsedTime',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.SettingAllowUsedTime) }</span>
                        )
                    },
                    width: 100
                },
                {
                    title: '主板激活时间',
                    key: 'ActiveTime',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.ActiveTime) }</span>
                        )
                    },
                    width: 120
                },
                {
                    title: '纯水TDS',
                    key: 'PureWaterTds',
                    width: 120
                },
                {
                    title: '原水TDS',
                    key: 'RawWaterTds',
                    width: 120
                },
                {
                    title: '滤芯1寿命',
                    key: 'FilterCartridgeAge_1',
                    width: 120
                },
                {
                    title: '滤芯2寿命',
                    key: 'FilterCartridgeAge_2',
                    width: 120
                },
                {
                    title: '滤芯3寿命',
                    key: 'FilterCartridgeAge_3',
                    width: 120
                },
                {
                    title: '滤芯4寿命',
                    key: 'FilterCartridgeAge_4',
                    width: 120
                },
                {
                    title: '滤芯1使用时间',
                    key: 'FilterCartridgeUedTime_1',
                    width: 120
                },
                {
                    title: '滤芯2使用时间',
                    key: 'FilterCartridgeUedTime_2',
                    width: 120
                },
                {
                    title: '滤芯3使用时间',
                    key: 'FilterCartridgeUedTime_3',
                    width: 120
                },
                {
                    title: '滤芯4使用时间',
                    key: 'FilterCartridgeUedTime_4',
                    width: 120
                },
                {
                    title: '童锁',
                    key: 'ChildLock',
                    width: 120
                },
                {
                    title: '当前出水量',
                    key: 'CurrWaterYield',
                    width: 120
                },
                {
                    title: '设置停止/启动凉水/启动开水',
                    key: 'StopStartColdHot',
                    width: 120
                },
                {
                    title: '设置出水量',
                    key: 'SetWaterYield',
                    width: 120
                },
                {
                    title: '离线/在线',
                    key: 'IsOnline',
                    render: (h, params) => {
                        return (
                            <span>{ this.online(params.row.IsOnline) }</span>
                        )
                    },
                    width: 120
                },
                {
                    title: '离线/在线变化时间点',
                    key: 'LineTime',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDate(params.row.LineTime) }</span>
                        )
                    },
                    width: 120
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
            } else {
                return '未知'
            }
        },

        isActivate (val) {
            if (val === '1') {
                return '已激活'
            } else if (val === '0') {
                return '未激活'
            } else {
                return '未知'
            }
        },

        isUnlock (val) {
            if (val === '1') {
                return '已解锁'
            } else if (val === '0') {
                return '未解锁'
            } else {
                return '未知'
            }
        },

        online (val) {
            if (val === '1') {
                return '在线'
            } else if (val === '0') {
                return '离线'
            } else {
                return '未知'
            }
        },

        exportData () {
            let temp = JSON.parse(JSON.stringify(this.itemList))
            
            temp.forEach(element => {
                element.LogTime = nereus.displayDateTime(element.LogTime)
                element.Power = this.power(element.Power)
                element.AlarmTime = nereus.displayDateTime(element.AlarmTime)
                element.Lock = this.isUnlock(element.Lock)
                element.Active = this.isActivate(element.Active)
                element.SettingAllowUsedTime = nereus.displayDateTime(element.SettingAllowUsedTime)
                element.ActiveTime = nereus.displayDateTime(element.ActiveTime)
                element.IsOnline = this.online(element.IsOnline)
                element.LineTime = nereus.displayDateTime(element.LineTime)
            })

            this.$refs.table.exportCsv({
                filename: '导出数据',
                columns: this.columns,
                data: temp
            })
        }
    }
}
</script>
