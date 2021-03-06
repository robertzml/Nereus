<template>
    <div class="equipment-list">
        <Table :data="tableData" :columns="columns" ref="table" border stripe>
            <div slot="footer">
                <span style="margin-left: 10px;">设备总数: {{ itemsCount }} 台</span>
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

export default {
    name: 'equipment-list',
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
                    title: '产品名称',
                    key: 'product_name',
                    sortable: true
                },
                {
                    title: '代理商',
                    key: 'agent_company_name'
                },
                {
                    title: '业务员姓名',
                    key: 'agent_account_name',
                    sortable: true
                },
                {
                    title: '安装工姓名',
                    key: 'erector_name'
                },
                {
                    title: '设备主人',
                    key: 'owner_name'
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
                    title: '设备转正时间',
                    key: 'in_due_form_date',
                    sortable: true,
                    render: (h, params) => {
                        return nereus.displayDate(params.row.in_due_form_date)
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
                    title: '解锁状态',
                    key: 'is_unlock',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return (
                            <span>{ params.row.is_unlock ? '已解锁' : '未解锁' }</span>
                        )
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
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return (
                            <div>
                                <i-button type="primary" size="small" onClick={ () => { this.showDetails(params.row) } }>查看</i-button>
                            </div>
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
        showDetails (item) {
            this.$router.push({ name: 'equipment-details', params: { id: item.id } })
        },

        isUnlock (val) {
            return val ? '已解锁' : '未解锁'
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
                element.in_due_form_date = nereus.displayDateTime(element.in_due_form_date)
                element.is_unlock = this.isUnlock(element.is_unlock)
                element.device_deadline_date = nereus.displayDate(element.device_deadline_date)
                element.activate_date = nereus.displayDate(element.activate_date)
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
