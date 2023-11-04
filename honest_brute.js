/////////////////////////////////////////////////////////////////////////
//     /\
//    /  \       Abstract   : Perfect Dance Program with 621.
//   / /\ \      Author     : Honest Brute. ver1.02(Salvaged from Coral.)
//  / /A.\ \     Created at : ████/11/3
// / / L. \ \    Copyright  : Kate Markson All Mind Reserved. 
///_/ _M._ \_\
/////////////////////////////////////////////////////////////////////////

// 完璧なランダムです
const step = [
    '素敵なステップです！',
    'ご友人!',
    'ジェネレーターの甘美な調べ、',
    'ミルクトゥースも悦んでいます。',
    'スロー、',
    'スロー、',
    'スロー、',
    'スロー、',
    'スロー、',
    'クイック、',
    'クイック、',
    'クイック、',
    'クイック、',
    'クイック、'
];

// 完璧なステップです
const perfect_step = "スロー、スロー、クイック、クイック、スロー、";

// 踊れない素材はプログラムには不要です
const max_step_count = 1000;

// Todo:もっとかっこよくなりませんか？
const honest = '\
－－－－<br>\
　○　○<br>\
○　○　<br>\
　○　○　＜text<br>\
○　○　<br>\
　○　○<br>\
－－－－<br>\
<br>\
';

function dance(){
    var your_step = document.getElementById('your_step');
    your_step.textContent = '';

    var brute = document.getElementById('brute');
    brute.textContent = '';

    var exe_btn = document.getElementById('621');
    exe_btn.disabled = true;  // 処理中はボタンを非アクティブにする

    var post_btn = document.getElementById('post');
    post_btn.disabled = true; // 処理中はボタンを非アクティブにする

    var step_counter = 0;

    var pop = setInterval(function(){
        your_step.textContent += step[getRandomInt(0, step.length-1)];
        step_counter++;
        if(your_step.textContent.endsWith(perfect_step) ||
           step_counter > max_step_count){
            clearInterval(pop);
            brute.innerHTML = createHonest(step_counter);
            exe_btn.disabled = false;
            post_btn.disabled = false;
        }

        // 最下部にスクロールする
        document.documentElement.scrollTop = document.body.scrollHeight;
    }, 460); // 460 => bpm=128くらい
}

function createHonest(count){
    var text = "";

    if(count <= 5){
        // さすがにここまでたどり着く人はいないでしょう
        text = "Todo:"
    }
    else if(count < 50){
        text = "たった" + count + "ステップで踊れてしまうなんて。ダンスが得意なのですね！";
    }
    else if(count < max_step_count){
        text = count + "ステップで踊れるなんて、素敵だ。ご友人！！";
    }
    else{
        text = "ご友人…、踊り疲れてしまったのですね。花はどこだ…。手向けなければ…！！"
    }

    var honest_brute = honest.replace('text', text);

    return honest_brute;
}

// ご友人の素晴らしさを太陽系にも広めましょう！！
function post(){
    var count = document.getElementById('brute').textContent.match(/[0-9]+ステップ/);
    var text = "私は" + count + "でブルートゥと踊れました。";
    if(count == null){
        text = "私はブルートゥと踊れませんでした。";
    }
    text += " https://salty-7.github.io/ssqqs/index.html"
    window.location.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
}

function getRandomInt(min, max){
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

document.getElementById('621').addEventListener('click', dance);