/**
 * @author deviator206@gmail.com
 */

/**
 *Logging the javascript errors
 *  */

function ApplicationWrapper() {
	this.nGameState = 10;
	this.appMode = 0;
	this.mScreenManager = new Array();
	this.appMetaData = {
		levelcounter : 0,
		questioncounter : 1,
		totalquestion : 5,
		totallevel : 1,
		apptimer : 120,
		benchmark : [100, 200, 300]
	};

	this.appSessionData = {
		questioncounter : 1,
		apptimer : 0,
	}

	this.mHTMLTemplate = null;

	//this.jsAnimManager = new jsAnimManager(10);

	this.setValues();
	return this
}

ApplicationWrapper.prototype = {
	setValues : function() {
		this.appMode = resource_data.appMode;
		this.mHTMLTemplate = new HTMLTemplate();
		this.mHTMLTemplate.loadTemplate(resource_data.htmlentity, 'script');

	},
	setUp : function(d) {
		this.mScreenManager = d.screenNames;
		this.showScreen();
	},
	moveTo : function(str) {
		var mTraker = ['start', 'intro', 'home'];
		var mState = [60, 40, 20];

		console.log(arguments);
		if (mTraker.indexOf(str) !== -1)
			this.nGameState = mState[mTraker.indexOf(str)];
		else
			trace(" INVALID GAME STATE " + str);

		this.nextScene();

	},
	/*
	 10 -  Loading
	 20 - Landing
	 40 - Intro
	 60 - Actual Main Screen
	 80 - End Screen
	 * */
	nextScene : function() {

		switch(this.nGameState) {
			case 10:
				this.nGameState = 20;
				this.mCurrentScreen = new LoadingScreen(this);
				break;
			case 20:
				this.nGameState = 40;
				this.mCurrentScreen = new LandingScreen(this);
				break;
			case 40:
				this.nGameState = 60;
				this.mCurrentScreen = new IntroScreen(this);
				break;
			case 60:
				this.nGameState = 80;
				this.mCurrentScreen = new GameScreen(this);
				break;
			case 80:
				this.nGameState = 20;
				this.mCurrentScreen = new EndScreen(this);
				break;

		}
	},
	showScreen : function(c) {
		var a = 0;
		if (c !== undefined) {
			for ( a = 0; a < this.mScreenManager.length; a++) {
				if (c != this.mScreenManager[a]) {
					document.getElementById(this.mScreenManager[a]).style.display = "none"
				} else {
					document.getElementById(this.mScreenManager[a]).style.display = "block"
				}
			}
		} else {
			for ( a = 0; a < this.mScreenManager.length; a++) {
				document.getElementById(this.mScreenManager[a]).style.display = "none"
			}
		}

	},
	renderTemplate : function(id, data) {
		var mH = this.mHTMLTemplate.renderTemplate(id, data)
		if (mH == undefined)
			trace(" INVALID ID FOR TEMPLATING : " + id);

		return (mH !== undefined) ? mH : "";
	}
}

window.onerror = function(msg, url, lineNumber) {
	msg = "msg:" + msg + " URL:" + url + " LineNumber:" + lineNumber;
	if (_gMainApplication !== undefined && _gMainApplication.appMode == 0)
		alert(msg);
	else
		trace(msg);
}
var trace = function(str) {
	if (_gMainApplication !== undefined && _gMainApplication.appMode == 1)
		console.log("#[QUIZ APP LOGS]:" + str);
}
/*
 ApplicationWrapper.prototype.startTheGamePlay = function() {
 if (this.nQuestionIndex < this.arrLevelTotalQuestion[this.nLevelCounter]) {
 this.nQuestionIndex++;
 this.nGameState = 70;
 this.nextTransition()
 } else {
 if (this.nLevelCounter <= this.arrLevelTotalQuestion.length - 1) {
 this.nGameState = 110;
 this.nextTransition()
 } else {
 this.nGameState = 110;
 this.nextTransition()
 }
 }
 };
 ApplicationWrapper.prototype.setGameState = function(a) {
 this.nGameState = a
 };
 ApplicationWrapper.prototype.startGameTimer = function(a) {
 this.arrQuestion = new Array();
 var c = this;
 this.nQuizTimeCntr = 120;
 this.nQuizScore = 0;
 this.nQuestionIndex = Math.floor(Math.random() * config.questionSet.length - 1);
 if (Number(this.nQuestionIndex) > 12) {
 this.nQuestionIndex = 0
 }
 if (Number(this.nQuestionIndex) < 0) {
 this.nQuestionIndex = 0
 }
 this.nQuizTimer = setInterval(function() {
 c.nQuizTimeCntr--;
 if (c.nQuizTimeCntr <= 0) {
 clearInterval(c.nQuizTimer);
 c.nGameState = 130;
 c.nextTransition()
 }
 document.getElementById("timer_txt").innerHTML = "" + c.nQuizTimeCntr;
 document.getElementById("score_txt").innerHTML = "" + c.nQuizScore
 }, 1000)
 };
 ApplicationWrapper.prototype.answerSelected = function(c) {
 var a = config["questionSet" + this.nLevelCounter];
 if (c == a[this.nQuestionIndex].correct_answer) {
 this.nQuizScore = this.nQuizScore + this.nCorrectAnswer;
 this.nGameState = 100;
 this.nextTransition()
 } else {
 this.nGameState = 70;
 this.mCurrentScreen.showQuestionOverlay()
 }
 };
 ApplicationWrapper.prototype.resetVariables = function() {
 this.nQuestionIndex = 0;
 this.nLevelCounter = 1
 };
 ApplicationWrapper.prototype.showSelectedScreen = function(a) {
 document.getElementById(a).style.display = "block"
 };
 ApplicationWrapper.prototype.showScreen = function(c) {
 var a = 0;
 for ( a = 0; a < this.mScreenManager.length; a++) {
 if (c != this.mScreenManager[a]) {
 document.getElementById(this.mScreenManager[a]).style.display = "none"
 } else {
 document.getElementById(this.mScreenManager[a]).style.display = "block"
 }
 }
 };
 ApplicationWrapper.prototype.setUp = function(a) {
 this.mScreenManager = a.screenNames
 };
 var DOMWrapper = null;

 function ApplicationWrapper() {
 this.nGameState = 0;
 this.mScreenManager = new Array();
 this.mCurrentScreen = null;
 this.nLevelCounter = 1;
 this.arrLevelTotalQuestion = new Array(0, 4, 4, 4, 4);
 this.arrLevel_Grey = new Array("level_1_q_1_a", "level_1_q_1_b", "level_1_q_2_a", "level_1_q_2_b", "level_1_q_3_a", "level_1_q_4_a");
 this.nQuestionIndex = 0;
 this.nLevelCounter = 1;
 this.nQuizTimer = 0;
 this.nQuizTimeCntr = 120;
 this.nQuizScore = 0;
 this.nCorrectAnswer = 100;
 this.nWrongAnswer = 0;
 this.nBenchmarkScore = 100;
 this.bcarouselCreated = false;
 this.arrQuestion = null;
 DOMWrapper = this;
 this.imgArray = {};
 this.playBirdAnimation = false;
 this.jsAnimManager = new jsAnimManager(10);
 return this
 }

 */

