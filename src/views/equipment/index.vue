<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    设备列表
                </p>
                <a href="#" slot="extra" @click.prevent="showCreate">
                    <Icon type="plus-round"></Icon>
                    新增
                </a>
                <a href="#" slot="extra" @click.prevent="getEquipments">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>
                
                <equipment-list :item-list="equipmentData"></equipment-list>
            </Card>
        </Col>
    </Row>
</template>

<script>
import equipment from '../../controllers/equipment.js'
import equipmentList from '../components/equipment-list.vue'

export default {
    name: 'equipment-index',
    components: {
        equipmentList
    },
    data () {
        return {
           equipmentData: []
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
            this.getEquipments()
        },

        getEquipments () {
            let vm = this
           
            let roleType = this.$store.state.user.roleType
            let companyId = this.$store.state.user.companyId

            if (roleType === 0 || roleType === 1) {
                equipment.listView().then(res => {
                    vm.equipmentData = res.entities
                })
            } else {
                equipment.listByCompanyView(companyId).then(res => {
                    vm.equipmentData = res.entities
                })
            }
        },
       
        showCreate () {
            this.$router.push({ name: 'equipment-create' })
        }
    },
    created: function () {
        console.log('In equipment index create function')
        this.init()
    }
}
</script>

