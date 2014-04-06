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

		var arrT = this.mApplication.getFinalScreenMsg(), resourceKey, sHTML = this.mApplication.renderTemplate('end_screen_ui', {
			thot_bubble_end_screen : resource_data.getPath("thot_bubble_end_screen"),
			main_ending_msg : arrT[0],
			n_second : arrT[1],
			n_star : arrT[2]
		});
		document.getElementById(this.mDivName).innerHTML = sHTML;
		trace(" END Page..");

		//addEventListener
		//document.getElementById('intro_btn_continue').addEventListener("click", this.clickHandler.bind(this));

		this.mApplication.addEventHandler('end_screen_back', 'click', this.clickHandler.bind(this));
		this.mApplication.addEventHandler('facebook', 'click', this.clickHandler.bind(this));
		this.mApplication.addEventHandler('twitter', 'click', this.clickHandler.bind(this));
		this.mApplication.addEventHandler('linkedin', 'click', this.clickHandler.bind(this));

	},
	clickHandler : function(evt) {
		var url ="";
		switch(evt.currentTarget.id) {
			case 'facebook':
				url = "http://www.facebook.com/sharer.php?u=http://appstore.com&amp;t=Testing";
				window.open(url,"_blank");
				break;
			case 'twitter':
				url = "http://twitter.com/home?status=Testing";
				window.open(url,"_blank");
				break;
			case 'linkedin':
				//https://developer.linkedin.com/documents/share-linkedin
				url = 'http://www.linkedin.com/shareArticle?mini=true&url=http%3A//google.com&title=testing the simple share&summary=any test&source=juggernaut-studios.com';
				window.open(url,"_blank");

				break;
			default :
				this.mApplication.moveTo('home');
				break;
		}

	},
	onWrapperPush : function(cmd, data) {

	}
}

