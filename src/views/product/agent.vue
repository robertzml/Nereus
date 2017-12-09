<template>
    <Row>
        <Col span="12">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    产品选择
                </p>
                <span>公司选择</span>
                <Select v-model="vendorCompany" @on-change="changeCompany" style="width:200px">
                    <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <br /><br />
                
                <Table :data="tableData" ref="selection" :columns="columns" stripe border></Table>
                <br /><br />

                <Button type="primary">确定</Button>
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
            vendorCompany: '',
            tableData: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '分类名称',
                    key: 'product_type_name'
                },
                {
                    title: '厂商名称',
                    key: 'company_name'
                },
                {
                    title: '型号规格',
                    key: 'specification'
                }
            ]
        }
    },
    methods: {
        getCompanys () {
            let vm = this

            company.listByType(2).then(res => {
                vm.companyList = res.entities
            })
        },

        getProducts (companyId) {
            let vm = this

            product.listByCompanyView(companyId).then(res => {
                vm.tableData = res.entity
            })
        },

        changeCompany (node) {
            this.getProducts(node)
        }
    },
    activated: function () {
        this.getCompanys()
    }
}
</script>
