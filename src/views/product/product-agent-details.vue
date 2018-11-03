<template>
    <div class="product-agent-details">
        <Row style="margin-bottom: 15px;">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    分成比例
                </p>
                <a href="#" slot="extra" @click.prevent="showCreate" style="margin-right: 5px">
                    <Icon type="plus-round"></Icon>
                    新增
                </a>
                <a href="#" slot="extra" @click.prevent="getShareData">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>

                <share-list :item-list="shareData"></share-list>
                <share-create-mod :sale-rule-id="ruleId" ref="shareCreateMod" @refresh="getShareData"></share-create-mod>
            </Card>

            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="grid"></Icon>
                        代理产品信息
                    </p>
                    <a href="#" slot="extra" @click.prevent="getAgentProducts">
                        <Icon type="ios-loop-strong"></Icon>
                        刷新
                    </a>

                  
                    <Button type="primary" @click="toIndex" style="margin-left: 8px">返回</Button>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import product from '@/controllers/product.js'
import shareList from '../components/saleRule/share-list.vue'
import shareCreateMod from '../components/saleRule/share-create-mod.vue'

export default {
    name: 'product-agent-details',
    components: {
        shareList,
        shareCreateMod
    },
    data () {
        return {
            shareData: []
        }
    },
    methods: {
        init () {
            // this.getShareData()
        },

        getShareData () {
            let vm = this
            product.getShareList(this.ruleId).then(res => {
                if (res.status === 0) {
                    vm.shareData = res.entities
                } else {
                    this.$Notice.error({
                        title: '获取分成比例失败',
                        desc: res.message
                    })
                }
            })
        },

        showCreate () {
            this.$refs.shareCreateMod.show()
        }
    },
    mounted: function () {
        this.init()
    }
}
</script>
