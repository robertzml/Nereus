<template>
    <Row>
        <Col span="24">
            <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                厂商列表
            </p>
            <Table :data="tableData" :columns="columns" stripe></Table>
            <div style="margin: 10px;overflow-x: hidden">
                <div style="float: right;">
                    <Page :total="itemsCount" :current="1" :page-size="pageSize" show-sizer @on-change="changePage"></Page>
                </div>
            </div>
            </Card>
        </Col>
    </Row>
</template>

<script>
import company from '../../controllers/company.js'
import _ from 'lodash'

export default {
    name: 'company_index',
    data () {
        return {
            columns: [
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '编码',
                    key: 'code'
                },
                {
                    title: '类型',
                    key: 'type'
                },
                {
                    title: '联系人',
                    key: 'contact'
                },
                {
                    title: '电话',
                    key: 'phone'
                }
            ],
            items: [],
            itemsCount: 0,
            tableData: [],
            pageSize: 10,
            pageSizeOpt: [5, 10, 20, 30]
        }
    },
    methods: {
        getCompany () {
            company.list().then(res => {
                console.log(res)
            })
        },
        changePage (page) {
            this.tableData = _.slice(this.items, (page - 1) * this.pageSize, page * this.pageSize)
        }
    },
    created: function () {
        this.getCompany()
    }
}
</script>