<template>
  <div class="box">
    <el-row>
      <el-col :span="4" style="box-sizing: border-box; height: 100vh; background-color: #545c64;">
        <div style="width: 100%; height: 40px; text-align: center;  color: white;">
          <h2>面经</h2>
        </div>
        <el-menu active-text-color="#ffd04b" router background-color="#545c64" class="el-menu-vertical-demo"
          default-active="2" text-color="#fff">

          <el-menu-item index="board">
            <el-icon>
              <el-icon>
                <PieChart />
              </el-icon>
            </el-icon>
            <span>数据看板</span>
          </el-menu-item>
          <el-menu-item index="Facial">
            <el-icon>
              <el-icon>
                <Memo />
              </el-icon>
            </el-icon>
            <span>面经管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" style="padding: 20px; box-sizing: border-box;">
        <div style=" width: 100%; display: flex; justify-content: space-between;">
          <div><el-icon>
              <el-icon>
                <Refresh />
              </el-icon>
            </el-icon>
            <el-icon>
              <Platform />
            </el-icon>
          </div>
          <div style="display: flex; align-items: center;">
            <div>
              {{ myname }}
            </div>
            <div @click="tui">
              <el-icon>
                <SwitchButton />
              </el-icon>
            </div>
          </div>
        </div>
        <div style="width: 100%; padding: 20px; box-sizing: border-box;">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">面经后台</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in route.meta.title" :key="index">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Refresh, Platform, PieChart, Memo, SwitchButton } from '@element-plus/icons-vue'
const myname = ref('' as any)
const route = useRoute();

const router = useRouter();
const tui = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
const mycreated = () => {
  myname.value = route.query.name
}
mycreated()
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;

  .el-menu-vertical-demo {
    width: 100%;
  }
}
</style>