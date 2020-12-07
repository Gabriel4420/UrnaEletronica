//variables
let headerTitle = document.querySelector('.d-1-text span');

let occupation = document.querySelector('.d-1-cargo span');

let description = document.querySelector('.d-1-result');

let warning = document.querySelector('.d-2');

let sidebar_right = document.querySelector('.d-1-right');

let numbersInput = document.querySelector('.d-1-numbers');

let stepActual = 0;

let white = false;

let TotalVotes = [];

let numberActually = '';

//functions

function init() {
 document.location.reload(true);
}

function beginStep() {
  let step = steps[stepActual];

  white = false;

  let numberHTML = '';
  numberActually = '';



  for (let i = 0; i < step.numbers; i++) {
    if (i === 0) {
      numberHTML += '<div class="number pisca"></div>';
    } else {
      numberHTML += '<div class="number"></div>';
    }
  }

  headerTitle.style.display = 'none';
  occupation.innerHTML = step.title;
  description.innerHTML = '';
  warning.style.display = 'none';
  sidebar_right.innerHTML = '';
  numbersInput.innerHTML = numberHTML;

}

function updateInterface() {
  let step = steps[stepActual];

  let candidates = step.candidates.filter((item) => {
    if(item.number == numberActually){
     
      return true;
    }else{
      return false;
    }

  })

  if(candidates.length > 0 ){
    candidates = candidates[0];
    headerTitle.style.display = 'block';
    warning.style.display = 'block';
    description.innerHTML = `Nome: ${candidates.name}</br> Partido: ${candidates.partido}`;

    let photosHTML = '';

    for (let i in candidates.photos){
        photosHTML += `<div class="d-1-image"><img src="../src/assets/${candidates.photos[i].url}" alt="${candidates.photos[i].alt}">${candidates.photos[i].alt}</div>`;
    }

    sidebar_right.innerHTML = photosHTML;
  }else{
    headerTitle.style.display = 'block';
    warning.style.display = 'block';
    description.innerHTML = `<div class="big--warning pisca"><strong>VOTO NULO</strong></div>`;
  }
  
}

function clicou(n) {
  let numberPisk = document.querySelector('.number.pisca');
  if (numberPisk !== null) {
    numberPisk.innerHTML = n;
    numberActually = `${numberActually}${n}`;

    numberPisk.classList.remove('pisca');
    if (numberPisk.nextElementSibling !== null) {
      numberPisk.nextElementSibling.classList.add('pisca');
    }else{
      updateInterface();
    }
  }
}

function White() {
  if(numberActually === ''){
    white = true;
    headerTitle.style.display = 'block';
    warning.style.display = 'block';
    numbersInput.innerHTML = ' ';
    description.innerHTML = `<div class="big--warning pisca"><strong>VOTO EM BRANCO</strong></div>`;

  } else {
    alert("NÃO É PERMITIDO A INCLUSÃO DE NUMEROS NO VOTO EM BRANCO, AFINAL DE CONTAS É VOTO EM BRANCO");
    Corrige();
  }
}

function Corrige() {
  beginStep();
}

const Confirm = () => {
  let step = steps[stepActual];

  let confirmedVote = false;

  if(white === true){
    confirmedVote = true;
    alert("Você votou em BRANCO !!!");
    TotalVotes.push({
      step: steps[stepActual].title,
      vote:'white'
    })
  }
  else if(numberActually.length === step.numbers){
    confirmedVote = true;
    alert(`Confirmando voto para ` + numberActually);
      TotalVotes.push({
      step: steps[stepActual].title,
      vote: `${numberActually}`,
    })
  }

  if(confirmedVote){
    stepActual++;
    if(steps[stepActual] !== undefined){
      beginStep();
    }
    else{
      document.querySelector('.tela').innerHTML = '<div class="ExtraBig--warning pisca"><strong>FIM!</strong></div>';
      alert(TotalVotes[0].step + ' ' + TotalVotes[0].vote  + ' ');
      alert(TotalVotes[1].step + ' ' + TotalVotes[1].vote );
      
    }
    
  }
}

beginStep();