const OC = require("./napi/lib/iotivity-lite.js");
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})



function init_platform_cb(parm) {
  console.log("init_platform_cb");
  console.log(param);

  var stack = new Error().stack
  console.log( stack )
}

function add_device_cb(param) {
  console.log("add_device_cb");
  console.log(param);
  var stack = new Error().stack
  console.log( stack )

}


function app_init()
{
  console.log("app_init");
  console.log("call OC.init_platform");
  var ret = OC.init_platform("Intel Corporation", null, null);
  console.log("end call oc_init_platform");

  console.log("call OC.add_device");
  ret |= OC.add_device("/oic/d", "oic.wk.d", "Generic Client", "ocf.2.0.5",
                       "ocf.res.1.3.0", null, null);

  return ret;
}

var ep = null;

function get_handler(resp)
{
  console.log("get_handler");
  console.log(resp);
}

function justwork(uuid, stat)
{
  console.log("obt_justwork");
  console.log("" + uuid);
  console.log("" + stat);

  OC.do_get('/oic/p', ep, null, get_handler, OC.HIGH_QOS);
}

function obt_discover(uuid, endpoints)
{
  console.log("obt_discover");
  console.log("" + uuid);
  console.log("" + endpoints);

  ep = endpoints;

  OC.Obt.perform_just_works_otm(uuid, justwork);
}

function request_entry() {
  console.log("request_entry");
  OC.Obt.init();
  OC.Obt.discover_unowned_devices(obt_discover);

}

function handle_signal()
{
  console.log("OC.oc_main_shutdown()");
  OC.main_shutdown();
  console.log("end OC.oc_main_shutdown()");
}

async function main() {
  process.on('SIGINT', handle_signal);

  //OC.oc_storage_config("./simpleclient_creds");

  var handler = new OC.Handler();
  handler.init = app_init;
  handler.requests_entry = request_entry;

  console.log("OC.oc_main_init(handler)");
  var init = OC.main_init(handler);
  console.log("end OC.oc_main_init(handler)");
  await OC.main_loop();
  console.log("end OC.oc_main_loop()");
};

main();
