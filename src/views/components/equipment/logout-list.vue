<template>
    <div class="logout-list">
        <Table :data="tableData" :columns="columns" border stripe>
            <div slot="footer">
                <span style="margin-left: 10px;">待注销设备总数: {{ itemsCount }} 台</span>
            </div>
        </Table>
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
import equipment from '@/controllers/equipment.js'
import inactivateDetails from './inactivate-details.vue'

export default {
    name: 'logout-list',
    props: {
        itemList: { type: Array, required: true },
        showPager: { type: Boolean, default: true }
    },
    components: {
        inactivateDetails
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
                    key: 'serial_number'
                },
                {
                    title: '申请人',
                    key: 'agent_account_apply_inactivate_name'
                },
                {
                    title: '使用截至时间',
                    key: 'device_deadline_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.device_deadline_date) }</span>
                        )
                    }
                },
                {
                    title: '申请时间',
                    key: 'apply_inactivate_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.apply_inactivate_date) }</span>
                        )
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return (
                            h('div', [
                                (<i-button type="primary" size="small" style='margin-right:5px' onClick={ () => { this.showDetails(params.row) } }>查看</i-button>),
                                h('Poptip', {
                                    props: {
                                        title: '是否驳回',
                                        confirm: true,
                                        transfer: true,
                                        placement: 'top'
                                    },
                                    on: {
                                        'on-ok': () => { this.reject(params.row) }
                                    }
                                }, [
                                    h('Button', { props: { size: 'small', type: 'warning' } }, '驳回')
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

        showDetails (item) {
            this.$router.push({ name: 'equipment-logout-details', params: { serialNumber: item.serial_number } })
        },

        reject (item) {
            let act = {
                serial_number: item.serial_number,
                apply_state: 2
            }
       
            equipment.inactivate(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '注销已驳回',
                        desc: res.message
                    })

                    this.$emit('refresh')
                } else {
                    this.$Notice.error({
                        title: '驳回失败',
                        desc: res.message
                    })
                }
            })
        }
    }
}
</script>
