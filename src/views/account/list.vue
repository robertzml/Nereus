<template>
    <Row>
        <Col span="24">
            <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                用户列表
            </p>
             <Row>
                <Col span="24">
                    <Page :total="100" :current="1" show-sizer></Page>
                </Col>
            </Row>
            </Card>
        </Col>
    </Row>
</template>

<script>

export default {
    name: 'account_list',
    data () {
        return {
           
        }
    },

}
</script>