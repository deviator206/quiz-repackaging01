/**
 * @author deviator206
 */

function LandingScreen(a) {
	this.mApplication = a;
	this.mDivName = resource_data.dom['landing'];
	this.mGameSplashLoader = null;
	this.mGameAssetLoader = null;
	this.setUp()
}

LandingScreen.prototype = {
	setUp : function() {
		this.mApplication.showScreen(this.mDivName);

		var resourceKey, sHTML = this.mApplication.renderTemplate('landing_screen_ui', {
		});
		document.getElementById(this.mDivName).innerHTML = sHTML;
		trace(" Landing Page..");

		//addEventListener
		//landing_btn_start
		//landing_btn_intro

		document.getElementById('landing_btn_start').addEventListener("click", this.clickHandler.bind(this));
		document.getElementById('landing_btn_intro').addEventListener("click", this.clickHandler.bind(this));

	},

	clickHandler : function(evt) {
		trace("Landing Page: CLICKED :" + evt.currentTarget.id);
		switch(evt.currentTarget.id) {
			case 'landing_btn_start':
				this.mApplication.moveTo('start');
				break;
			case'landing_btn_intro':
				this.mApplication.moveTo('intro');
				break;
		}
	}
}

