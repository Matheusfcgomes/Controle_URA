const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
const host = 'mqtt://broker.emqx.io:1883'
const publishTopic = 'Matheus/URA'
var ledIsOn = false
var msg = 'off'
const options = {
  username: 'mqtt',
  password: 'lar_mqtt',
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  }
}
console.log('Connecting mqtt client')
const client = mqtt.connect(host, options)
client.on('error', err => {
  console.log('Connection error: ', err)
  client.end()
})
client.on('reconnect', () => {
  console.log('Reconnecting...')
})

client.on('connect', function () {
  console.log('Conectado ao servidor MQTT')
})



function move(cmd){
  client.publish(publishTopic, cmd, { qos: 0, retain: false })
  console.log(cmd) 
}
