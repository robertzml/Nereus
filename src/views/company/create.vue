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
                        <Form ref="formValidate" :model="companyInfo" :rules="ruleValidate" :label-width="80">
                            <FormItem label="名称" prop="name">
                                <Input v-model="companyInfo.name"></Input>
                            </FormItem>
                            <FormItem label="联系人" prop="contact">
                                <Input v-model="companyInfo.contact"></Input>
                            </FormItem>
                            <FormItem label="电话" prop="phone">
                                <Input v-model="companyInfo.phone"></Input>
                            </FormItem>
                            <FormItem label="售后电话">
                                <Input v-model="companyInfo.aftersale_phone"></Input>
                            </FormItem>
                            <FormItem label="地址" prop="address">
                                <Input v-model="companyInfo.address"></Input>
                            </FormItem>
                            <FormItem label="代码">
                                <Input v-model="companyInfo.code"></Input>
                            </FormItem>
                            <FormItem label="类型" prop="type" v-if="createType === 0">
                                <Select v-model="companyInfo.type" @on-change="selectType">
                                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="类型" prop="type" v-else>
                                <Select v-model="companyInfo.type" disabled>
                                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="上级厂商" prop="company_parent_id" v-if="createType === 0 && companyInfo.type !== 1">
                                <Select v-model="companyInfo.company_parent_id">
                                    <Option v-for="item in parentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="简称">
                                <Input v-model="companyInfo.company_abbreviation"></Input>
                                只能用字母，如拼音首字母，英文缩写
                            </FormItem>
                            <FormItem label="公司介绍">
                                <Input v-model="companyInfo.introduction" type="textarea" :rows="4"></Input>
                            </FormItem>
                            <FormItem label="备注">
                                <Input v-model="companyInfo.remark" type="textarea" :rows="4"></Input>
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
import company from '@/controllers/company.js'

export default {
    name: 'company-create',
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
                company_parent_id: '',
                introduction: '',
                remark: '',
                company_abbreviation: ''
            },
            parentList: [],
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
                phone: [
                    { required: true, message: '电话不能为空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '地址不能为空', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择类型', type: 'number', trigger: 'change' }
                ],
                company_parent_id: [
                    { required: true, message: '请选择上级厂商', type: 'number', trigger: 'change' }
                ]
            },
            createType: 0 // 0: 管理员添加公司  1：厂商添加代理商
        }
    },
    methods: {
        init () {
            let roleId = this.$store.state.user.roleId
            let companyId = this.$store.state.user.companyId

            if (this.$route.params.type !== undefined) {
                this.createType = this.$route.params.type
            } else {
                this.createType = 0
            }
            
            if (this.createType === 1) {
                this.companyInfo.type = 3
            }
        },

        selectType (val) {
            let vm = this

            if (val === 2) {
                company.listByType(1).then(res => {
                    vm.parentList = res.entities
                })
            } else if (val === 3) {
                company.listByType(2).then(res => {
                    vm.parentList = res.entities
                })
            }
        },

        handleSubmit (name) {
            let vm = this

            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.createType === 1) {
                        this.companyInfo.company_parent_id = this.$store.state.user.companyId
                    }
                    if (this.companyInfo.type === 1) {
                        this.companyInfo.company_parent_id = 0
                    }

                    company.create(this.companyInfo).then(res => {
                        vm.$Message.info(res.message)
                        vm.$router.push({ name: 'company-index' })
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
            this.$router.push({ name: 'company-index' })
        }
    },
    mounted: function () {
        console.log('router:' + this.$route.params.type)
        this.init()
    }
}
</script>
