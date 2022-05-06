const container = document.getElementById('container');
let counter = 0, score = 0, data = [], done = false;
fetch("https://kadamyash.github.io/probablyquiz/data/data.json")
.then(response => {
   return response.json();
})
.then(jsondata => render(data = jsondata));
console.log("json"+data);
function render(jsondata){
    document.getElementById('question').innerHTML = jsondata[counter].question;
    let options = jsondata[counter].choices;
    options = options.sort(()=>Math.random() - 0.5);
    document.getElementById('ch_a').innerHTML = options[0].name;
    document.getElementById('ch_a').setAttribute('valid', options[0].valid);
    document.getElementById('ch_b').innerHTML = options[1].name;
    document.getElementById('ch_b').setAttribute('valid', options[1].valid);
    document.getElementById('ch_c').innerHTML = options[2].name;
    document.getElementById('ch_c').setAttribute('valid', options[2].valid);
    document.getElementById('ch_d').innerHTML = options[3].name;
    document.getElementById('ch_d').setAttribute('valid', options[3].valid);
    document.getElementById('score').innerHTML = score;
    document.getElementById('progress').style.width = ((counter+1)*100/data.length)+"%";
}

function lockIn(id){
    let selection = document.getElementById(id);
    if(selection.getAttribute('valid')=='true'){
        displayModal(true);
    }
    else{
        displayModal(false);
    }
}

function displayModal(result){
    const modalStatement = document.getElementById('modal-statement');
    if(result){
        modalStatement.innerHTML = "Congratulations! That's the right answer";
        modalStatement.style.color = "green";
        score = (score<data.length*10?score+10:score);
    }
    else{
        modalStatement.innerHTML = "Sorry, that's the wrong answer";
        modalStatement.style.color = "red";
    }
    counter = (counter<data.length-1?counter=counter+1:(counter==data.length-1?(done=true, counter):counter));
    document.getElementById('progress').style.backgroundColor = (done?'green':null)
    render(data);
    document.getElementById('modal').classList.toggle('hidden');
}

function hideModal(){
    document.getElementById('modal').classList.toggle('hidden');
}
