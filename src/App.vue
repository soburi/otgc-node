<script>
const { ipcRenderer } = window.require('electron')

export default {
  name: "otbc",
  data() {
    return {
      devices: {},
      selected: '',
    }
  },
  methods: {
    device_info(uuid) {
      console.log(uuid);
      var di = this.devices[uuid];
      console.log(di);
      if(typeof di === 'undefined') {
        return {};
      }

      var flatten = function(ht, prefix, result) {
        if(typeof ht === 'object') {
          for(var k in ht) {
            var prefixn = k;
            if(prefix != "") prefixn = prefix + "." + k;

            var h = flatten(ht[k], prefixn, result);
            for(var k2 in h) {
              result[k2] = h[k2];
            }
          }
        } else {
          result[prefix] = ht;
        }
        return result;
      }

      return flatten(di, "", {});
    },
    discovery() {
      var vm = this;

      //ipcRenderer.removeAllListeners('discovery');
      ipcRenderer.on('discovery', (event, msg) => {
        if(typeof msg.uuid === 'undefined') return;
        console.log(JSON.stringify(msg));
        var d = vm.devices[msg.uuid];
        console.log(JSON.stringify(d));
        if(typeof d === 'undefined') {
          d = {oic: { d: { di: "", n: "", piid: "", role: "", types: "" },
                             p: { } }, endpoints: msg.endoints };
          vm.$set(vm.devices, msg.uuid, d);
        } else {
          d['endpoints'] = msg.endpoints;
          vm.$set(vm.devices, msg.uuid, d);
	}
      });

      //ipcRenderer.removeAllListeners('/oic/d');
      ipcRenderer.on('/oic/d', (event, msg) => {
        if(typeof msg.uuid === 'undefined') return;
        console.log(JSON.stringify(msg));
        var d = vm.devices[msg.uuid];
        console.log(JSON.stringify(d));
        if(typeof d !== 'undefined') {
          var uuid = msg.uuid;
          delete msg.uuid;
          vm.$set(vm.devices[uuid]['oic'], 'd', msg);
          console.log(JSON.stringify(vm.devices[uuid]));
	}
      });

      //ipcRenderer.removeAllListeners('/oic/p');
      ipcRenderer.on('/oic/p', (event, msg) => {
        if(typeof msg.uuid === 'undefined') return;
        console.log(JSON.stringify(msg));
        var d = vm.devices[msg.uuid];
        if(typeof d !== 'undefined') {
          var uuid = msg.uuid;
          delete msg.uuid;
          vm.$set(vm.devices[uuid]['oic'], 'p', msg);
          console.log(JSON.stringify(vm.devices[uuid]));
	}
      });

      ipcRenderer.on('/oic/res', (event, msg) => {
        console.log(JSON.stringify(msg));
      });

      ipcRenderer.invoke('discovery', '').then((result) => {
        console.log(result);
      })
    },
    onboard() {
      var eps = this.devices[this.selected].endpoints;
      console.log(eps);
      ipcRenderer.invoke("onboard", { uuid: this.selected, endpoints: eps} ).then((result) => {
        console.log(result);
      });
    },
    offboard() { ipcRenderer.invoke("discovery"); },
    obt_mode() { ipcRenderer.invoke("discovery"); },
    client_mode() { ipcRenderer.invoke("discovery"); },
    select_device(uuid) {
      this.$set(this, 'selected', uuid);
    },
    showAlert(arg) {
      alert(arg);
    },
  }
}
</script>


<template>
  <div id="wrap" class="wrap">
    <div id="app" class="container-fluid container-root">

      <b-navbar toggleable="lg" type="dark" variant="info" class="navbar">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item active v-on:click="discovery()">   Discover    </b-nav-item>
            <b-nav-item active v-on:click="onboard()">     Onboard     </b-nav-item>
            <b-nav-item active v-on:click="offboard()">    Offboard    </b-nav-item>
            <b-nav-item active v-on:click="obt_mode()">    OBT mode    </b-nav-item>
            <b-nav-item active v-on:click="client_mode()"> Client mode </b-nav-item>
            <b-nav-item active v-on:click="reset()">       Reset       </b-nav-item>
            <b-nav-item active v-on:click="certificate()"> Certificate </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <div id="main" class="row">
        <div class="leftpane">
          <b-list-group id="devicelist" class="devicelist col">
            <b-list-group-item button v-for="(device, dkey) in devices" v-bind:key="dkey" v-on:click="select_device(dkey)" >
              <span style="display:block;">{{ device.oic.d.n }}</span>
              <span style="display:block;">{{ device.oic.d.di }}</span>
            </b-list-group-item>
          </b-list-group>
        </div>
        <div id="rightpane" class="col rightpane">
          <b-list-group id="propertylist" class="propertylist">
            <b-list-group-item button v-for="(val, key) in device_info(selected)" v-bind:key="key">
              <span style="display:block;"> <span>{{ key }}</span> <span>{{ val }}</span> </span>
            </b-list-group-item>
          </b-list-group>

          <b-tabs row class="tabs">
            <b-tab title="Generic Client"><p>I'm the first tab</p></b-tab>
            <b-tab title="Access Control"><p>I'm the second tab</p></b-tab>
            <b-tab title="Credential"><p>I'm a disabled tab!</p></b-tab>
            <b-tab title="Linked Devices"><p>I'm a disabled tab!</p></b-tab>
          </b-tabs>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>

::-webkit-scrollbar {
  display: none;
}

.container-root {
  padding-right: 0px;
  padding-left: 0px;
  height: 100vh;
  width: 100vw;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.wrap { 
    height: 100%;
    width: 100%;
    overflow: hidden;
} 

.navbar {
    height: 5vh;
}

.leftpane {
    width: 30vw;
}

.rightpane {
    width: 70vw;
}

.devicelist {
    overflow: scroll;
    height: 95vh;
    overflow-x: auto;
}

.propertylist {
    overflow: scroll;
    height: 50vh;
}

.tabs {
    height: 45vh;
}

</style>

