<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    编辑厂商信息
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form ref="formValidate" :model="companyInfo" :rules="ruleValidate" :label-width="80">
                            <FormItem label="名称" prop="name">
                                <Input v-model="companyInfo.name"></Input>
                            </FormItem>
                            <FormItem label="联系人" prop="contact">
                                <Input v-model="companyInfo.contact"></Input>
                            </FormItem>
                            <FormItem label="电话">
                                <Input v-model="companyInfo.phone"></Input>
                            </FormItem>
                            <FormItem label="售后电话">
                                <Input v-model="companyInfo.aftersale_phone"></Input>
                            </FormItem>
                            <FormItem label="地址">
                                <Input v-model="companyInfo.address"></Input>
                            </FormItem>
                            <FormItem label="代码">
                                <Input v-model="companyInfo.code"></Input>
                            </FormItem>
                            <FormItem label="类型" prop="type">
                                <Select v-model="companyInfo.type">
                                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="备注">
                                <Input v-model="companyInfo.remark" type="textarea" :rows="4"></Input>
                            </FormItem>

                            <FormItem>
                                <Button type="success" @click="handleSubmit('formValidate')">保存</Button>
                                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                                <Button type="primary" @click="toIndex">返回</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>

                <br />

            </Card>
        </Col>
    </Row>
</template>

<script>
import company from '../../controllers/company.js'

export default {
    name: 'company-edit',
    data () {
        return {
            companyId: 0,
            companyInfo: {
                id: 0,
                name: '',
                phone: '',
                aftersale_phone: '',
                type: 0,
                contact: '',
                address: '',
                code: '',
                remark: ''
            },
            typeList: [
                {
                    value: 1,
                    label: '平台'
                }, {
                    value: 2,
                    label: '厂商'
                }, {
                    value: 3,
                    label: '代理商'
                }
            ],
            ruleValidate: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                contact: [
                    { required: true, message: '联系人不能为空', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择类型', type: 'number', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        getCompany (id) {
            let vm = this

            company.details(id).then(res => {
                vm.companyInfo = res.entity
            })
        },

        updateCompany () {
            let vm = this

            company.update(this.companyInfo).then(res => {
                vm.$Message.info(res.message)
                vm.$router.push({ name: 'company' })
            })
        },

        handleSubmit (name) {
            let vm = this

            this.$refs[name].validate((valid) => {
                if (valid) {
                     company.update(this.companyInfo).then(res => {
                        vm.$Message.info(res.message)
                        vm.$router.push({ name: 'company' })
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
            this.$router.push({ name: 'company' })
        }
    },
    activated: function () {
        this.companyId = this.$route.params.id
        this.getCompany(this.companyId)
    }
}
</script>
