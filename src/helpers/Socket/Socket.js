import { io } from 'socket.io-client';
export const socket = io.connect('http://192.168.43.122:8888');

const Initialize_Socket = (name) => {
    let msg = "hello"
     socket.emit('initialize_socket', name)
     socket.on('get_socketid',(data)=>{
        console.log("^^^^^^^^")
        console.log(data)
        console.log("^^^^^^^^")
     })
}
export default Initialize_Socket