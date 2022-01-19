var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/zuul/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    //最后一个是一个方法体，它是一个回调方法，当连接成功的时候就会调用这个方法，所以我们订阅后台消息就在这个方法体里做
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        var myJsessionId = $("#myJsessionId").val();
        //tompClient的订阅方法叫subscribe，有两个参数，第一个参数是订阅的地址，第二个参数是接收到消息时的回调函数
        stompClient.subscribe('itsm/' + myJsessionId, function (greeting) {
            console.log(JSON.parse(greeting.body));
            var respObj = JSON.parse(greeting.body);
            showGreeting("code:" + respObj.code + "-------msg:" + respObj.content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    //第一个是发送的地址，第二个参数是头信息，第三个参数是消息体
    stompClient.send("/app/hello", {}, JSON.stringify({
        'name': $("#name").val(),
        'myJsessionId': $("#toJsessionId").val()
    }));
    // stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
}

function test() {
    $.ajax({
        type: "get",
        url: "/test",
        dataType: "json",
        success: function (data) {
            console.log(data);
        }
    });
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").click(function () {
        connect();
    });
    $("#disconnect").click(function () {
        disconnect();
    });
    $("#send").click(function () {
        sendName();
    });
    $("#test").click(function () {
        test();
    });
});

