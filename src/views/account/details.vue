<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    用户信息
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form :model="accountInfo" :label-width="80">
                            <FormItem label="用户名">
                                {{ accountInfo.user_name }}
                            </FormItem>
                            <FormItem label="姓名">
                                {{ accountInfo.name }}
                            </FormItem>
                            <FormItem label="电话">
                                {{ accountInfo.phone }}
                            </FormItem>
                            <FormItem label="Email">
                                {{ accountInfo.email }}
                            </FormItem>
                            <FormItem label="所属角色">
                                {{ accountInfo.role_name }}
                            </FormItem>
                            <FormItem label="所属公司">
                                {{ accountInfo.company_name }}
                            </FormItem>
                            <FormItem label="公司类型">
                                {{ accountInfo.company_type | displayCompanyType }}
                            </FormItem>
                            <FormItem label="创建时间">
                                {{ accountInfo.create_date | displayDateTime }}
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
import account from '../../controllers/account.js'

export default {
    name: 'account-details',
    data () {
        return {
            accountId: 0,
            accountInfo: {
                id: 0,
                name: '',
                user_name: '',
                phone: '',
                email: '',
                role_name: '',
                company_name: '',
                company_type: 0
            }
        }
    },
    methods: {
        getAccount (id) {
            let vm = this

            account.detailsView(id).then(res => {
                if (res.status === 0) {
                    vm.accountInfo = res.entity
                } else {
                    vm.$Message.error(res.message)
                }
            })
        },

        toIndex () {
            this.$router.push({ name: 'account-index' })
        }
    },
    activated: function () {
        this.accountId = this.$route.params.id
        this.getAccount(this.accountId)
    }
}
</script>
