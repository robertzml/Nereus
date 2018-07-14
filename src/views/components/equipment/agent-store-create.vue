<template>
    <div class="agent-store-create">
        <Row>
            <Col span="20" push="2">
                <Form :model="storeInfo" :label-width="80">
                    <FormItem label="产品代码" prop="product_code">
                        <Input v-model="storeInfo.product_code"></Input>
                    </FormItem>
                    <FormItem label="产品名称" prop="name">
                        <Input v-model="storeInfo.name"></Input>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'agent-store-create',
    data () {
        return {
            storeInfo: {
                product_code: '',
                name: ''
            }
        }
    },
    methods: {
        saveStore () {
            return false
        }
    }
}
</script>
