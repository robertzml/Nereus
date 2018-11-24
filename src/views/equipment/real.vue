<template>
    <div class="equipment-real">
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        设备实时数据列表
                    </p>
                    <a href="#" slot="extra" @click.prevent="search">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                    <div class="filter-panel" style="margin-bottom:15px;">
                        <span>产品类型</span>
                        <Select v-model="sProductType" style="width:200px" placeholder="选择产品类型">
                            <Option v-for="item in productTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <span>所属厂商</span>
                        <Select v-model="sCompany" style="width:200px" placeholder="选择厂商">
                            <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>

                        <Button type="primary" @click="search">查询</Button>
                    </div>

                    <div v-if="this.sProductType === 1">
                        <water-heater-real-list :item-list="realData"></water-heater-real-list>
                    </div>
                    <div v-else-if="this.sProductType === 2">

                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import company from '@/controllers/company.js'
import equipment from '@/controllers/equipment.js'
import waterHeaterRealList from '../components/equipment/water-heater-real-list.vue'

export default {
    name: 'equipment-real',
    components: {
        waterHeaterRealList
    },
    data () {
        return {
            productTypeList: [
                { id: 1, name: '热水器' },
                { id: 2, name: '直饮机' }
            ],
            companyList: [],
            sProductType: 0,
            sCompany: 0,
            realData: []
        }
    },
    methods: {
        init () {
            this.loadCompanys()
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
        },

        search () {
            if (this.sCompany === 0) {
                this.$Message.warning({
                    content: '请选择公司',
                    duration: 2
                })
                return
            }

            if (this.sProductType === 0) {
                this.$Message.warning({
                    content: '请选择产品类型',
                    duration: 2
                })
                return
            }

            let vm = this
            equipment.getWaterHeaterRealByCompany(this.sCompany).then(res => {
                if (res.status === 0) {
                    vm.realData = res.entities
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
