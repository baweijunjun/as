<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
           <el-form-item label="用户姓名">
            <el-input v-model="form.name" size="small"></el-input>
           </el-form-item>
            <el-form-item label="用户姓名">
            <el-input v-model="form.name" size="small"></el-input>
           </el-form-item>
            <el-form-item label="用户姓名">
            <el-input v-model="form.name" size="small"></el-input>
           </el-form-item>
           <el-form-item label="归属组织">
           <el-popover placement="right" width="500" trigger="click" @after-enter="toFetchGroup">
           <el-container direction="vertical">
           <el-form>
             <el-row>
               <el-col :span="12">
                <el-input size="small" v-model="filterItem"></el-input>
               </el-col>
               <el-col :span="12">
                <el-button size="small" @click="group">查询</el-button>
               </el-col>
             </el-row>
           </el-form>
                 <el-table :data="group" :stripe="true" height="400" @row-click="rowClick">
                   <el-table-column width="60" type="index" label="序号"></el-table-column>
                   <el-table-column width="170" property="ORGNAME" label="组织名称"></el-table-column>
                   <el-table-column width="170" property="FORGNAME" label="上级组织"></el-table-column>
                 </el-table>
           </el-container>

            <el-input v-model="newform.group" slot="reference" size="small">
                <i slot="suffix" class="el-input__icon el-icon-arrow-down"></i>
              </el-input>
           </el-popover>
           </el-form-item>
    </el-form>
    <hr>
     <el-table size="small" :data="tableData" border style="width: 100%">
     <el-table-column type="index" width="50"></el-table-column>
     <el-table-column prop="name" label="姓名" width="120"></el-table-column>
     <el-table-column prop="id" label="员工ID" width="120"></el-table-column>
     <el-table-column prop="code" label="员工编号" width="120"></el-table-column>
     <el-table-column prop="phone" label="手机号" width="300"></el-table-column>
     <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
     <el-table-column prop="org" label="归属组织" width="120"></el-table-column>
     <el-table-column prop="auth" label="权限" width="120"></el-table-column>
     <el-table-column prop="forg" label="上级组织" width="120"></el-table-column>
     <el-table-column prop="date" label="创建时间" width="120"></el-table-column>
     <el-table-column fixed="right" label="操作" width="100">
     <template slot-scope="scope">
     <el-button @click="handleClick(scope)" type="text" size="small">编辑</el-button>
     <el-button @click="remove(scope)" type="text" size="small">删除</el-button>
     </template>
    </el-table-column>
  </el-table>
    <el-pagination @current-change="pageChanges" :page-size="pageSize" background layout="prev,pager,next" :total="table.length"></el-pagination>
    <el-button size="small" type="primary" style="float:right" @click="addNew">添加</el-button>
    <el-dialog title="添加/编辑" :visible.sync="dialogFormVisible">
  <el-form  :model="newform" label-position="left">
    <el-form-item label="员工姓名" >
      <el-input size="small" v-model="newform.name" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="邮箱" >
      <el-input size="small" v-model="newform.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="证件类型" >
      <el-select size="small" v-model="newform.code" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="证件号码" >
      <el-input size="small" v-model="newform.id" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="人员状态" >
      <el-select size="small" v-model="newform.auth" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
      <el-form-item label="手机号码" >
      <el-input size="small" v-model="newform.mobile" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="归属组织" >
      <el-input size="small" v-model="newform.org" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import { mapState,mapActions,mapGetters,mapMutations } from 'vuex';
    export default{
        data(){
            return{
                form:{
                    name:"tset",
                    group:"未知组织"
                },
                newform:{
                    name:"",
                    email:"",
                    code:"",
                    id:"",
                    auth:"",
                    mobile:"",
                    group:"",
                    org:""
                },
                filterItem:'',
                pageSize:5,
                page:1,
                formLabelWidth:90,
                dialogFormVisible:false
            }
        },
        computed:{
            tableData(){
                  let tableArr = this.table.slice(this.pageSize*(this.page-1),this.pageSize*this.page)
                  return tableArr;
            }, 
            group(){
                return this.filterGroup()(this.filterItem)
            },
              ...mapState(['table'])
        },
        watch:{
            group(_old,_new){
                this.flag=false
            }
        },
        methods:{
            toFetchGroup(){
                this.fetchGroup()
            },
            toFetchTable(){
                // this.$store.dispatch('fetchTable');
                this.fetchTable()
            },
            rowClick(row,event,column){
                this.form.group = row.ORGNAME
            },
            toFilter(filter){
                this.filterGroup()(filter)
            },
            handleClick(scope){
              this.dialogFormVisible=true
              this.newform=scope.row
            },
            addNew(){
               this.dialogFormVisible=true
            },
            remove(){
               this.$alert('确定要删除吗？','提示',{
                   callback(){
                      this.deleteItem(scope.row.code)
                   }
               })
            },
            pageChange(page){
               this.page = page;
            },
            ...mapMutations(['deleteItem']),
            ...mapActions(['fetchGroup','fetchTable']),
            ...mapGetters(['filterGroup'])
        },
        mounted(){
            this.toFetchTable();
        }
    }
</script>

<style lang="">
    .el-form-item{
        display:inline-block;
    }

</style>