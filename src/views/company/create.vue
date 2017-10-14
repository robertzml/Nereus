<template>
    <div>
        <h4>{{ msg }}</h4>

        <div class="row">
            <div class="col-md-10">
                <b-form @submit="onSubmit">
                    <b-form-group id="ig-name" label="厂家名称:" label-for="name">
                        <b-form-input id="name" type="text" v-model="form.name" required placeholder="厂家名称"></b-form-input>
                    </b-form-group>

                    <b-form-group id="ig-address" label="地址:" label-for="address">
                        <b-form-input id="address" type="text" v-model="form.address" required placeholder="地址"></b-form-input>
                    </b-form-group>

                    <b-form-group id="ig-contacts" label="联系人:" label-for="contacts">
                        <b-form-input id="contacts" type="text" v-model="form.contacts" required placeholder="联系人"></b-form-input>
                    </b-form-group>

                    <b-form-group id="ig-phone" label="电话:" label-for="phone">
                        <b-form-input id="phone" type="text" v-model="form.phone" required placeholder="电话"></b-form-input>
                    </b-form-group>    

                    <b-button type="submit" variant="primary">保存</b-button>
                    <b-button type="reset" variant="secondary">重置</b-button>
                </b-form>
            </div>
        </div>
        
    </div>
</template>


<script>
import company from '../../controllers/company.js'

export default {
    name: 'company-create',
    data () {
        return {
            msg: '厂家信息',
            form: {
                name: '',
                address: '',
                contacts: '',
                phone: ''
            }   
        }
    },
    methods: {
        onSubmit (evt) {
        evt.preventDefault()
        var vm = this
        // console.log(JSON.stringify(this.form))

        /*
        company.create(vm.form, function (response) {
            alert(response)
            vm.$router.push({ path: '/company/list' })
        })
        */

        company.create(vm.form).then(res => {
            alert(res)
            vm.$router.push({ path: '/company/list' })
        })
      }
    }
}
</script>

