/////////////////////////////////////////////////////////////////////////
//     /\
//    /  \       Abstract   : Perfect Dance Program with 621.
//   / /\ \      Author     : Honest Brute. ver1.03(Salvaged from Coral.)
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
const honest = `－－－－
　○　○
○　○
　○　○　＜text
○　○
　○　○
－－－－
`;

// 踊るテンポ。460 => bpm=128くらい
const TEMPO_MS = 460;

const danceBtn = document.getElementById('dance-btn');
const stopBtn = document.getElementById('stop-btn');
const postBtn = document.getElementById('post');
const yourStep = document.getElementById('your_step');
const brute = document.getElementById('brute');
const resultText = document.getElementById('result');

// 踊りの記憶。DOMから読み直したりはしません
let timerId = null;
let stepCount = 0;
let lastResult = null; // { count, danced }

function dance(){
    stop();

    yourStep.textContent = '';
    brute.textContent = '';
    resultText.textContent = '';
    lastResult = null;
    stepCount = 0;

    setDancing(true);

    // 目が回るご友人のために。踊りは省略して結果だけお見せします
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        while(!nextStep()){ /* 休みなく踊ります */ }
        return;
    }

    timerId = setInterval(function(){
        if(nextStep()){
            return;
        }

        // 最下部を見ているご友人だけ、追いかけて差し上げましょう
        if(isNearBottom()){
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, TEMPO_MS);
}

// 一歩踏む。踊り終えたらtrueを返します
function nextStep(){
    yourStep.textContent += step[getRandomInt(0, step.length-1)];
    stepCount++;

    if(yourStep.textContent.endsWith(perfect_step) ||
       stepCount > max_step_count){
        finish(stepCount);
        return true;
    }

    return false;
}

function finish(count){
    const text = createResultText(count);

    showHonest(text);
    lastResult = { count: count, danced: count < max_step_count };

    stop();
}

// 踊るのをやめたご友人にも、踊り疲れたご友人と同じ言葉を
function giveUp(){
    if(timerId !== null){
        showHonest(createResultText(max_step_count));
    }
    stop();
}

function showHonest(text){
    brute.textContent = honest.replace('text', text);
    resultText.textContent = text;
}

function stop(){
    if(timerId !== null){
        clearInterval(timerId);
        timerId = null;
    }
    setDancing(false);
}

function setDancing(dancing){
    danceBtn.disabled = dancing;  // 処理中はボタンを非アクティブにする
    postBtn.disabled = dancing;   // 処理中はボタンを非アクティブにする
    stopBtn.hidden = !dancing;
}

function createResultText(count){
    if(count <= 5){
        // さすがにここまでたどり着く人はいないでしょう
        return "不憫だ…";
    }
    if(count < 50){
        return "たった" + count + "ステップで踊れてしまうなんて。ダンスが得意なのですね！";
    }
    if(count < max_step_count){
        return count + "ステップで踊れるなんて、素敵だ。ご友人！！";
    }
    return "ご友人…踊り疲れたのですね　花はどこだ…手向けなければ…";
}

// ご友人の素晴らしさを太陽系にも広めましょう！！
function share(){
    let text;
    if(lastResult && lastResult.danced){
        text = "私は" + lastResult.count + "ステップでブルートゥと踊れました。";
    }
    else if(!lastResult && stepCount > 0){
        // 途中で踊るのをやめてしまったご友人
        text = "私は" + stepCount + "ステップでブルートゥと踊り疲れてしまいました。";
    }
    else{
        text = "私はブルートゥと踊れませんでした。";
    }
    const url = location.href;

    // Windowsの共有シートはtextを捨ててURLしか渡さないため、
    // ネイティブ共有はタッチ主体の端末に限る
    if(navigator.share && window.matchMedia('(pointer: coarse)').matches){
        navigator.share({ text: text, url: url }).catch(function(){
            // ご友人が共有をお取りやめになりました
        });
        return;
    }

    const intent = 'https://x.com/intent/post?text=' + encodeURIComponent(text) +
                   '&url=' + encodeURIComponent(url);
    window.open(intent, '_blank', 'noopener');
}

function isNearBottom(){
    const scrolled = window.scrollY + window.innerHeight;
    return document.body.scrollHeight - scrolled < 80;
}

function getRandomInt(min, max){
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

danceBtn.addEventListener('click', dance);
stopBtn.addEventListener('click', giveUp);
postBtn.addEventListener('click', share);
