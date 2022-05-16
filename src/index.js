import './prisma'
// import "@babel/polyfill" 
import "@babel/polyfill/noConflict" //điều này tránh xung đột, chỉ cần loadding phiên bản gốc không cần tải thư viện như mấy cái @bebel trong dev -_-  
import "babel-polyfill"

import server from './server';

server.start({
	port: process.env.PORT || 44444 
},() => {
	console.log("The server is up!")
});