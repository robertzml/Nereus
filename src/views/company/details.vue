<template>
    <div>
        <h4>{{ msg }}</h4>

        <table class="table">
            <thead>
                <tr>
                    <th>属性</th>
                    <th>值</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>名称</td>
                    <td>{{ company.name }}</td>
                </tr>
                <tr>
                    <td>地址</td>
                    <td>{{ company.address }}</td>
                </tr>
                <tr>
                    <td>联系人</td>
                    <td>{{ company.contacts }}</td>
                </tr>
                <tr>
                    <td>电话</td>
                    <td>{{ company.phone }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import axios from 'axios'
import { apihost } from '../../config.js'

export default {
    name: 'company_details',
    data () {
        return {
            msg: '厂家信息',
            companyId: this.$route.params.id,
            company: {}
        }
    },
    methods: {
        getCompany: function (id) {
            var vm = this
            axios.get(apihost + '/company/ViewCompany', {
                params: {
                    id: id
                }
            }).then(function (response) {
                console.log(response)
                vm.company = response.data
            })
        }
    },
    created: function () {
        this.getCompany(this.companyId)
    }
}
</script>