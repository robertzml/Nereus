<template>
    <div>
        <h4>{{ msg }}</h4>
        <div class="my-1 row">
            <div class="col-md-6">
                <b-form-fieldset horizontal label="每页记录" :label-cols="6">
                    <b-form-select :options="pageOptions" v-model="perPage" />
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-form-fieldset horizontal label="搜索" :label-cols="3">
                    <b-form-input v-model="filter" placeholder="Type to Search" />
                </b-form-fieldset>
            </div>
        </div>

        <b-table striped hover :items="items"></b-table>
    </div>
</template>


<script>
export default {
    name: 'product-type-list',
    data () {
        return {
            items: []
        }
    },
    created: function () {

    }
}
</script>

