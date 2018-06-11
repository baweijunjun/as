<template> 
 <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="always" >
          <router-link to="/three">发起更名流程工单</router-link>
        </el-card>
      </el-col>
     <el-col :span="8">
       <el-card shadow="hover">
           <router-link to="/one">发起过户流程工单</router-link>
       </el-card>
      </el-col>
     <el-col :span="8">
       <el-card shadow="never">
         工程维护单
       </el-card>
     </el-col>
      <el-col :span="8">
       <el-card shadow="never">
         其他类型工单
       </el-card>
     </el-col>
    </el-row>
 </div>
</template>
<script>
    export default{
        data(){
            return{
                
            }
        },
        methods:{
           tiao(){
             alert(0)
              //this.$router.push('/home');
            },
        }
    }
</script>

<style lang="">
    .el-col{
        margin-top:20px;
    }
    .el-card{
        height:200px;
    }
</style>