<template>
    <div id="equipment-return">
        <Card>
            <p slot="title">
                <Icon type="grid"></Icon>
                返厂设备数据
            </p>
            <a href="#" slot="extra" @click.prevent="loadReturn">
                <Icon type="ios-loop-strong"></Icon>
                刷新
            </a>

            <div class="filter-panel" style="margin-bottom:15px;">
                <DatePicker type="date" placement="bottom-end" placeholder="选择起始日期" style="width: 200px" v-model="startTime" :clearable="false"></DatePicker>

                <DatePicker type="date" placement="bottom-end" placeholder="选择结束日期" style="width: 200px" v-model="endTime" :clearable="false"></DatePicker>

                <Button type="primary" @click="loadReturn">查询</Button>
            </div>

            <br />

            <equipment-return-list :item-list="returnList"></equipment-return-list>
        </Card>
           
    </div>
</template>


<script>
/** 返厂设备 */
import equipment from '@/controllers/equipment.js'
import EquipmentReturnList from '../components/equipment/equipment-return-list.vue' 

export default {
    name: 'equipment-return',
    components: {
      EquipmentReturnList
    },
    data () {
        return {
            roleType: 0,
            startTime: '',
            endTime: '',
            returnList: [],
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

        loadReturn () {
            if (this.startTime === '' || this.endTime === '') {
                 this.$Message.warning({
                    content: '请选择日期',
                    duration: 2
                })
                return
            }
          
            let vm = this

            equipment.getReturn(this.startTime, this.endTime).then(res => {
                if (res.status === 0) {
                    vm.returnList = res.entities
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
