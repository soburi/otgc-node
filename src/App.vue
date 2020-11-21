<template>
    <div id="wrap" class="wrap">
  <div id="app" class="container-fluid container-root">
      <b-navbar toggleable="lg" type="dark" variant="info" class="navbar">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Discover</b-nav-item>
            <b-nav-item href="#">Onboard</b-nav-item>
            <b-nav-item href="#">Offboard</b-nav-item>
            <b-nav-item href="#">OBT mode</b-nav-item>
            <b-nav-item href="#">Client mode</b-nav-item>
            <b-nav-item href="#">Reset</b-nav-item>
            <b-nav-item href="#">Certificate</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <div id="main" class="row">
        <div class="leftpane">
          <b-list-group id="devicelist" class="devicelist col">
          <b-list-group-item button>This is a button too</b-list-group-item>
          </b-list-group>
	</div>
        <div id="rightpane" class="col rightpane">
          <b-list-group id="propertylist" class="propertylist">
            <b-list-group-item button>Button item</b-list-group-item>
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
