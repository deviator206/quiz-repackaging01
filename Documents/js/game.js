/**
 * @author deviator206
 */

function GameScreen(a) {
	this.mApplication = a;
	this.mDivName = resource_data.dom['game'];
	this.mGameSplashLoader = null;
	this.mGameAssetLoader = null;
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
		document.getElementById('game_back_btn').addEventListener("click", this.clickHandler.bind(this));
		document.getElementById('game_continue_btn').addEventListener("click", this.clickHandler.bind(this));

	},

	clickHandler : function(evt) {
		trace("GAME Page: CLICKED :" + evt.currentTarget.id);
		switch(evt.currentTarget.id) {
			case 'game_continue_btn':
				this.mApplication.nextScene();
				break;
			case 'game_back_btn':
				break;
		}
	}
}

