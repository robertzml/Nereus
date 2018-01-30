<template>
    <div>
        <Row style="margin-bottom: 15px;">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        产品列表
                    </p>
                    <a href="#" slot="extra" @click.prevent="showCreate" style="margin-right: 5px">
                        <Icon type="plus-round"></Icon>
                        新增
                    </a>
                    <a href="#" slot="extra" @click.prevent="showAgent" style="margin-right: 5px">
                        <Icon type="shuffle"></Icon>
                        代理产品
                    </a>
                    <a href="#" slot="extra" @click.prevent="getProducts">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'product-agent',
    data () {
        return {
            
        }
    }
}
</script>
