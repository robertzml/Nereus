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
                    title: '产品ID',
                    key: 'product_id'
                },
                {
                    title: '厂商ID',
                    key: 'company_id'
                },
                {
                    title: '代理商ID',
                    key: 'agent_id'
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
            equipment.list().then(res => {
                console.log(res)
                vm.items = res.entities
                vm.itemsCount = res.entities.length
                vm.tableData = _.slice(vm.items, 0, vm.pageSize)
            })
        }
    },
    created: function () {
        console.log('In equipment index create function')
        this.getEquipment()
    }
}
</script>

