<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    新增厂商
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form ref="formValidate" :model="productTypeInfo" :rules="ruleValidate" :label-width="80">
                            <FormItem label="名称" prop="name">
                                <Input v-model="productTypeInfo.name"></Input>
                            </FormItem>
                            <FormItem label="上级" prop="type">
                                <Select v-model="productTypeInfo.parent_id">
                                    <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="备注">
                                <Input v-model="productTypeInfo.remark" type="textarea" :rows="4"></Input>
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
        </Col>
    </Row>
</template>

<script>
import productType from '../../controllers/product-type.js'

export default {
    name: 'product-type-create',
    data () {
        return {
            productTypeInfo: {
                name: '',
                parent_id: '',
                remark: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ]
            },
            typeList: []
        }
    },
    methods: {
        getProductType () {
            let vm = this
            productType.list().then(res => {
                vm.typeList = res.entities
            })
        },

        handleSubmit (name) {
            let vm = this

            this.$refs[name].validate((valid) => {
                if (valid) {
                     productType.create(this.productTypeInfo).then(res => {
                        vm.$Message.info(res.message)
                        vm.$router.push({ name: 'product-type' })
                    })
                } else {
                    this.$Message.error('输入数据有误')
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields()
        },
        toIndex () {
            this.$router.push({ name: 'product-type' })
        }
    },
    activated: function () {
        this.productTypeInfo = {
            name: '',
            parent_id: '',
            remark: ''
        }
        this.getProductType()
    }
}
</script>
