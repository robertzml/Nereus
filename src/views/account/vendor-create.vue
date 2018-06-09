<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    增加厂商管理员
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
                            <FormItem label="所属公司">
                                <Input readonly v-model="companyName"></Input>
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
    name: 'account-vendor-create',
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
            companyName: '',
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
                ]
            }
        }
    },
    methods: {
        init () {
            let roleType = this.$store.state.user.roleType

            if (roleType === 2) {
                this.getMyCompany()
                this.getRoles()
            }
        },

        getMyCompany () {
            let vm = this
            let companyId = this.$store.state.user.companyId

            company.details(companyId).then(res => {
                vm.companyName = res.entity.name
            })
        },

        getRoles () {
            let vm = this

            role.list().then(res => {
                vm.roleList = res.entities.filter(r => r.type === 2 && r.id !== 5)
            })
        },

        handleSubmit (name) {
            let vm = this

            this.$refs[name].validate((valid) => {
                if (valid) {
                    delete this.accountInfo.repassword
                    this.accountInfo.company_id = this.$store.state.user.companyId

                    account.create(this.accountInfo).then(res => {
                        if (res.status === 0) {
                            vm.$Message.info(res.message)
                            vm.$router.push({ name: 'account-vendor-index' })
                        } else {
                            this.$Notice.error({
                                title: '新增厂商管理员失败',
                                desc: res.message
                            })
                        }
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
            this.$router.push({ name: 'account-vendor-index' })
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
