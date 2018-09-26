<template>
    <div class="equipment-list">
        <Table :data="tableData" :columns="columns" border stripe>
            <div slot="footer">
                <span style="margin-left: 10px;">待激活设备总数: {{ itemsCount }} 台</span>
            </div>
        </Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>

        <Modal
            v-model="modal1"
            title="设备信息">
            <inactivate-details ref="mod1" width="800"></inactivate-details>
        </Modal>
    </div>
</template>

<script>
import * as nereus from '@/utility/nereus.js'
import equipment from '@/controllers/equipment.js'
import inactivateDetails from './inactivate-details.vue'

export default {
    name: 'inactivate-list',
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
                    key: 'apply_account_name'
                },
                {
                    title: '代理商',
                    key: 'agent_company_name'
                },
                {
                    title: '用户姓名',
                    key: 'owner_name'
                },
                {
                    title: '用户电话',
                    key: 'owner_phone'
                },
                {
                    title: '激活状态',
                    key: 'auditing_state',
                    render: (h, params) => {
                        return (
                            <span>{ this.auditState(params.row.auditing_state) }</span>
                        )
                    }
                },
                {
                    title: '申请时间',
                    key: 'create_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.create_date) }</span>
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
                                        title: '是否同意激活',
                                        confirm: true,
                                        transfer: true,
                                        placement: 'top'
                                    },
                                    on: {
                                        'on-ok': () => { this.activate(params.row) }
                                    }
                                }, [
                                    h('Button', { props: { size: 'small', type: 'success' }, style: { marginRight: '5px' } }, '激活')
                                ]),
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
            pageSizeOpt: [5, 10, 20, 30],
            modal1: false
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

        auditState (val) {
            if (val === 0) {
                return '未激活'
            } else if (val === 1) {
                return '已激活'
            }
        },

        showDetails (item) {
            this.$refs.mod1.getInfo(item.id, item.serial_number)
            this.modal1 = true
        },
        activate (item) {
            let act = {
                serial_number: item.serial_number,
                is_activate: 1
            }
       
            equipment.activation(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '激活成功',
                        desc: res.message
                    })

                    this.$emit('refresh')
                } else {
                    this.$Notice.error({
                        title: '激活失败',
                        duration: 0,
                        desc: res.message
                    })
                }
            })
        },

        reject (item) {
            let act = {
                serial_number: item.serial_number,
                is_activate: 0
            }
       
            equipment.activation(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '激活已驳回',
                        desc: res.message
                    })

                    this.$emit('refresh')
                } else {
                    this.$Notice.error({
                        title: '驳回失败',
                        duration: 0,
                        desc: res.message
                    })
                }
            })
        }
    }
}
</script>
