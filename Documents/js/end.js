/**
 * @author deviator206
 */

function EndScreen(a) {
	this.mApplication = a;
	this.mDivName = resource_data.dom['end'];
	this.mGameSplashLoader = null;
	this.mGameAssetLoader = null;
	this.setUp()
}

EndScreen.prototype = {
	setUp : function() {
		this.mApplication.showScreen(this.mDivName);

		var resourceKey, sHTML = this.mApplication.renderTemplate('end_screen_ui', {
		});
		document.getElementById(this.mDivName).innerHTML = sHTML;
		trace(" END Page..");

		//addEventListener
		//document.getElementById('intro_btn_continue').addEventListener("click", this.clickHandler.bind(this));

	},

	clickHandler : function(evt) {
		trace("END Page: CLICKED :" + evt.currentTarget.id);
		switch(evt.currentTarget.id) {
			case 'intro_btn_continue':
				this.mApplication.nextScene();
				break;
		}
	}
}

