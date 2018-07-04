<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    新增代理商
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
                            <FormItem label="类型">
                                <Input readonly value="代理商"></Input>
                            </FormItem>
                            <FormItem label="简称">
                                <Input v-model="companyInfo.remark"></Input>
                                只能用字母，如拼音首字母，英文缩写
                            </FormItem>
                            <FormItem label="备注">
                                <Input v-model="companyInfo.introduction" type="textarea" :rows="4"></Input>
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
/*
 * 厂商添加代理商页面 
 */

import company from '@/controllers/company.js'

export default {
    name: 'company-agent-create',
    data () {
        return {
            companyInfo: {
                name: '',
                phone: '',
                aftersale_phone: '',
                type: '',
                contact: '',
                address: '',
                code: '',
                parent_id: '',
                introduction: '',
                remark: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                contact: [
                    { required: true, message: '联系人不能为空', trigger: 'blur' }
                ],
                parent_id: [
                    { required: true, message: '请选择上级厂商', type: 'number', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        init () {
            let roleId = this.$store.state.user.roleId
            let companyId = this.$store.state.user.companyId

            this.companyInfo.parent_id = companyId
            this.companyInfo.type = 3
        },

        handleSubmit (name) {
            let vm = this

            this.$refs[name].validate((valid) => {
                if (valid) {
                    company.create(this.companyInfo).then(res => {
                        vm.$Message.info(res.message)
                        vm.$router.push({ name: 'company-agent-index' })
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
            this.$router.push({ name: 'company-agent-index' })
        }
    },
    mounted: function () {
        console.log('router:' + this.$route.params.type)
        this.init()
    }
}
</script>
