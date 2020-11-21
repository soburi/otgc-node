<template>
  <div id="app" class="container-fluid container-root">
    <div id="wrap" class="wrap bg-light align-items-center justify-content-center flex-fill">
      <b-navbar toggleable="lg" type="dark" variant="info">
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
<!--
        <div id="xmain" class="col devicelist">
          <b-list-group>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          <b-list-group-item button>This is a button too</b-list-group-item>
          </b-list-group>
	</div>
-->
        <div id="xmain" class="h-auto">
          <b-list-group id="propertylist" class="h-50 overflow-auto">
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
            <b-list-group-item button>Button item</b-list-group-item>
          </b-list-group>

          <b-tabs row class="h-50">
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

::webkit-scrollbar {
    display: none;
}

.container-root {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.devicelist {
    overflow: scroll;
    height: 100%;
}

.propertylist {
    overflow: scroll;
    height: 100%;
}

.wrap { 
    margin-right: -15px; 
    margin-left: -15px; 
} 

.full-height {
  height: 100vh;
  width: 100vw;
}

.flex-fill {
    flex: 1 1 auto;
}
</style>
