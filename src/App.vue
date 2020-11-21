<template>
  <div id="app" class="container">
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
    <div class="col">
      <b-list-group>
        <b-list-group-item button>Button item</b-list-group-item>
        <b-list-group-item button>I am a button</b-list-group-item>
        <b-list-group-item button disabled>Disabled button</b-list-group-item>
        <b-list-group-item button>This is a button too</b-list-group-item>
      </b-list-group>
    </div>

    <div class="col">
      <b-list-group id="propertylist">
        <b-list-group-item button>Button item</b-list-group-item>
      </b-list-group>
      <b-tabs content-class="mt-3">
        <b-tab title="Generic Client"><p>I'm the first tab</p></b-tab>
        <b-tab title="Access Control"><p>I'm the second tab</p></b-tab>
        <b-tab title="Credential"><p>I'm a disabled tab!</p></b-tab>
        <b-tab title="Linked Devices"><p>I'm a disabled tab!</p></b-tab>
      </b-tabs>
    </div>
    </div>

  </div>
</template>

