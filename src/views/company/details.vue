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
                            <FormItem label="备注">
                                {{ companyInfo.remark }}
                            </FormItem>

                            <FormItem>
                                <Button type="primary" @click="toIndex">返回</Button>
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
import company from '../../controllers/company.js'

export default {
    name: 'company-details',
    data () {
        return {
            companyId: 0,
            companyInfo: {}
        }
    },
    methods: {
        getCompany (id) {
            let vm = this

            company.details(id).then(res => {
                if (res.status === 0) {
                    vm.companyInfo = res.entity
                } else {
                    vm.$Message.error(res.message)
                }
            })
        },
        toIndex () {
            this.$router.push({ name: 'company-index' })
        }
    },
    activated: function () {
        this.companyId = this.$route.params.id
        this.getCompany(this.companyId)
    }
}
</script>
