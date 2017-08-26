<<template>
    <div class="navmenu">
        <b-btn block v-b-toggle.accordion1 variant="primary">用户管理</b-btn>
        <b-collapse id="accordion1" visible accordion="my-accordion">
            <b-card>
                <ul class="nav nav-pills flex-column">
                    
                    <li class="nav-item">
                        <router-link :to="{ name: 'hello' }" class="nav-link">测试</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'account' }" class="nav-link">普通用户管理</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Another nav item</a>
                    </li>
                </ul>
            </b-card>
        </b-collapse>
        <b-btn block class="mt-1" v-b-toggle.accordion2 variant="primary">货品管理</b-btn>
        <b-collapse id="accordion2" accordion="my-accordion">
            <b-card>
                 <ul class="nav nav-pills flex-column">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Nav item again</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">One more nav</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Another nav item</a>
                    </li>
                </ul>
            </b-card>
        </b-collapse>
        <b-btn block class="mt-1" v-b-toggle.accordion3 variant="primary">Accordion 3</b-btn>
        <b-collapse id="accordion3" accordion="my-accordion">
            <b-card>
                Accordion 3 contents Here
            </b-card>
        </b-collapse>
    </div>
</template>

<<script>
export default {
  name: 'navmenu',
  data () {
      return {
      }
  }
}
</script>

<style scoped>
.navmenu .nav {
    margin-bottom: 20px;
}

.navmenu .nav-item {
    width: 100%;
}

.navmenu .nav-item+.nav-item {
    margin-left: 0;
}

.navmenu .nav-link {
    border-radius: 0;
}
</style>
