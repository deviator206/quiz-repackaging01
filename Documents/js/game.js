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
		});
		document.getElementById(this.mDivName).innerHTML = sHTML;
		trace(" GAME Page..");

		//addEventListener
		document.getElementById('dummy_end').addEventListener("click", this.clickHandler.bind(this));

	},

	clickHandler : function(evt) {
		trace("GAME Page: CLICKED :" + evt.currentTarget.id);
		switch(evt.currentTarget.id) {
			case 'dummy_end':
				this.mApplication.nextScene();
				break;
		}
	}
}

