// amardeep kesharwani
let score = 0, index = 0, name = "", answer = [], times;

$(document).ready(function () {
    $(".continue-btn").click(function () {
        $(".sec1").fadeOut();
        $(".sec2").fadeIn();
    });
    $(".start-quiz").click(function () {
        name = $(".input").val();
        if (name === '') {
            alert("Please Enter Your Name")
            return;
        }
        $(".sec2").fadeOut();
        $(".sec3").fadeIn();
        newQuestion()
        startTimes()
    });
    $(".quiz").on("click", "li", function () {
        $(".quiz .select").removeClass("select");
        $(this).addClass("select");
    })
    $(".submit").click(function () {
        const select = $(".quiz li").hasClass("select");
        if (!select) {
            alert("please select any option");
            return;
        }
        const key = $(".quiz .select").attr("data-key");
        checkAns(key)
    })
    $(".check-ans").click(function () {
        $(".sec4").fadeOut();
        $(".sec5").fadeIn();
        showYourAns()
    });
    $(".back-btn").click(function () {
        $(".sec5").fadeOut();
        $(".sec4").fadeIn();
    });

});

let s = 0, m = "0" + 0;
function showTime() {
    s++
    if (s >= 60) {
        s = 0;
        m++
        m = m < 10 ? "0" + m : m;
    }
    s = s < 10 ? "0" + s : s;
    $(".time").text(m + ":" + s);
}
function startTimes() {
    times = setInterval(showTime, 1000)
}
function newQuestion() {
    const que = ques[index];
    showIndex()
    $(".question").text(que.que);
    $(".quiz").html("");
    que.option.forEach((q, i) => {
        const li = document.createElement('li');
        li.setAttribute('data-key', i);
        li.textContent = q;
        $(".quiz").append(li)
    })
}

function checkAns(key) {
    const que = ques[index];
    answer.push(key);
    if (que.crt == key) {
        score++;
        makeToast("Right")
    } else {
        makeToast("Wrong")
    }
    index++;
    if (index < ques.length) {
        newQuestion()
    } else {
        showResult()
        clearInterval(times)
    }
}

function showIndex() {
    $(".index").text(1 + index + "/" + ques.length)
}

function showResult() {
    $(".sec3").fadeOut();
    $(".sec4").fadeIn();
    $("#name").text(name);
    $(".name").text(name);
    const scores = Math.round(score / ques.length * 100);
    const grt = scores < 25 ? "Nice" : scores < 50 ? "Good" : scores < 76 ? "Very Good" : "Excellent";
    $("#score").text("Score : " + scores + "%");
    $("#id").text("Test Id : " + Math.ceil(Math.random() * 20000));
    let date = new Date();
    let today = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    $("#date").text(today);
    $(".great").text(grt);
}


function showYourAns() {
    $(".ans-list").html("");
    $(".sc").text(score + "/" + ques.length)
    ques.forEach((que, i) => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const span = document.createElement('span');
        const pp = document.createElement('h5');
        p.textContent = 1 + i + " : " + que.que;
        const chrt = que.crt == answer[i] ? '👉' : '❌';
        span.textContent = chrt + " " + que.option[answer[i]];
        const cls = que.crt == answer[i] ? 'green' : 'red';
        pp.textContent = "Right Answer is : "+ que.option[que.crt];
        span.classList.add(cls);
        li.appendChild(p)
        li.appendChild(span)
        li.appendChild(pp);
        $(".ans-list").append(li);
    })
}

function makeToast(txt) {
    $(".toast").text(txt);
    $(".toast").fadeIn();
    setTimeout(() => $(".toast").fadeOut(), 1000)
}