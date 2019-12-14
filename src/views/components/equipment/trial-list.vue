<template>
    <div class="equipment-list">
        <Table :data="tableData" :columns="columns" ref="table" border stripe>
            <div slot="footer">
                <span style="margin-left: 10px;">试用设备总数: {{ itemsCount }} 台</span>
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
import * as nereus from '@/utility/nereus.js'
import equipment from '@/controllers/equipment.js'

export default {
    name: 'trial-list',
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
                    title: '序列号',
                    key: 'serial_number',
                    sortable: true
                },
                {
                    title: '产品类型',
                    key: 'product_type_name',
                    sortable: true
                },
                {
                    title: '产品名称',
                    key: 'product_name',
                    sortable: true
                },
                {
                    title: '代理商公司',
                    key: 'agent_company_name'
                },
                {
                    title: '设备主人',
                    key: 'owner_name'
                },
                {
                    title: '设备主人公司',
                    key: 'owner_company_name'
                },
                {
                    title: '手机号',
                    key: 'owner_phone'
                },
                {
                    title: '省',
                    key: 'owner_address_province'
                },
                {
                    title: '市',
                    key: 'owner_address_city'
                },
                {
                    title: '区',
                    key: 'owner_address_district'
                },
                {
                    title: '地址',
                    key: 'owner_address_detail'
                },
                {
                    title: '公司名称',
                    key: 'owner_company_name'
                },
                {
                    title: '免费试用日期(天)',
                    key: 'set_free_time'
                },
                {
                    title: '免费试用到期时间',
                    key: 'set_free_time_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDate(params.row.set_free_time_date) }</span>
                        )
                    }
                },
                {
                    title: '激活时间',
                    key: 'activate_date',
                    sortable: true,
                    render: (h, params) => {
                        return nereus.displayDate(params.row.activate_date)
                    }
                },
                {
                    title: '使用截至时间',
                    key: 'device_deadline_date',
                    sortable: true,
                    render: (h, params) => {
                        return nereus.displayDate(params.row.device_deadline_date)
                    }
                },
                {
                    title: '是否更换设备',
                    key: 'is_change_equipment',
                    render: (h, params) => {
                        return this.isChange(params.row.is_change_equipment)
                    }
                },
                {
                    title: '更换时间',
                    key: 'change_time',
                    render: (h, params) => {
                        return nereus.displayDate(params.row.change_time)
                    }
                },
                {
                    title: '申请状态',
                    key: 'apply_state',
                    render: (h, params) => {
                        let ret = null
                        if (params.row.apply_state === 1) {
                            ret = <span style="color: #F00; font-weight:bold;">{ this.showApplyState(params.row.apply_state) }</span>
                        } else {
                            ret = <span>{ this.showApplyState(params.row.apply_state) }</span>
                        }
                        return (
                            ret
                        )
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                        return (
                            h('div', [
                                (<i-button type="primary" size="small" style='margin-right:5px' onClick={ () => { this.showDetails(params.row) } }>查看</i-button>),
                                h('Poptip', {
                                    props: {
                                        title: '是否同意转正',
                                        confirm: true,
                                        transfer: true,
                                        placement: 'top'
                                    },
                                    on: {
                                        'on-ok': () => { this.onOk(params.row) }
                                    }
                                }, [
                                    h('Button', { props: { size: 'small', type: 'success' }, style: { marginRight: '5px' } }, '转正')
                                ]),
                                h('Poptip', {
                                    props: {
                                        title: '是否驳回转正',
                                        confirm: true,
                                        transfer: true,
                                        placement: 'top'
                                    },
                                    on: {
                                        'on-ok': () => { this.onReject(params.row) }
                                    }
                                }, [
                                    h('Button', { props: { size: 'small', type: 'warning' } }, '拒绝')
                                ])
                            ])
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
            
            let pageCount = Math.ceil(temp.length / this.pageSize)

            if (this.currentPage > pageCount) {
                this.changePage(1)
            }
            return temp.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }
    },
    methods: {
        changePage (page) {
            this.currentPage = page
        },
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },
        showApplyState (val) {
            switch (val) {
                case -1:
                    return ''
                case 1:
                    return '申请转正'
                case 2:
                    return '申请注销'
            }
        },
        showDetails (item) {
            this.$router.push({ name: 'equipment-details', params: { id: item.equipment_id } })
        },
        onOk (item) {
            equipment.agreeRealActivateApply(item.id, item.serial_number).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '转正成功',
                        desc: res.message
                    })

                    this.$emit('refresh')
                } else {
                    this.$Notice.error({
                        title: '转正失败',
                        desc: res.message
                    })

                    this.$emit('refresh')
                }
            })
        },
        onReject (item) {
            equipment.rejectRealActivateApply(item.id, item.serial_number).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '驳回成功',
                        desc: res.message
                    })

                    this.$emit('refresh')
                } else {
                    this.$Notice.error({
                        title: '驳回失败',
                        desc: res.message
                    })

                    this.$emit('refresh')
                }
            })
        },

        isChange (val) {
            if (val === 1) {
                return '是'
            } else {
                return '否'
            }
        },

        exportData () {
            let temp = JSON.parse(JSON.stringify(this.itemList))
            
            temp.forEach(element => {
                element.set_free_time_date = nereus.displayDateTime(element.set_free_time_date)
                element.apply_state = this.showApplyState(element.apply_state)

                element.activate_date = nereus.displayDate(element.activate_date)
                element.device_deadline_date = nereus.displayDateTime(element.device_deadline_date)
                element.is_change_equipment = this.isChange(element.is_change_equipment)
                element.change_time = nereus.displayDate(element.change_time)
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
