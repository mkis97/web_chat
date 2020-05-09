var socket = io.connect('http://localhost:4000')

var message = document.getElementById('message'),
    nick = document.getElementById('nick'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    nbr = document.getElementById('noOfUsers'),
    feedback = document.getElementById('feedback');

btn.addEventListener('click', function () {
    socket.emit('chat', {
        message: message.value,
        nick: nick.value
    });
    message.value = ""
})

message.addEventListener('keypress', function () {
    socket.emit('typing', nick.value);
})

socket.on('chat', function (data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.nick + ': </strong>' + data.message + '</p>';
})

socket.on('typing', function (data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message... </em></p>';
})

socket.on('con', function(broj) {
    nbr.innerText=broj.toString()
});

socket.on('dis', function(broj) {
    nbr.innerText=broj.toString()
});

function success() {
    if(nick.value==="") {
        btn.disabled = true;
    } else {
        btn.disabled = false;
    }
}
