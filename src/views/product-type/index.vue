<template>
    <Row>
        <Col span="24">
            <Card>
                <p slot="title">
                    <Icon type="grid"></Icon>
                    产品分类
                </p>
                <a href="#" slot="extra" @click.prevent="showCreate">
                    <Icon type="plus-round"></Icon>
                    新增
                </a>
                <a href="#" slot="extra" @click.prevent="getProductType">
                    <Icon type="ios-loop-strong"></Icon>
                    刷新
                </a>

                <Row>
                    <Col span="10">
                        <Tree :data="treeData" @on-select-change="showDetails"></Tree>
                    </Col>
                    <Col span="14">
                        <Form :model="typeInfo" :label-width="80">
                            <FormItem label="名称">
                                <Input v-model="typeInfo.name" readonly></Input>
                            </FormItem>
                             <FormItem label="备注">
                                <Input v-model="typeInfo.remark" type="textarea" :rows="4" readonly></Input>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>
</template>

<script>
import productType from '../../controllers/product-type.js'
import _ from 'lodash'

export default {
    name: 'product-type',
    data () {
        return {
            treeData: [],
            typeInfo: {
                name: '',
                remark: ''
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === 'product-type-create' || from.name === 'product-type-edit') {
            next(vm => {
                vm.getProductType()
            })
        } else {
            next()
        }
    },
    methods: {
        getProductType () {
            let vm = this
            productType.list().then(res => {
                vm.treeData = vm.listToTree(res.entities)
                console.log(vm.treeData)
            })
        },
        showCreate () {
            this.$router.push({ name: 'product-type-create' })
        },
        listToTree (list) {
            let map = {}
            let roots = []            
            for (let i = 0; i < list.length; i += 1) {
                map[list[i].id] = i // initialize the map
                list[i].children = [] // initialize the children
            }
            for (let i = 0; i < list.length; i += 1) {
                let node = list[i]
                node.title = node.name
                if (node.parent_id !== null) {
                    // if you have dangling branches check that map[node.parentId] exists
                    list[map[node.parent_id]].children.push(node)
                } else {
                    roots.push(node)
                }
            }
            return roots
        },
        showDetails (node) {
            this.typeInfo = node[0]
        }
    },
    created: function () {
        console.log('In product type index create function')
        this.getProductType()
    }
}
</script>
