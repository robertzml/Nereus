<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    设备列表
                </p>
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
    name: 'equipment',
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

            equipment.getLogout().then(res => {
                vm.equipmentData = res.entities
            })
        }
    },
    created: function () {
        console.log('In equipment logout create function')
        this.init()
    }
}
</script>