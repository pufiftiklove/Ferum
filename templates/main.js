//Загрузка текстур
image_src = "https://sun9-21.userapi.com/impg/TzZxtvF5GaYZVJzlfNOfiyjOknDAk5LRNnXgog/td1U1y0TNKk.jpg?size=226x226&quality=96&sign=e012f71aea994566474f92245e2ca5fc&type=album";


//Защита от КликДжакинг
if (top != window) {
    top.location = window.location;
}

//Меню
$(document).ready(function () {
    $("#button_home").click(function () {
        if ($("#content_home").is(":hidden")) {
            //Показ профиля
            $("#content_home").show("slow");
            $("#content_message").hide("slow");
            $("#chats").hide("slow");
            $("#emoticn").hide("slow");
            //$("#love").hide("slow");
            //Очистка поля под аватар
            if ($("#image_users").val() == "" || $("#image_users").val() == image_src) {
                $("#image_users").val("");
            }
            else {

            }
        }
        else {
            console.log("1");
            //Заполнение поля 
            if ($("#image_users").val() == "") {
                $("#image_users").val(image_src);
            }
            else {

            }
            var key = $("#password").val();
            if ($("#id_user").val() != "" && $("#password").val() != "" && key.length == 10 && $("#id_sender").val() != "") {
                $("#content_home").hide("slow");
                $("#content_message").show("slow");
                $("#chats").show("slow");
                chat_window.scrollTop = 9999;
            }
        }


        return false;
    });
    //Эмоции
    $("#emoticon").click(function () {
        if ($("#emoticn").is(":hidden")) {
            $("#emoticn").show("slow");
            $("#content_message").hide("slow");
            //$("#love").hide("slow");
        }
        else {
            $("#emoticn").hide("slow");
            $("#content_message").show("slow");
        }
    });
    /*Любовь
    $("#lovee").click(function () {
      if ($("#love").is(":hidden")) {
        $("#love").show("slow");
        $("#content_message").hide("slow");
        $("#emoticn").hide("slow");
      }
      else{
        $("#love").hide("slow");
        $("#content_message").show("slow");
        
      }
    });
    */
});

// Загрузка и отображение сообщений
function load_Messages() {
    $.get(
        "/get_messages",
        (data) => {
            $("#chat_window").empty();
            var messages = data["messages"];
            for (var i in messages) {
                var message = messages[i];
                var id = message["id_user"];
                var id_sender = message["id_sender"];
                var image_users = message["image_users"];
                var text = message["text"];
                var time = message["time"];
                var key = $("#password").val();
                var id_sender_send = "", id_sender_2 = "", id_send = "", text_send = "", id_send = "", id_2 = "", inp = "", text_encrypted = "";
                for (i = 0; i < id_sender.length; i++) {  // берём цифровое значение очередного символа в сообщении и ключе 
                    id_sender_2 = id_sender.charCodeAt(i);
                    k = key.charCodeAt(i);  // и применяем к ним исключающее или — XOR  
                    id_sender_send += String.fromCharCode(id_sender_2 ^ k);
                }
                for (i = 0; i < id.length; i++) {  // берём цифровое значение очередного символа в сообщении и ключе  
                    id_2 = id.charCodeAt(i);
                    k = key.charCodeAt(i);  // и применяем к ним исключающее или — XOR    
                    id_send += String.fromCharCode(id_2 ^ k);
                }
                for (i = 0; i < text.length; i++) {  // берём цифровое значение очередного символа в сообщении и ключе  
                    inp = text.charCodeAt(i);
                    k = key.charCodeAt(i);  // и применяем к ним исключающее или — XOR  
                    text_encrypted += String.fromCharCode(inp ^ k);
                }
                if (id_send + id_send == $("#id_user").val() + $("#id_sender").val() && $("#id_user").val() != "" || id_send + id_sender_send == $("#id_sender").val() + $("#id_user").val() && $("#id_user").val() != "" || id_sender_send + id_send == $("#id_sender").val() + $("#id_user").val() && $("#id_user").val() != "") {
                    console.log(3);
                    if ($("#id_sender").val() == id_sender_send) {
                        if (theme == "orange") {
                            var html = "<div class='div_sender1'> <b style='color:#303C6C;'> " + `<img src=${image_users} width='35' height='35' style="margin-left:5px; margin-top:5px; border-radius: 5px 5px 5px 5px;">` + "<big><b style='color:#54548a;'> -" + text_encrypted + " </b>" + "<i style='color:#6d945d;'></big>" + time + "</i> </div><p></p>";
                        }
                        else {
                            var html = "<div class='div_sender'> <b style='color:#303C6C;'> " + `<img src=${image_users} width='35' height='35' style="margin-left:5px; margin-top:5px; border-radius: 5px 5px 5px 5px;">` + "<big><b style='color:#54548a;'> -" + text_encrypted + " </b>" + "<i style='color:#6d945d;'></big>" + time + "</i> </div><p></p>";
                        }
                    }
                    if ($("#id_sender").val() == id_send) {
                        if (theme == "orange") {
                            var html = "<div class='div_user1'> <b style='color:#54548a;'> " + `<img src=${image_users} width='35' height='35' style="margin-left:5px; margin-top:5px; border-radius:5px 5px 5px 5px;">` + "<big><b style='color:#303C6C;'> -" + text_encrypted + " </b>" + "<i style='color:#6d945d;'></big>" + time + "</i> </div><p></p>";
                        }
                        else {
                            var html = "<div class='div_user'> <b style='color:#54548a;'> " + `<img src=${image_users} width='35' height='35' style="margin-left:5px; margin-top:5px; border-radius:5px 5px 5px 5px;">` + "<big><b style='color:#303C6C;'> -" + text_encrypted + " </b>" + "<i style='color:#6d945d;'></big>" + time + "</i> </div><p></p>";
                        }

                        $.get("/del_message", { "im": i });

                    }
                    else {

                    }

                    var div = $(html);
                    $("#chat_window").append(div);
                }
            }
        }
    );
}

// Отправка сообщения
function send_Message() {
    var image_users = $("#image_users").val();
    var id_sender = $("#id_sender").val();
    setCookie('user_cook', id_sender);
    setCookie('img_cook', image_users);
    var id = $("#id_user").val();
    var text = $("#text").val();
    if ($("#id_user").val() != "" && $("#text").val() !== "") {
        var key = $("#password").val();
        var key = $("#password").val();
        var id_sender_send = "", id_sender_2 = "", id_send = "", text_send = "", id_send = "", id_2 = "", inp = "", id_sender_send = "", image_users_2 = "";
        //Шифр Вермана
        for (i = 0; i < id_sender.length; i++) {  // берём цифровое значение очередного символа в сообщении и ключе 
            id_sender_2 = id_sender.charCodeAt(i);
            k = key.charCodeAt(i);  // и применяем к ним исключающее или — XOR  
            id_sender_send += String.fromCharCode(id_sender_2 ^ k);
        }
        for (i = 0; i < id.length; i++) {  // берём цифровое значение очередного символа в сообщении и ключе  
            id_2 = id.charCodeAt(i);
            k = key.charCodeAt(i);  // и применяем к ним исключающее или — XOR    
            id_send += String.fromCharCode(id_2 ^ k);
        }
        for (i = 0; i < text.length; i++) {  // берём цифровое значение очередного символа в сообщении и ключе  
            inp = text.charCodeAt(i);
            k = key.charCodeAt(i);  // и применяем к ним исключающее или — XOR  
            text_send += String.fromCharCode(inp ^ k);
        }
        $.get("/send_message", { "image_users": image_users, "id_sender": id_sender_send, "id_user": id_send, "text": text_send });
        $("#text").val("");
    }
}
function theme_orange() {
    setCookie('background', "orange");
    // '#FBE8A6
    document.body.style.background = '#fff9ea';
    theme = "orange";
}
function theme_gray() {
    setCookie('background', "gray");
    document.body.style.background = '#1a1a1a';
    theme = "gray";
}

// При загрузке страницы
$(() => {
    // Куки
    $("#id_sender").val(getCookie('user_cook'));
    $("#image_users").val(getCookie('img_cook'));
    if (getCookie('background') == "orange") {
        // #FBE8A6
        document.body.style.background = '#fff9ea';
        let containerElement = document.querySelector('div_sender');
        theme = "orange";
    }
    else {
        document.body.style.background = '#1a1a1a';
        theme = "gray";
    }
    var key = $("#password").val();
    if ($("#id_user").val() != "" && $("#password").val() != "" && key.length == 10 && $("#id_sender").val() != "") {
        $("#content_home").hide("slow");
        $("#content_message").show("slow");
        $("#chats").show("slow");
        chat_window.scrollTop = 9999;
    }
    // При нажатии клавиш в поле текст
    $("#text").on("keypress", (event) => {
        // При нажатии Enter, вызвать функцию sendMessage
        if (event.keyCode == 13) {
            send_Message();
        }
    });

    // Каждую секунду вызывать loadMessages
    setInterval(load_Messages, 1000);
    setInterval(image_check, 2500);

});

function image_check() {
    if ($("#image_users").val() != "" && $("#image_users").val() != " ") {
        document.getElementById("button_home").src = $("#image_users").val();
    }
    if (getCookie('img_cook') != "") {
        $("image_users").val(getCookie('img_cook'));
    }
    else {

    }
}

function smile1() {
    $("#text").val($("#text").val() + "&#128513;");
    $("#content_message").show("slow");
    $("#emoticn").hide("slow");
}
function smile2() {
    $("#text").val($("#text").val() + "&#128518;");
    $("#content_message").show("slow");
    $("#emoticn").hide("slow");
}
function smile8() {
    $("#text").val($("#text").val() + "&#129303;");
    $("#content_message").show("slow");
    $("#emoticn").hide("slow");
}
function smile18() {
    $("#text").val($("#text").val() + "&#128532;");
    $("#content_message").show("slow");
    $("#emoticn").hide("slow");
}
function love1() {
    $("#text").val($("#text").val() + "&#128150;");
    $("#content_message").show("slow");
    $("#emoticn").hide("slow");
}
 //🎖 Добавить смайлик