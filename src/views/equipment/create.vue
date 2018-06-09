<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    新增设备
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form ref="formValidate" :model="equipmentInfo" :rules="ruleValidate" :label-width="100">
                            <FormItem label="序列号" prop="serial_number">
                                <Input v-model="equipmentInfo.serial_number"></Input>
                            </FormItem>
                            <FormItem label="所属公司" prop="company_id">
                                <Select v-model="equipmentInfo.company_id">
                                    <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="所属代理商" prop="agent_id">
                                <Select v-model="equipmentInfo.agent_id" transfer>
                                    <Option v-for="item in agentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="产品" prop="product_id">
                                <Select v-model="equipmentInfo.product_id">
                                    <Option v-for="item in productList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
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
import product from '@/controllers/product.js'
import company from '@/controllers/company.js'
import equipment from '@/controllers/equipment.js'

export default {
    name: 'equipment-create',
    data () {
        return {
            equipmentInfo: {
                id: 0,
                serial_number: '',
                product_id: 0,
                company_id: 0,
                agent_id: 0
            },
            companyList: [],
            agentList: [],
            productList: [],
            ruleValidate: {
                serial_number: [
                    { required: true, message: '序列号不能为空', trigger: 'blur' }
                ],
                product_id: [
                    { required: true, message: '请选择产品', type: 'number', trigger: 'change' }
                ],
                company_id: [
                    { required: true, message: '请选择所属公司', type: 'number', trigger: 'change' }
                ],
                agent_id: [
                    { required: true, message: '请选择所属代理商', type: 'number', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        getCompanys () {
            let vm = this
            company.list().then(res => {
                vm.companyList = res.entities
                vm.agentList = res.entities
            })
        },

        getProducts () {
            let vm = this
            product.list().then(res => {
                vm.productList = res.entities
            })
        },

        handleSubmit (name) {
            let vm = this

            this.$refs[name].validate((valid) => {
                if (valid) {
                    equipment.create(this.equipmentInfo).then(res => {
                        vm.$Message.info(res.message)
                        vm.$router.push({ name: 'equipment-index' })
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
            this.$router.push({ name: 'equipment-index' })
        }
    },
    mounted: function () {
        this.equipmentInfo = {
            id: 0,
            serial_number: '',
            product_id: '',
            company_id: '',
            agent_id: ''
        }
        this.getCompanys()
        this.getProducts()
    }
}
</script>
