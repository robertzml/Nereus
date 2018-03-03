<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入用户名和密码</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
    name: 'login',
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        ...mapActions(['login']),

        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let vm = this
                    
                    this.login({ user_name: this.form.userName, password: this.form.password })
                        .then(res => {
                            if (res.status === 0) {
                                vm.$router.push('/')
                            } else {
                                alert('用户名密码错误')
                            }
                    })
                }
            })
        }
    }
}
</script>

<style lang="less">
.login{
    width: 100%;
    height: 100%;
    background-image: url('../assets/bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
        position: absolute;
        right: 340px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}
</style>
