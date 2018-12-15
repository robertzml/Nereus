<template>
    <div class="user-agreement-list">
        <Table :data="tableData" :columns="columns" stripe border>
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
/* 用户协议表格 */
import * as nereus from '@/utility/nereus.js'
import user from '@/controllers/user.js'

export default {
    name: 'user-agreement-list',
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
                    title: '设备主人真实姓名',
                    key: 'real_user_name'
                },
                {
                    title: '代理公司名称',
                    key: 'agent_company_name'
                },
                {
                    title: '产品名称',
                    key: 'product_name'
                },
                {
                    title: '购买数量',
                    key: 'apply_equipment_count'
                },
                {
                    title: '设备主人省',
                    key: 'owner_address_province'
                },
                {
                    title: '设备主人市',
                    key: 'owner_address_city'
                },
                {
                    title: '设备主人区',
                    key: 'owner_address_district'
                },
                {
                    title: '设备主人详细地址',
                    key: 'owner_address_detail'
                },
                {
                    title: '代理商是否同意',
                    key: 'agent_operatier_is_agree'
                },
                {
                    title: '厂商是否同意',
                    key: 'company_operatier_is_agree'
                },
                {
                    title: '设备是否安装成功',
                    key: 'equipment_install_is_success'
                },
                {
                    title: '创建日期',
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
            return temp.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }
    },
    methods: {
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },

        showDetails (item) {
            
        }
    }
}
</script>
