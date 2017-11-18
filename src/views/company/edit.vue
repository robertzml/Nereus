<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    编辑厂商信息
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form :model="companyInfo" :label-width="80">
                            <FormItem label="名称">
                                <Input v-model="companyInfo.name"></Input>
                            </FormItem>
                             <FormItem label="联系人">
                                <Input v-model="companyInfo.contact"></Input>
                            </FormItem>
                            <FormItem label="电话">
                                <Input v-model="companyInfo.phone"></Input>
                            </FormItem>
                            <FormItem label="地址">
                                <Input v-model="companyInfo.address"></Input>
                            </FormItem>
                            <FormItem label="代码">
                                <Input v-model="companyInfo.code"></Input>
                            </FormItem>
                            <FormItem label="备注">
                                <Input v-model="companyInfo.remark" type="textarea" :rows="4"></Input>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>

                <hr />
                <br />
                <Button type="success" @click="updateCompany">保存</Button>
                <Button type="primary" @click="toIndex">返回</Button>
            </Card>
        </Col>
    </Row>
</template>

<script>
import company from '../../controllers/company.js'

export default {
    name: 'company_edit',
    data () {
        return {
            companyId: this.$route.params.id,
            companyInfo: {
                id: 0,
                name: '',
                phone: '',
                type: '',
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

        updateCompany () {
            let vm = this
            console.log('begin update')
            company.update(this.companyInfo).then(res => {
                alert(res)
                vm.$router.push({ name: 'company' })
            })
        },

        toIndex () {
            this.$router.push({ name: 'company' })
        }
    },
    activated: function () {
        console.log('company edit mount')
        this.companyId = this.$route.params.id
        this.getCompany(this.companyId)
    }
}
</script>
