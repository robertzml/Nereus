<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    用户信息
                </p>

                <Row>
                    <Col span="16" push="4">
                        <Form ref="formValidate" :model="accountInfo" :rules="ruleValidate" :label-width="80">
                            <FormItem label="用户名">
                                <Input v-model="accountInfo.user_name" readonly></Input>
                            </FormItem>
                            <FormItem label="电话" prop="phone">
                                <Input v-model="accountInfo.phone"></Input>
                            </FormItem>
                            <FormItem label="Email">
                                <Input v-model="accountInfo.email"></Input>
                            </FormItem>
                            <FormItem label="所属角色" prop="role_id">
                                 <Select v-model="accountInfo.role_id">
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
import account from '../../controllers/account.js'
import role from '../../controllers/role.js'
import company from '../../controllers/company.js'
import * as nereus from '../../utility/nereus.js'

export default {
    name: 'account-edit',
    data () {
        return {
            accountId: 0,
            accountInfo: {
                id: 0,
                user_name: '',
                phone: '',
                email: '',
                role_id: 0,               
                company_id: 0
            },
            roleList: [],
            companyList: [],
            ruleValidate: {
                phone: [
                    { required: true, message: '电话不能为空', trigger: 'blur' }
                ],
                role_id: [
                    { required: true, message: '请选择角色', type: 'number', trigger: 'change' }
                ],
                company_id: [
                    { required: true, message: '请选择公司', type: 'number', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        getAccount (id) {
            let vm = this

            account.details(id).then(res => {
                if (res.status === 0) {
                    vm.accountInfo = res.admin
                } else {
                    vm.$Message.error(res.message)
                }
            })
        },

        getRoles () {
            let vm = this

            role.list().then(res => {
                vm.roleList = res.entities
            })
        },

        getCompanys () {
            let vm = this

            company.list().then(res => {
                vm.companyList = res.entities
            })
        },

        handleSubmit (name) {
            let vm = this

            this.$refs[name].validate((valid) => {
                if (valid) {
                    let entity = {
                        id: this.accountInfo.id,
                        user_name: this.accountInfo.user_name,
                        phone: this.accountInfo.phone,
                        email: this.accountInfo.email,
                        role_id: this.accountInfo.role_id,
                        company_id: this.accountInfo.company_id
                    }

                    account.update(this.accountInfo).then(res => {
                        vm.$Message.info(res.message)
                        vm.$router.push({ name: 'account' })
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
            this.$router.push({ name: 'account' })
        }
    },
    computed: {
        companyType: function () {
            return nereus.displayCompanyType(this.accountInfo.company_type)
        }
    },
    activated: function () {
        this.accountId = this.$route.params.id
        this.getAccount(this.accountId)
        this.getRoles()
        this.getCompanys()
    }
}
</script>
