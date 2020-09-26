<template>
    <div class="equipment-return-list">
        <Table :data="tableData" :columns="columns" ref="table" stripe border>
            <div slot="footer" class="footer">
                <span style="margin-left:20px;margin-right:20px;">共 {{ itemsCount }} 条记录</span>
            </div>
        </Table>
        <div style="margin: 10px;overflow-x: hidden" v-if="showPager">
            <div>
                <Button type="primary" size="large" @click="exportData()"><Icon type="ios-download-outline"></Icon> 导出数据</Button>
            </div>
            <div style="float: right;">
                <Page :total="itemsCount" :current.sync="currentPage" :page-size="pageSize" :page-size-opts="pageSizeOpt" show-sizer placement="top" 
                    @on-page-size-change="changePageSize"></Page>
            </div>
        </div>
    </div>
</template>

<script>
/** 返厂设备列表 */
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'equipment-return-list',
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
                    align: 'center',
                    fixed: 'left'
                },
                {
                    title: '设备序列号',
                    key: 'serial_number',
                    width: 150
                },
                {
                    title: '创建时间',
                    key: 'create_date',
                    render: (h, params) => {
                        return (
                            <span>{ nereus.displayDateTime(params.row.create_date) }</span>
                        )
                    },
                    width: 160
                },
                {
                    title: '备注',
                    key: 'remark',
                    width: 200
                },
                {
                    title: '操作人名称',
                    key: 'name',
                    width: 120
                }, 
                {
                    title: '操作人账号',
                    key: 'user_name',
                    width: 160
                },
                {
                    title: '注销原因',
                    key: 'explanation',
                    width: 150
                },
                {
                    title: '代理商名称',
                    key: 'agent_name',
                    width: 180
                },
                {
                    title: '用户店名',
                    key: 'owner_company_name',
                    width: 150
                },
                {
                    title: '用户地址省',
                    key: 'owner_address_province',
                    width: 120
                },
                {
                    title: '用户地址市',
                    key: 'owner_address_city',
                    width: 100
                },
                {
                    title: '用户地址区',
                    key: 'owner_address_district',
                    width: 100
                },
                {
                    title: '用户地址',
                    key: 'owner_address_detail',
                    width: 100
                },
                {
                    title: '用户名称',
                    key: 'owner_name',
                    width: 100
                },
                {
                    title: '用户电话',
                    key: 'owner_phone',
                    width: 120
                },
                {
                    title: '导致结果',
                    key: 'equipment_status',
                    width: 100
                }
            ],
            pageSize: 10,
            currentPage: 1,
            pageSizeOpt: [5, 10, 20, 30]
        }
    },
    watch: {
        itemList: function (val) {
            this.currentPage = 1
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

        exportData () {
            let temp = JSON.parse(JSON.stringify(this.itemList))
            
            temp.forEach(element => {
                element.create_date = nereus.displayDateTime(element.create_date)
            })

            this.$refs.table.exportCsv({
                filename: '导出数据',
                columns: this.columns,
                data: temp
            })
        }
    }
}
</script>
