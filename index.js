const btn = document.getElementById('btn');
const optcontainer = document.getElementById('optcontainer')
const optarray = Array.from(optcontainer.children)
const scorespan = document.getElementById('score')
const question = document.getElementById('ques')
let data = ''
let score = 0
let i = 0
let flag = false;
let answered = false;


btn.addEventListener('click', function(){
    handleBtnClick();
})


function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
}

async function fetchQuizQues() {
    try{
        const response  = await fetch('quiz.json')
        data = await response.json()
        shuffleArray(data)
    }
    catch(error){
        console.error('Error fetching data :', error)
    }
}
async function handleBtnClick(){
    if(data == '') await fetchQuizQues()
    
    if(i == 5){
        window.location.reload()
    }
    if(i == 4){
        optcontainer.remove()
        scorespan.remove()
        const scorefinal = document.createElement('h3');
        scorefinal.innerHTML = `${score}/4`
        scorefinal.setAttribute('text-align', 'center')
        question.innerText = 'Your Final Score :'
        question.append(scorefinal)
        btn.innerText = 'Play Again'
        i+=1
        return;
    }
    if(flag == false){
        optcontainer.classList.toggle('hide')
        scorespan.classList.toggle('hide')
        
        btn.innerText = 'Next Quiz'

        flag = true
    }
    answered = false
    question.innerText = data[i].question
    shuffleArray(data[i].options)
    optarray.forEach((element, counter) => {
        element.innerText = data[i].options[counter]
        element.classList.remove('optcorrect')
        element.classList.remove('optwrong')
    });    
    i+=1;
}

function handleOption(opt){
    if(answered == true) return;

    if(opt.innerText == data[i-1].answer){
        opt.classList.add('optcorrect')
        answered = true
        score+=1 
        scorespan.innerText = `Score : ${score}/4`
    }
    else{
        console.log('optwrong')
        opt.classList.add('optwrong')
        answered = true
    }

}
