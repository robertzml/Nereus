<template>
    <Row>
        <Col span="20" push="2">
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
                <FormItem label="简称">
                    {{ companyInfo.remark }}
                </FormItem>
                <FormItem label="创建时间">
                    {{ companyInfo.create_date | displayDateTime }}
                </FormItem>
                <FormItem label="编辑时间">
                    {{ companyInfo.modify_date | displayDateTime }}
                </FormItem>
                <FormItem label="备注">
                    {{ companyInfo.introduction }}
                </FormItem>
            </Form>
        </Col>
    </Row>
</template>

<script>
import company from '@/controllers/company.js'

export default {
    name: 'company-details',
    props: {
    },
    data () {
        return {
            companyId: 0,
            companyInfo: {},
            parentName: ''
        }
    },
    methods: {
        getCompany (id) {
            let vm = this
            this.companyId = id
           
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
