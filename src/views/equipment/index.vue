<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    设备列表
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
    </Row>
</template>

<script>
import equipment from '../../controllers/equipment.js'
import _ from 'lodash'

export default {
    name: 'equipment',
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
                    title: '主板序列号',
                    key: 'mainboard_serial_number'
                },
                {
                    title: '产品名称',
                    key: 'product_name'
                },
                {
                    title: '产品类别',
                    key: 'product_type_name'
                },
                {
                    title: '生产厂商',
                    key: 'vendor_company_name'
                },
                {
                    title: '代理商',
                    key: 'agent_company_name'
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
            pageSizeOpt: [5, 10, 20, 30]
        }
    },
    methods: {
        getEquipment () {
            let vm = this
            equipment.listView().then(res => {
                console.log(res)
                vm.items = res.entities
                vm.itemsCount = res.entities.length
                vm.tableData = _.slice(vm.items, 0, vm.pageSize)
            })
        },
        changePage (page) {
            this.tableData = _.slice(this.items, (page - 1) * this.pageSize, page * this.pageSize)
        },
        showDetails (item) {
            this.$router.push({ name: 'equipment-details', params: { id: item.id } })
        },
        showEdit (item) {
            this.$router.push({ name: 'equipment-edit', params: { id: item.id } })
        }
    },
    created: function () {
        console.log('In equipment index create function')
        this.getEquipment()
    }
}
</script>

