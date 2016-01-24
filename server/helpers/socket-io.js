/**
 * Created by domenicovacchiano on 09/04/15.
 * Socket.io helper class to store all the client conenctions and to send them a message
 */


var socketConnections = [];

exports.connections = function() {
    return socketConnections;
};
exports.emitEvent=function(eventName,data){
    socketConnections.forEach(function(_socket) {
        _socket.volatile.emit(eventName,data);
    });

};