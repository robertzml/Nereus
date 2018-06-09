<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        个人中心
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
                                    <Button type="primary" @click="changePassword">修改密码</Button>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import account from '@/controllers/account.js'

export default {
    name: 'account-info',
    data () {
        return {
            accountId: 0,
            accountInfo: {}
        }
    },
    methods: {
        init () {
            this.accountId = this.$store.state.user.id
            this.getAccount(this.accountId)
        },
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
        changePassword () {
            this.$router.push({ name: 'account-change-password' })
        }
    },
    activated: function () {
        this.init()
    }
}
</script>
