<template>
    <div class="agent-district-list">
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
/* 代理商代理区域表格 */
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'agent-district-list',
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
                    title: '代理商名称',
                    key: 'agent_company_name'
                },
                {
                    title: '省',
                    key: 'province_name'
                },
                {
                    title: '市',
                    key: 'city_name'
                },
                {
                    title: '区',
                    key: 'district_name'
                },
                {
                    title: '产品名称',
                    key: 'product_name'
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
            // this.$router.push({ name: 'user-agreement-details', params: { id: item.id } })
        }
    }
}
</script>
