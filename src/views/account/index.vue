<template>
    <Row>
        <Col span="24">
            <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                用户列表
            </p>
            </Card>
        </Col>
    </Row>
</template>

<script>
import account from '../../controllers/account.js'

export default {
    name: 'account_index',
    data () {
        return {

        }
    },
    methods: {
        getAccounts () {
            account.list().then(res => {
                console.log(res)
            })
        }
    },
    created: function () {
        console.log('In account index create function')
        this.getAccounts()
    }
}
</script>

