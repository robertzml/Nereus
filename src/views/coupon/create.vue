<template>
    <div class="coupon-create">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                新增优惠券
            </p>

            <Row>
                <Col span="16" push="4">
                    <Form ref="formValidate" :model="couponInfo" :rules="ruleValidate" :label-width="120">
                        <FormItem label="满足条件金额" prop="min_amount">
                            <InputNumber :max="5000000" :min="0" :precision="2" v-model="couponInfo.min_amount" style="width: 150px;"></InputNumber>
                        </FormItem>
                        <FormItem label="优惠券金额" prop="coupon_amount">
                            <InputNumber :max="5000000" :min="0" :precision="2" v-model="couponInfo.coupon_amount" style="width: 150px;"></InputNumber>
                        </FormItem>

                        <FormItem>
                            <Button type="success" @click="handleSubmit('formValidate')">保存</Button>
                            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                            <Button type="primary" @click="toIndex" style="margin-left: 8px">返回</Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
export default {
    name: 'coupon-create',
    data () {
        return {
            couponInfo: {
                min_amount: 0,
                coupon_amount: 0
            }
        }
    },
    methods: {
        init () {

        },

        handleReset (name) {
            this.$refs[name].resetFields()
        },

        toIndex () {
            this.$router.push({ name: 'coupon-index' })
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
