<template>
    <div>
        <div class="container">

            <b-form @submit="onSubmit3" class="form-signin">
                <h2 class="form-signin-heading">{{ msg }}</h2>

                <b-form-group id="iptgName"
                                label="用户名:" label-for="iptName">
                    <b-form-input id="iptName"
                                type="text" v-model="form.name" required
                                placeholder="用户名"></b-form-input>
                </b-form-group>
                <b-form-group id="iptgPass"
                                label="密码:" label-for="iptPass">
                    <b-form-input id="iptPass"
                                type="password" v-model="form.password" required
                                placeholder="密码"
                    ></b-form-input>
                </b-form-group>
               
                <b-button type="submit" variant="primary" block>登录</b-button>
            </b-form>
        </div> <!-- /container -->
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import login from '../actions/login.js'
import * as api from '../utility/api.js'

export default {
    name: 'login',
    data () {
        return {
            msg: '用户登录',
             form: {
                name: '',
                password: ''
            }
        }       
    },
    methods: {
        ...mapActions(['login']),

      onSubmit (evt) {
        evt.preventDefault()
        // alert(JSON.stringify(this.form))

        var vm = this
        login.check(this.form.name, this.form.password, function (response) {
            if (typeof response === 'object') {
                var userInfo = {
                    id: response.id,
                    name: response.userName,
                    companyId: response.companyId,
                    roleId: 0,
                    login: true
                }

                console.log(userInfo)
                vm.$store.commit('login', userInfo)
                vm.$router.push('/')
            } else {
                alert('用户名密码错误')
            }
        })
      },

      onSubmit2 (evt) {
          evt.preventDefault()
         
          api._post({ url: '/login/loginMember', data: { userName: this.form.name, password: this.form.password } })
            .then(res => {
                console.log(res)
            })
      },

      onSubmit3 (evt) {
          evt.preventDefault()        

          this.login({ userName: this.form.name, password: this.form.password })
            .then(res => {                
                console.log('out:')
                console.log(JSON.stringify(res))
            })
      }
    }
}
</script>

<style scoped>
body {
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #eee;
}

.form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
    margin-bottom: 10px;
}
.form-signin .checkbox {
    font-weight: normal;
}
.form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
}
.form-signin .form-control:focus {
    z-index: 2;
}
.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

</style>
