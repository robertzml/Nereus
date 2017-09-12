<template>
    <div>
        <h4>{{ msg }}</h4>

        <div class="row">
            <div class="col-md-10">
                <b-form @submit="onSubmit">
                    <b-form-group id="ig-name" label="产品名称:" label-for="name">
                        <b-form-input id="name" type="text" v-model="form.name" required placeholder="产品名称"></b-form-input>
                    </b-form-group>

                    <b-form-group id="ig-info" label="信息:" label-for="info">
                        <b-form-input id="info" type="text" v-model="form.info" required placeholder="信息"></b-form-input>
                    </b-form-group>

                    <b-form-group id="ig-price" label="价格:" label-for="price">
                        <b-form-input id="price" type="number" v-model="form.phone" required placeholder="价格"></b-form-input>
                    </b-form-group>

                    <b-form-group id="ig-goodsDesc" label="产品描述:" label-for="goodsDesc">
                        <b-form-textarea id="goodsDesc"
                            v-model="text"
                            placeholder="产品描述"
                            :rows="3"
                            :max-rows="6">
                        </b-form-textarea>
                    </b-form-group>

                    <b-button type="submit" variant="primary">保存</b-button>
                    <b-button type="reset" variant="secondary">重置</b-button>
                </b-form>
            </div>
        </div>
        
    </div>
</template>


<script>
import product from '../../actions/product.js'

export default {
  name: 'product-create',
  data () {
      return {
        msg: '产品信息',
        form: {
          name: '',
          info: '',
          goodsDesc: '',
          phone: ''
        }   
      }
  },
  methods: {
      onSubmit (evt) {
        evt.preventDefault()
        var vm = this
        // console.log(JSON.stringify(this.form))

        product.create(vm.form, function (response) {
            alert(response)
            vm.$router.push({ path: '/product/list' })
        })
      }
    }
}
</script>

