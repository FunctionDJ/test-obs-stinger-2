/* Window init */

const win = nw.Window.get()

const reloadWatcher = require("fs").watch("./", () => {
  win.reload()
  reloadWatcher.close()
})

win.showDevTools()

const $ = q => document.querySelector(q)


/* OBS init */
const obsWS = require("obs-websocket-js")

const obs = new obsWS()

obs.connect({
  address: "localhost:4444"
}).then(() => {
  $(".obs-status").checked = true
})

/* Socket.io init */
const io = require("socket.io")(1234)

io.on("connection", socket => {
  $(".stinger-status").checked = true
})


/* Combo function */
const combo = () => {
  io.emit("stinger")

  setTimeout(() => {
    obs.send("TransitionToProgram")
  }, 1000)
}