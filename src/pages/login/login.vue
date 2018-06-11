<template>
   <div class="login-box">
    <header>
     <h1>电信通</h1>
    </header>
    <section>
     <img src="../../.././static/2.jpg" class="imgs">
     <div class="bot">
    <p>
        <span v-on:click="tab_change('qrcode')" :class="active_change('qrcode')">二维码登录</span>
        <span v-on:click="tab_change('account')" :class="active_change('account')">账号登录</span>
    </p>
    <div>
    </div>
    <div class="login-content">
        <Transition>
        <Component :is="login_way"></Component>
        </Transition>
    </div>
    </div>
      </section>
   </div>
</template>

<script>
import qrcode from './qrcode.vue';
import account from './account.vue';
import './login.css'
    export default{
        data(){
            return{
                login_way:'qrcode',
                active_class:''
            }
        },
//beforeRouterEnter(to,from,next){
            //console.log('component login enter');
           // next();
       // },
        components:{
            qrcode:qrcode,
            account:account
        },
        methods:{
            tab_change(str){
                this.login_way=str;
            },
            active_change(str){
                return this.login_way===str?'active':''
            }
        }
    }
</script>