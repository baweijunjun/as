<template>   

<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="250px">
     <el-menu :default-openeds="['1']">
        <el-submenu v-for="(item,index) in menu" :index="index+1" :key="index">
            <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
            <el-menu-item v-for="(i,idx) in item.submenus" :index="index+1+'-'+idx+1" :key="idx">
           <router-link :to="{name:i.type}"> {{i.name}} </router-link>
            </el-menu-item>
        </el-submenu>
     </el-menu>
    </el-aside>
    <el-main>
     <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
import axios from 'axios';
import {mapState,mapActions} from 'vuex';
  export default{
    data(){
         return{
          
         }
    },
    computed:{
          ...mapState(['menu'])
    },
    methods:{
      handleOpen(key,keyPath){
        console.log(key,keyPath);
      },
      handleClose(key,keyPath){
        console.log(key,keyPath);
      },
      ...mapActions(['fetchMenu'])
    },
    mounted(){
      this.fetchMenu();
    }
  }
</script>

<style lang="">
.el-header{
  box-shadow:0px 2px 2px skyblue;
}
  
</style>