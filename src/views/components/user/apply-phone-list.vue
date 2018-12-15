<template>
    <div class="apply-phone-list">
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
/* 申请更换电话表格 */
import * as nereus from '@/utility/nereus.js'
import user from '@/controllers/user.js'

export default {
    name: 'apply-phone-list',
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
                    title: '公司代码',
                    key: 'company_code'
                },
                {
                    title: '姓名',
                    key: 'real_user_name'
                },
                {
                    title: '用户名',
                    key: 'consumer_name'
                },
                {
                    title: '原电话',
                    key: 'old_phone'
                },
                {
                    title: '新电话',
                    key: 'new_phone'
                },
                {
                    title: '地址',
                    key: 'family_address'
                },
                {
                    title: '邮箱',
                    key: 'email'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return (
                            h('div', [
                                h('Poptip', {
                                    props: {
                                        title: '是否同意',
                                        confirm: true,
                                        transfer: true,
                                        placement: 'top'
                                    },
                                    on: {
                                        'on-ok': () => { this.audit(params.row) }
                                    }
                                }, [
                                    h('Button', { props: { size: 'small', type: 'success' } }, '同意')
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
            return temp.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        }
    },
    methods: {
        changePageSize (pageSize) {
            this.pageSize = pageSize
        },

        audit (item) {
             let act = {
                new_owner_phone: item.new_phone,
                old_owner_phone: item.old_phone,
                apply_id: item.apply_id,
                consumer_id: item.consumer_id,
                company_code: item.company_code
            }

            user.updateOwnerPhone(act).then(res => {
                if (res.status === 0) {
                    this.$Notice.success({
                        title: '修改电话成功',
                        desc: res.message
                    })

                    this.$emit('refresh')
                } else {
                    this.$Notice.error({
                        title: '修改电话失败',
                        desc: res.message
                    })
                }
            })
        }
    }
}
</script>
