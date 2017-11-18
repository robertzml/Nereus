<template>
    <Row>
        <Col span="24">
            <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                厂商列表
            </p>
            <Table :data="tableData" :columns="columns" border stripe></Table>
            <div style="margin: 10px;overflow-x: hidden">
                <div style="float: right;">
                    <Page :total="itemsCount" :current="1" :page-size="pageSize" show-sizer @on-change="changePage"></Page>
                </div>
            </div>
            </Card>
        </Col>
        <Modal v-model="modalView" title="公司信息">
            <p>Content of dialog</p>
            <p>Content of dialog</p>
            <p>Content of dialog</p>
        </Modal>
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
                    key: 'type',
                    render: (h, params) => {
                        return h('div', [
                            h('span', this.displayType(params.row.type))
                        ])
                    }
                },
                {
                    title: '联系人',
                    key: 'contact'
                },
                {
                    title: '电话',
                    key: 'phone'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                             h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showDetails(params.row.id)
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.showEdit(params.row)
                                    }
                                }
                            }, '编辑')
                        ])
                    }
                }
            ],
            items: [],
            itemsCount: 0,
            tableData: [],
            pageSize: 10,
            pageSizeOpt: [5, 10, 20, 30],
            modalView: false
        }
    },
    methods: {
        getCompany () {
            let vm = this
            company.list().then(res => {
                console.log(res)
                vm.items = res.entities
                vm.itemsCount = res.entities.length
                vm.tableData = _.slice(vm.items, 0, vm.pageSize)
            })
        },
        changePage (page) {
            this.tableData = _.slice(this.items, (page - 1) * this.pageSize, page * this.pageSize)
        },
        displayType (type) {
            switch (type) {
                case 1:
                    return '平台'
                case 2:
                    return '厂商'
                case 3:
                    return '代理商'
            }
        },
        showDetails (id) {
            // this.modalView = true
            this.$router.push({ name: 'company_details', params: { id: id } })
        },
        showEdit (item) {
            this.$router.push({ name: 'company_edit', params: { id: item.id } })
        }
    },
    created: function () {
        console.log('In company index create function')
        this.getCompany()
    }
}
</script>