var container = document.querySelector("div.container");
var envelopeWrapper = container.querySelector("div.envelope-wrapper");
envelopeWrapper.addEventListener("click", function () {
    envelopeWrapper.classList.add("flap");
}, { once: true });
envelopeWrapper.addEventListener("animationend", function () {
    var envelope = envelopeWrapper.querySelector("div.envelope");
    var letter = envelope.querySelector("div.letter");
    letter.classList.add("show");
    letter.addEventListener("animationend", function () {
        letter.classList.add("move");
        letter.addEventListener("animationend", function () {
            envelope.classList.add("disappear");
            envelope.addEventListener("animationend", function () {
                envelopeWrapper.remove();
                container.append(letter);
                letter.classList.add("resize");
                letter.addEventListener("animationend", function () {
                    var textTypingEle = document.createElement("div");
                    textTypingEle.classList.add("text");
                    var p = document.createElement("p");
                    p.id = "demo";
                    textTypingEle.append(p);
                    letter.innerHTML = textTypingEle.outerHTML;
                    setTimeout(function () {
                        write();
                    }, 1);
                }, { once: true });
            }, { once: true });
        }, { once: true });
    }, { once: true });
}, { once: true });

var speed = 60;
var txt = "Sài gòn, 28/07/2023|,|\\\\Tôi là ai| ?\\\\|.\\|.\\|.\\\\Một tình yêu chúng ta chẳng thể dừng|, cũng chẳng thể đến|.\\\\Như người thương cũng như người lạ|, cứ lúc gần lúc xa|.\\\\Dù em biết thế nhưng vẫn dại khờ tin vào tình yêu ấy|. Hai giờ sáng vẫn thức để đợi chờ chỉ một dòng nhắn tin|. Từ anh|, anh|, người tìm đến em khi cô đơn|. Rồi lúc thấy vui lại đối với em mập mờ|.\\|.\\|.\\|.";
var moreTxt = "Ở một diễn biến khác|,\\\\|Để nói ra những lời này";

function write() {
    var i = 0;
    typeWriter(i, txt);
}

function typeWriter(i, txt, more) {
    var letter = document.querySelector("div.letter");
    var textEle = document.querySelector("div.text");

    if (i < txt.length) {
        var text = txt.charAt(i);
        var p = document.querySelector("p#demo");
        if (text === "|") {
            i++;
            return setTimeout(function () {
                typeWriter(i, txt, more);
            }, speed * 5);
        }
        else if (text === "\\") {
            var br = document.createElement("br");
            p.append(br);
        }
        else {
            var span = document.createElement("span");
            span.innerHTML = text;
            p.append(span);
        }


        i++;
        setTimeout(function () {
            typeWriter(i, txt, more);
        }, speed);
    }
    else if (!more) {
        var p = document.querySelector("p#demo");
        var br = document.createElement("br");
        p.append(br);

        var button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = "Read more";
        button.addEventListener("click", function () {
            typeWriter(0, moreTxt, true);
            button.remove();
        }, { once: true });
        p.append(button);
    }

    letter.scrollTo({
        top: textEle.clientHeight,
        behavior: "smooth"
    });
}