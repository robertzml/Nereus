<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    {{ title }}
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form ref="formValidate" :model="accountInfo" :rules="ruleValidate" :label-width="80">
                            <FormItem label="用户名" prop="user_name">
                                <Input v-model="accountInfo.user_name"></Input>
                            </FormItem>
                            <FormItem label="密码" prop="password">
                                <Input v-model="accountInfo.password" type="password"></Input>
                            </FormItem>
                            <FormItem label="密码确认" prop="repassword">
                                <Input v-model="accountInfo.repassword" type="password"></Input>
                            </FormItem>
                            <FormItem label="姓名">
                                <Input v-model="accountInfo.name"></Input>
                            </FormItem>
                            <FormItem label="电话" prop="phone">
                                <Input v-model="accountInfo.phone"></Input>
                            </FormItem>
                            <FormItem label="Email">
                                <Input v-model="accountInfo.email"></Input>
                            </FormItem>
                            <FormItem label="所属角色" prop="role_id">
                                 <Select v-model="accountInfo.role_id" @on-change="selectRole">
                                    <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="所属公司" prop="company_id">
                                <Select v-model="accountInfo.company_id">
                                    <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
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
import account from '@/controllers/account.js'
import role from '@/controllers/role.js'
import company from '@/controllers/company.js'
import * as nereus from '@/utility/nereus.js'

export default {
    name: 'account-create',
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            }
            callback()
        }

        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.accountInfo.password) {
                callback(new Error('两次输入密码不一致'))
            } else {
                callback()
            }
        }

        return {
            accountInfo: {
                user_name: '',
                name: '',
                password: '',
                repassword: '',
                phone: '',
                email: '',
                role_id: 0,
                company_id: 0
            },
            roleList: [],
            companyList: [],
            ruleValidate: {
                user_name: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                repassword: [
                    { validator: validatePassCheck, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '电话不能为空', trigger: 'blur' }
                ],
                role_id: [
                    { required: true, message: '请选择角色', type: 'number', trigger: 'change' }
                ],
                company_id: [
                    { required: true, message: '请选择公司', type: 'number', trigger: 'change' }
                ]
            },
            title: '',
            createType: 0
        }
    },
    methods: {
        init () {
            let roleId = this.$store.state.user.roleId

            if (this.$route.params.type !== undefined) {
                this.createType = this.$route.params.type
            } else {
                this.createType = 0
                this.title = '增加用户'
            }

            if (this.createType === 1) {
                this.title = '增加厂商用户'
            } else if (this.createType === 2) {
                this.title = '增加代理商用户'
            }

            this.getRoles()
        },

        getRoles () {
            let vm = this

            role.list().then(res => {
                if (this.createType === 1) {
                    vm.roleList = res.entities.filter(r => r.type === 2)
                } else if (this.createType === 2) {
                    vm.roleList = res.entities.filter(r => r.type === 3)
                } else {
                    vm.roleList = res.entities.filter(r => r.type !== 0)
                }
            })
        },
        
        selectRole (val) {
            let vm = this
            let companyId = this.$store.state.user.companyId

            if (val >= 2 && val <= 4) {
                company.listByType(1).then(res => {
                    vm.companyList = res.entities
                })
            } else if (val >= 5 && val <= 7) {
                company.listByType(2).then(res => {
                    vm.companyList = res.entities
                })
            } else if (val >= 8) {
                if (this.createType === 2) {
                    company.listByParent(companyId).then(res => {
                        vm.companyList = res.entities
                    })
                } else {
                    company.listByType(3).then(res => {
                        vm.companyList = res.entities
                    })
                }
            }
        },

        handleSubmit (name) {
            let vm = this

            this.$refs[name].validate((valid) => {
                if (valid) {
                    delete this.accountInfo.repassword
                    account.create(this.accountInfo).then(res => {
                        vm.$Message.info(res.message)
                        vm.$router.push({ name: 'account-index' })
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
            this.$router.push({ name: 'account-index' })
        }
    },
    mounted: function () {
        this.accountInfo = {
            user_name: '',
            password: '',
            repassword: '',
            name: '',
            phone: '',
            email: '',
            role_id: '',
            company_id: ''
        }

        console.log('router type:' + this.$route.params.type)
        this.init()
    }
}
</script>
