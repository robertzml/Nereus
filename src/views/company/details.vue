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
                                <Input v-model="companyInfo.name" readonly></Input>
                            </FormItem>
                             <FormItem label="联系人">
                                <Input v-model="companyInfo.contact" readonly></Input>
                            </FormItem>
                            <FormItem label="电话">
                                <Input v-model="companyInfo.phone" readonly></Input>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>

                <hr />
                <br />

                <Button type="primary" @click="toIndex">返回</Button>
            </Card>
        </Col>
    </Row>
</template>

<script>
import company from '../../controllers/company.js'

export default {
    name: 'company_details',
    data () {
        return {
            companyId: this.$route.params.id,
            companyInfo: {
                id: 0,
                name: '',
                phone: '',
                contact: '',
                address: '',
                code: '',
                remark: ''
            }
        }
    },
    methods: {
        getCompany (id) {
            let vm = this

            company.details(id).then(res => {
                console.log(res)
                vm.companyInfo = res.entity
            })
        },

        toIndex () {
            this.$router.push({ name: 'company' })
        }
    },
    mounted: function () {
        this.getCompany(this.companyId)
    }
}
</script>
