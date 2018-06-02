<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    厂商信息
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form :model="companyInfo" :label-width="80">
                            <FormItem label="名称">
                                {{ companyInfo.name }}
                            </FormItem>
                            <FormItem label="联系人">
                                {{ companyInfo.contact }}
                            </FormItem>
                            <FormItem label="电话">
                                {{ companyInfo.phone }}
                            </FormItem>
                            <FormItem label="售后电话">
                                {{ companyInfo.aftersale_phone }}
                            </FormItem>
                            <FormItem label="地址">
                                {{ companyInfo.address }}
                            </FormItem>
                            <FormItem label="代码">
                                {{ companyInfo.code }}
                            </FormItem>
                            <FormItem label="公司类型">
                                {{ companyInfo.type | displayCompanyType }}
                            </FormItem>
                            <FormItem label="上级厂商">
                                {{ parentName }}
                            </FormItem>
                            <FormItem label="创建时间">
                                {{ companyInfo.create_date | displayDateTime }}
                            </FormItem>
                            <FormItem label="编辑时间">
                                {{ companyInfo.modify_date | displayDateTime }}
                            </FormItem>
                            <FormItem label="备注">
                                {{ companyInfo.remark }}
                            </FormItem>
                        </Form>
                    </Col>
                </Row>

                <br />
            </Card>
        </Col>
    </Row>
</template>

<script>
import company from '../../../controllers/company.js'

export default {
    name: 'company-details',
    props: {
        companyId: { type: Number, require: true }
    },
    data () {
        return {
            companyInfo: {},
            parentName: ''
        }
    },
    methods: {
        getCompany (id) {
            let vm = this
            
            // console.log('company id: ' + this.companyId)
            company.details(id).then(res => {
                if (res.status === 0) {
                    vm.companyInfo = res.entity

                    this.getParent(vm.companyInfo.parent_id)
                } else {
                    vm.$Message.error(res.message)
                }
            })
        },

        getParent (pid) {
            let vm = this

            company.details(pid).then(res => {
                if (res.status === 0) {
                    this.parentName = res.entity.name
                } else {
                    this.parentName = ''
                }
            })
        }
    },
    mounted: function () {
    }
}
</script>
