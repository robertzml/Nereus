<template>
    <div class="company-index">
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        厂商列表
                    </p>
                    <a href="#" slot="extra" @click.prevent="showCreate">
                        <Icon type="plus-round"></Icon>
                        新增
                    </a>
                    <a href="#" slot="extra" @click.prevent="getCompanys">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>
                    
                    <company-list :itemList="companyData"></company-list>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        代理商列表
                    </p>
                    
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import company from '../../controllers/company.js'
import * as nereus from '../../utility/nereus.js'
import companyList from '../components/company-list.vue'

export default {
    name: 'company-index',
    components: {
        companyList
    },
    data () {
        return {
            companyData: []
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'company-edit' || from.name === 'company-create') {
            next(vm => {
                vm.getCompanys()
            })
        } else {
            next()
        }
    },
    methods: {
        init () {
            let roleId = this.$store.state.user.roleId
        },
        getCompanys () {
            let vm = this
            company.list().then(res => {
                vm.companyData = res.entities
            })
        },
      
        showCreate () {
            this.$router.push({ name: 'company-create' })
        }
    },
    created: function () {
        console.log('In company index create function')

        this.getCompanys()
    }
}
</script>
