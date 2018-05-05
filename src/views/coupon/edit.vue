<template>
    <div>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        编辑优惠券信息
                    </p>

                    <Row>
                        <Col span="16" push="4">
                            <Form ref="formValidate" :model="couponInfo" :label-width="120">
                                <FormItem label="满足条件金额">
                                    <InputNumber :max="5000000" :min="0" :precision="0" v-model="couponInfo.min_amount" style="width: 150px;"></InputNumber>
                                </FormItem>

                                <FormItem label="优惠券金额">
                                    <InputNumber :max="5000000" :min="0" :precision="0" v-model="couponInfo.coupon_amount" style="width: 150px;"></InputNumber>
                                </FormItem>

                                <FormItem>
                                    <Button type="success" @click="handleSubmit('formValidate')">保存</Button>
                                    <Button type="primary" @click="toIndex">返回</Button>
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
import coupon from '../../controllers/coupon.js'

export default {
    name: 'coupon-edit',
    data () {
        return {
            id: 0,
            couponInfo: {
                id: 0,
                min_amount: 0,
                coupon_amount: 0
            }
        }
    },
    methods: {
        init () {
            this.id = this.$route.params.id

            this.getCoupon(this.id)
        },

        getCoupon (id) {
            let vm = this

            coupon.findOne(id).then(res => {
                if (res.status === 0) {
                    vm.couponInfo = res.entity
                } else {
                    this.$Notice.error({
                        title: '获取优惠券信息失败',
                        desc: res.message
                    })
                }
            })
        },

        handleSubmit (name) {
            let vm = this

            let act = {
                id: this.couponInfo.id,
                min_amount: this.couponInfo.min_amount,
                coupon_amount: this.couponInfo.coupon_amount
            }

            coupon.update(act).then(res => {
                vm.$Message.info(res.message)
                vm.$router.push({ name: 'coupon-index' })
            })
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

