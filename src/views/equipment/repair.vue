<template>
    <div id="equipment-repair">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                维修过设备出库数据
            </p>
            <a href="#" slot="extra" @click.prevent="loadRepair">
                <Icon type="ios-loop-strong"></Icon>
                刷新
            </a>

            <div class="filter-panel" style="margin-bottom:15px;">
                <DatePicker type="date" placement="bottom-end" placeholder="选择起始日期" style="width: 200px" v-model="startTime" :clearable="false"></DatePicker>

                <DatePicker type="date" placement="bottom-end" placeholder="选择结束日期" style="width: 200px" v-model="endTime" :clearable="false"></DatePicker>

                <Button type="primary" @click="loadRepair">查询</Button>
            </div>

            <br />

            <equipment-repair-list :item-list="repairList"></equipment-repair-list>
        </Card>
           
    </div>
</template>


<script>
/** 维修设备出库 */
import equipment from '@/controllers/equipment.js'
import EquipmentRepairList from '../components/equipment/equipment-repair-list.vue' 

export default {
    name: 'equipment-repair',
    components: {
      EquipmentRepairList
    },
    data () {
        return {
            roleType: 0,
            startTime: '',
            endTime: '',
            repairList: [],
            filterKey: ''
        }
    },   
    methods: {
         init () {
            this.endTime = new Date()

            let year = this.endTime.getFullYear()
            let month = this.endTime.getMonth()
            let day = this.endTime.getDate()
            this.startTime = new Date(year, month, 1)
            this.endTime = new Date(year, month, day)
        },

        loadRepair () {
            if (this.startTime === '' || this.endTime === '') {
                 this.$Message.warning({
                    content: '请选择日期',
                    duration: 2
                })
                return
            }
          
            let vm = this

            equipment.getRepair(this.startTime, this.endTime).then(res => {
                if (res.status === 0) {
                    vm.repairList = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取记录失败',
                        desc: res.message,
                        duration: 5
                    })
                }
            })
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
