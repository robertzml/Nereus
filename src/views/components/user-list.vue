<template>
    <div class="user-list">
        <Table :data="tableData" :columns="columns" stripe border></Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" show-sizer placement="top" 
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'user-list',
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
                    title: '用户姓名',
                    key: 'protocol_apply_consumer_name'
                },
                {
                    title: 'APP用户名',
                    key: 'app_consumer_name'
                },
                {
                    title: '所属代理商',
                    key: 'agent_company_name'
                },
                {
                    title: '电话',
                    key: 'owner_phone'
                },
                {
                    title: '省市',
                    key: 'address'
                }
            ],
            pageSize: 10,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30],
            tableData: this.itemList.slice(0, this.pageSize)
        }
    },
    computed: {
        itemsCount () {
            return this.itemList.length
        }
    },
    watch: {
        itemList: function (newList) {
            this.tableData = newList.slice(0, this.pageSize)
        }
    }
}
</script>
