function onStartGame(){
	
	document.getElementById('home_page').style.display='none';
	document.getElementById('landing-page').style.display='block';
	
}
function onIntroduction(){
	alert('onIntroduction');
}
function onContinue(){
	document.getElementById('home_page').style.display='none';
	document.getElementById('landing-page').style.display='none';
	document.getElementById('quiz-page').style.display='block';
}
function onAnswerSubmit(){
	document.getElementById('home_page').style.display='none';
	document.getElementById('landing-page').style.display='none';
	document.getElementById('quiz-page').style.display='none';
	document.getElementById('answer-page').style.display='block';
}
function onAnswerContinue(){
	document.getElementById('home_page').style.display='none';
	document.getElementById('landing-page').style.display='none';
	document.getElementById('quiz-page').style.display='none';
	document.getElementById('answer-page').style.display='none';
	document.getElementById('congrats-page').style.display='block';
}