<template>
    <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center p-0">
        <div id="widget" class="_form d-black bg-w shadow-lg text-center">
            <div :class="this.didListModal === false ? '_toggle-menu position-sticky d-flex justify-content-end col-12 align-items-center px-3':'hide'">
                <a id="toggle-menu" @click="menuTrigger">
                    <div id="dash-1" class="_dash my-2"></div>
                    <div id="dash-2" class="_dash my-2"></div>
                    <div id="dash-3" class="_dash my-2"></div>
                </a>
            </div>
            <div :class="this.didListModal === false ? '_content justify-content-center d-flex align-items-center':'hide'">
                <div id="content" class="_setting">
                    <h2>Data</h2>
                    <br>
                    <!--<p class="mt-3">You have no Ecosystems.</p>-->
                    <div class="d-flex mt-4 align-items-start _setting-items">
                        <div class="col-10 _item">
                            <h4>Key Import</h4>
                            <!--<p>Based on the domain<br>name service (DNS).</p>-->
                        </div>
                        <div class="col">
                            <NuxtLink to="/settings/data/key/import" class="_button-view _bounce">Import</NuxtLink>
                        </div>
                    </div>
                </div>
                <div id="menu-content" class="_menu-content hide">
                    <ul>
                        <li>
                            <NuxtLink to="/credentials">{{$t('MENU.CREDENTIALS')}}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/connections">{{$t('MENU.CONNECTIONS')}}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/settings">{{$t('MENU.SETTINGS')}}</NuxtLink>
                        </li>
                        <li>
                            <a @click="logout">{{$t('MENU.LOGOUT')}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div :class="this.didListModal === true ? '_content d-flex':'hide'">
                <div class="mt-3">
                    <div class="_top-bar px-3">
                        <div class="d-flex align-items-center _animation-fade">
                            <a href="#" @click="hideModal" class="_back-button">
                                <span class="d-flex align-items-center">
                                    <i class="bi bi-chevron-left"></i>
                                    <p>Back</p>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="_did-content">
                        <h2>All Selected DID</h2>
                        <br>
                        <div class="d-grid justify-content-center">
                                <a href="#" v-for="did in dids" @click="setDefaultDID(did)" v-bind:key="did.index" class="_card d-flex">
                                  <div class="col-9 d-flex align-items-center">
                                    <div>
                                      <h5 class="mb-1">{{did.slice(0,25)}}...</h5>
                                      <p class="text-truncate" style="max-width: 12em">{{copyright}}</p>
                                    </div>
                                  </div>
                                  <div class="col d-flex justify-content-end align-items-start">
                                    <b v-if="currentDid === did" class="_tag mt-2"><em>Default</em></b>
                                    <b v-else class="_tag-active mt-2"><em>Set default</em></b>
                                    
                                  </div>
                                </a>
                        </div>
                    </div>  
                </div>
            </div>
            <div :class="this.didListModal === false ? '_copyright _blue-color d-flex align-items-center justify-content-center': 'hide'">
                <a id="copyright" href="https://walt.id/" target="_blank">{{copyright}}</a>
            </div>
        </div>
    </section>
</template>

<script>
import {menuTransitionShow, menuTransitionHide} from '../../../helpers/menuTransation'
import {config} from '@/config.js'

export default {
  name: 'Ecosystems',
  data() {
    return {
      copyright: config.copyright,
      trigger: true,
      didListModal: false,
      setDD: false
    }
  },
  computed: {
    dids () {
      console.log(this.$store.state.wallet.dids)
      console.log(this.copyright)
      return this.$store.state.wallet.dids
    },
    currentDid () {
        console.log(this.$store.state.wallet.currentDid)
        return this.$store.state.wallet.currentDid
    }
  },
  methods:{
     menuTrigger: function(){
          if(this.trigger === true){
              menuTransitionShow()
              this.didListModal=false
              this.trigger = false
          }
          else{
              menuTransitionHide()
              this.trigger = true
          }
      },
      hasDidFor: function(type) {
          console.log("wallet state", this.dids)
          return this.dids.findIndex(d => this.hasType(d, type)) != -1
      },
      hasType: function(did, type) {
          return did.match(`\\w+:${type}:.*`)
      },
      showModal: function(){
          this.didListModal=true
      },
      hideModal: function(){
          this.didListModal=false
      },
      trySetDefaultDID: function(){
          this.setDD=true
      },
      cancelSetDefaultDID: function(){
          this.setDD=false
      },
      setDefaultDID: function(did){
          this.$store.commit('wallet/setCurrentDid', did)
          this.setDD=false
      },
      logout: async function() {
        await this.$auth.logout();
      },
      
  }
};
</script>
