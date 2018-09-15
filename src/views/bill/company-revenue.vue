<template>
    <div id="company-revenue">
         <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        工厂收益
                    </p>
                    <a href="#" slot="extra" @click.prevent="loadUnpaid">
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
    name: 'company-revenue',
    data () {
        return {

        }
    }
}
</script>
