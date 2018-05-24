<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    库存列表
                </p>
                <a href="#" slot="extra" @click.prevent="getEquipments">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                
                <div class="filter-panel">
                    <span v-if="roleType === 0 || roleType ===1">所属厂商</span>
                    <Select v-if="roleType === 0 || roleType ===1" v-model="sCompany" @on-change="selectCompany" style="width:200px" placeholder="选择厂商">
                        <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </div>

                <store-list :item-list="storeData"></store-list>
            </Card>
        </Col>
    </Row>
</template>


<script>
import equipment from '../../controllers/equipment.js'
import storeList from '../components/store-list.vue'
import company from '../../controllers/company.js'

export default {
    name: 'equipment-store',
    components: {
        storeList
    },
    data () {
        return {
            roleType: 0,
            companyId: 0,
            storeData: [],
            companyList: [],          
            sCompany: ''           
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'equipment-edit' || from.name === 'equipment-create') {
            next(vm => {
                vm.getEquipments()
            })
        } else {
            next()
        }
    },
    methods: {
        init () {
            this.roleType = this.$store.state.user.roleType

            if (this.roleType === 0 || this.roleType === 1) {
                this.loadCompanys()
            } else if (this.roleType === 2) {
                this.sCompany = this.$store.state.user.companyId
                this.getStores()
            }
        },

        getStores () {
            let vm = this

            equipment.getStores(this.sCompany).then(res => {
                if (res.status === 0) {
                    vm.storeData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取库存信息失败',
                        desc: res.message
                    })
                }
            })
        },

        selectCompany (val) {
            this.getStores()
        },

        loadCompanys () {
            let vm = this

            company.listByType(2).then(res => {
                if (res.status === 0) {
                    vm.companyList = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取公司信息失败',
                        desc: res.message
                    })
                }
            })
        }
    },
    created: function () {
        console.log('In equipment index create function')
        this.init()
    }
}
</script>

<style scoped>
.filter-panel {
    margin-bottom: 10px;
}

.filter-panel .ivu-select {
    margin-right: 15px;
}
</style>
