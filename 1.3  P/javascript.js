// javascript.js
document.addEventListener('DOMContentLoaded', function () {
  const status = document.getElementById('status');
  const heading = document.getElementById('heading');
  const btn = document.getElementById('changeBtn');
  const texts = ['Text 1','Text 2','Text 3','Text 4','Text 5'];

  function getRandom(min,max){ return Math.floor(Math.random()*(max-min+1)+min); }

  function changeText(){
    const i = getRandom(0,texts.length-1);
    console.log('changeText ran — index', i);
    heading.textContent = texts[i];
    if(status) status.textContent = 'Status: last index ' + i;
  }

  if(btn){
    btn.addEventListener('click', changeText);
    console.log('changeBtn listener attached (external)');
    if(status) status.textContent = 'Status: listener attached (external)';
  } else {
    console.error('changeBtn not found (external)');
    if(status) status.textContent = 'Status: changeBtn not found';
  }
});
