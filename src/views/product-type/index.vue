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

        }
    },
    methods: {
        getProductType () {
            let vm = this
            productType.list().then(res => {
                console.log(res)
            })
        },
        showCreate () {
            this.$router.push({ name: 'product-type-create' })
        },
        list_to_tree(list) {
            var map = {}, node, roots = [], i;
            for (i = 0; i < list.length; i += 1) {
                map[list[i].id] = i; // initialize the map
                list[i].children = []; // initialize the children
            }
            for (i = 0; i < list.length; i += 1) {
                node = list[i];
                if (node.parentId !== "0") {
                    // if you have dangling branches check that map[node.parentId] exists
                    list[map[node.parentId]].children.push(node);
                } else {
                    roots.push(node);
                }
            }
            return roots;
        }
    },
    created: function () {
        console.log('In product type index create function')
        this.getProductType()
    }
}
</script>
