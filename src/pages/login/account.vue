<template>
  <div>
    <el-form :model="login_model" label-position="top" ref="form">

      <el-form-item prop="account" :rules="rules" label="账号登录" >
        <el-input v-model="login_model.account" placeholder="请输入手机号或者邮箱"></el-input>
      </el-form-item>

       <el-form-item>
         <el-button :disabled="isPhoneDisabled" type="primary" v-on:click="checkValidate('phone')">{{phoneMsg}}</el-button>
         <el-button :disabled="isEmailDisabled" type="primary" v-on:click="checkValidate('email')">{{emailMsg}}</el-button>
       </el-form-item>

        <el-form-item label="动态密码">
         <el-input placeholder="请输入动态密码"></el-input>
        </el-form-item>

        <el-form-item>
         <el-button type="primary" @click="goLogin">登录</el-button>
        </el-form-item>


    </el-form>

  </div>
</template>

<script>
    export default{
        data(){
            return{
               login_model:{
                   account:""
               },
               rules:[
                   {required:true,message:'请输入账户信息'},
                   {type:'email',message:'请输入正确的邮箱地址'}
               ],
               phoneMsg:'使用手机号获取动态密码',
               emailMsg:'使用邮箱获取动态密码',
               timer:null,
               isDisabled:false
            }
        },
        methods:{
            cout_down(type){
              let start = 10;
              this.timer=setInterval(()=>{
                  start--;
                  type=='phone'?
                  (this.isPhoneDisabled = true, this.phoneMsg = start):
                  (this.isEmailDisabled = true, this.emailMsg = start);
                  if(start<0){
                      type=='phone'?this.phoneMsg = '重新动态发送密码':this.emailMsg='重新动态发送密码';
                      clearInterval(this.timer);
                      type=='phone'?this.isPhoneDisabled = false:this.isEmailDisabled = false
                  }
              },1000)
            },
            goLogin(){
              this.$router.push('/home');
            },
            checkValidate(type){
                if(this.rules.length>1){
                     this.rules.pop()
                }
                if(type=="phone"){
                  this.rules.push({validator:(rule,value,callback)=>{
                      console.log(rule)
                      console.log(value)
                      if(/^1[3758]\d{9}$/.test(value)){
                          callback()
                      }else{
                          callback(new Error("请输入正确格式的手机号"))
                      }
                  },message:'请输入正确的手机号'});
                }else if(type=="email"){
                  this.rules.push({type,message:'请输入正确的邮箱地址'});
                }
                    this.$refs.form.validate((isValid,rules)=>{
                        if(isValid){
                            this.cout_down(type)
                            //  this.$http.post('',{account:login_model.account}).then(res=>{
                            //      console.log(res);
                            //  })
                            // sessionStorage.setItem('islogin',1)
                        }
                    })
            }
        }
    }
</script>

<style lang="">
    
</style>