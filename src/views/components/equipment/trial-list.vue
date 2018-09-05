<template>
    <div class="equipment-list">
        <Table :data="tableData" :columns="columns" border stripe></Table>
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
                    title: '申请者姓名',
                    key: 'apply_account_name'
                },
                {
                    title: '申请代充值金额',
                    key: 'apply_prepay_rent'
                },
                {
                    title: '申请设备安装费',
                    key: 'apply_installation_charge'
                },
                {
                    title: '申请代充值优惠券',
                    key: 'apply_prepay_coupon'
                },
               
                {
                    title: '申请设备押金',
                    key: 'apply_device_deposit'
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
        }
    }
}
</script>
