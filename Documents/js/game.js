/**
 * @author deviator206
 */

function GameScreen(a) {
	this.mApplication = a;
	this.mDivName = resource_data.dom['game'];
	this.mGameSplashLoader = null;
	this.mGameAssetLoader = null;
	this.mCurrentQuesitonData = {};
	this.setUp()
}

GameScreen.prototype = {
	setUp : function() {
		this.mApplication.showScreen(this.mDivName);

		var resourceKey, sHTML = this.mApplication.renderTemplate('game_screen_ui', {
			side_static_content : resource_data.getPath("side_static_content")
		});
		document.getElementById(this.mDivName).innerHTML = sHTML;

		trace(" GAME Page..");

		document.getElementById('game_back_btn').style.backgroundImage = "url('" + resource_data.getPath("game_back_btn") + "')";
		document.getElementById('game_continue_btn').style.backgroundImage = "url('" + resource_data.getPath("intro_continue_btn") + "')";
		//addEventListener
		//document.getElementById('game_back_btn').addEventListener("click", this.clickHandler.bind(this));
		//document.getElementById('game_continue_btn').addEventListener("click", this.clickHandler.bind(this));
		this.mApplication.addEventHandler('game_continue_btn', 'click', this.clickHandler.bind(this));
		this.mApplication.addEventHandler('game_back_btn', 'click', this.clickHandler.bind(this));

		this.displayQuestionsTopPanel();
		this.displayQuestion()
		this.addEventListener()

	},
	displayQuestionsTopPanel : function() {
		//deviat_pgNukmbers
		$(".deviat_pgNukmbers").empty();
		var indx = 1, total = this.mApplication.appMetaData['totalquestion'], sHTML = "";

		for ( indx = 0; indx <= total; indx++) {
			sHTML += this.mApplication.renderTemplate('top_question_game_screen_ui', {
				value : indx+1,
				questionnumber : indx
			});
		}
		
		$(".deviat_pgNukmbers").html(sHTML);
	},
	addEventListener : function() {
		var index;
		for ( index = 1; index < 5; index++)
			this.mApplication.addEventHandler('option' + index, 'click', this.clickHandler.bind(this));
	},
	displayQuestion : function() {
		var mCheck = this.mApplication.checkCounter();

		switch(mCheck) {

			case 0:
				var index = 1, m = this.mApplication.appSessionData['questioncounter'], set = this.mApplication.appSessionData['questionSet'];
				this.mCurrentQuesitonData = question_data["questionSet"+set][m];

				document.getElementById('questionContent').innerHTML = this.mCurrentQuesitonData.question;
				$(".deviat_ansTxt").css("color", '#FFF')
				for ( index = 1; index < 5; index++)
					document.getElementById('option' + index).innerHTML = this.mCurrentQuesitonData['option_' + index];

				var mTemp = this.mApplication.isAnswered();
				if (mTemp[0] !== -1) {
					trace("ANSWERED ::" + mTemp[1])
					$("div #option" + mTemp[1]).css("color", '#FDDF05');
				}
				
				$(".question_top_panel").css("border", '#FDDF05 solid 2px');
				$("#q_" + m).css("border", '#2E529C solid 2px');
				
				break;
			case -1:
				//
				trace(" HAS CROSSED 1ST ELEMENT NOW BACK TO LANDING PAGE");
				this.mApplication.moveTo('home');

				break;
			case 1:
				trace(" HAS CROSSED LAST ELEMENT NOW  TO FInAL PAGE");
				this.mApplication.moveTo('end');

				break;

		}

	},

	clickHandler : function(evt) {
		trace("GAME Page: CLICKED :" + evt.currentTarget.id);
		switch(evt.currentTarget.id) {
			case 'game_continue_btn':
				this.mApplication.nextScene();
				break;
			case 'game_back_btn':
				this.mApplication.manipulateQuestionCounter(-1)
				this.displayQuestion();
				break;
			default:
				var m = String(evt.currentTarget.id).substr(6, String(evt.currentTarget.id).length);
				this.mApplication.setAnsweredQuestion(m);
				this.mApplication.manipulateQuestionCounter(1)
				this.displayQuestion();
				break;

		}
		return false;
	}
}

