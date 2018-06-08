<template>
    <Row>
        <Col span="20" push="2">
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
                <FormItem label="编辑时间">
                    {{ accountInfo.modify_date | displayDateTime }}
                </FormItem>
                <FormItem label="账户状态">
                    {{ accountInfo.status | entityStatus }}
                </FormItem>
            </Form>
        </Col>
    </Row>
</template>

<script>
import account from '@/controllers/account.js'

export default {
    name: 'account-details',
    data () {
        return {
            accountId: 0,
            accountInfo: {}
        }
    },
    methods: {
        getAccount (id) {
            let vm = this
            this.accountId = id

            account.detailsView(id).then(res => {
                if (res.status === 0) {
                    vm.accountInfo = res.entity
                } else {
                    vm.$Message.error(res.message)
                }
            })
        }
    },
    mounted: function () {
    }
}
</script>
