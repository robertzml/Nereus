<template>
    <Row>
        <Col span="12">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    产品选择
                </p>
                <span>公司选择</span>
                <Select v-model="vendorCompany" @change="loadProduct" style="width:200px">
                    <Option v-for="item in companyList" :value="item.name" :key="item.id">{{ item.name }}</Option>
                </Select>
            </Card>
        </Col>
    </Row>
</template>

<script>
import company from '../../controllers/company.js'
import product from '../../controllers/product.js'

export default {
    name: 'product-agent',
    data () {
        return {
            companyList: [],
            vendorCompany: ''
        }
    },
    methods: {
        getCompanys () {
            let vm = this

            company.list().then(res => {
                vm.companyList = res.entities
            })
        },

        getProducts (companyId) {
            
        }
    },
    activated: function () {
        this.getCompanys()
    }
}
</script>
