<template>
    <div>
        <h4>{{ msg }}</h4>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>属性</th>
                    <th>值</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Id</td>
                    <td>{{ company.id }}</td>
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
                <tr>
                    <td>创建时间</td>
                    <td>{{ company.createDate }}</td>
                </tr>
                <tr>
                    <td>更新时间</td>
                    <td>{{ company.updateDate }}</td>
                </tr>
            </tbody>
        </table>

        <hr />
    </div>
</template>


<script>
import company from '../../actions/company.js'

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

            company.details(id, function (response) {
                vm.company = response
            })
        }
    },
    mounted: function () {
        this.getCompany(this.companyId)
    }
}
</script>