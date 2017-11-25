<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    厂商列表
                </p>
                <a href="#" slot="extra" @click.prevent="showCreate">
                    <Icon type="plus-round"></Icon>
                    新增
                </a>
                <a href="#" slot="extra" @click.prevent="getCompany">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
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
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
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
                    title: '售后电话',
                    key: 'aftersale_phone'
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
                                        this.showDetails(params.row)
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
    beforeRouteEnter (to, from, next) {
        if (from.name === 'company-edit' || from.name === 'company-create') {
            next(vm => {
                vm.getCompany()
            })
        } else {
            next()
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
        showDetails (item) {
            // this.modalView = true
            this.$router.push({ name: 'company-details', params: { id: item.id } })
        },
        showEdit (item) {
            this.$router.push({ name: 'company-edit', params: { id: item.id } })
        },
        showCreate () {
            this.$router.push({ name: 'company-create' })
        }
    },
    created: function () {
        console.log('In company index create function')
        this.getCompany()
    }
}
</script>