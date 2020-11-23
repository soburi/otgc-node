'use strict'

import { app, protocol, Menu, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

console.log("background.js");

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const templateMenu = [
  {
    label: 'File', submenu: [
      {
        label: 'Configuration',
        click(item, focusedWindow){
          if(focusedWindow) focusedWindow.reload()
        },
      },
      {
        label: 'Discover',
        click(item, focusedWindow){
          if(focusedWindow) focusedWindow.reload()
        },
      },
      {
        role: 'close',
      },
    ]
  },
  {
    label: 'Cloud', submenu: [
      {
        label: 'Configuration',
        click(item, focusedWindow){
          if(focusedWindow) focusedWindow.reload()
        },
      }
    ]
  },
  {
    label: 'Help', submenu: [
      {
        role: 'about',
      }
    ]
  },
  {
    label: 'Developper', submenu: [
      {
        role: 'toggleDevTools',
      }
    ]
  },
];

const menu = Menu.buildFromTemplate(templateMenu);

Menu.setApplicationMenu(menu);


async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true //process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

ipcMain.handle('message', (evt, arg) => {
  console.log(evt);
  console.log(arg);
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


const OC = require('iotivity-lite');


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
