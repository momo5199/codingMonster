var app = new function(app){

	app.makeHotspots = function(assets,pages){

		console.log("hotSpots");

		var hs = new zim.HotSpots([
			{
				page: assets.welcome,
				rect: assets.welcome.children[4],
				call: function(){
					pages.go(assets.build, "right");
				}
			}
		]);
	}

	return app;
}(app || {});