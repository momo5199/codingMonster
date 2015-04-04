// view
zog("hi from view.js");

var app = function(app) {
	
	app.makeHorizontalPages = function(layoutManager, gridManager, guideManager, preload) {
		
		zog("pages");

		var i,
			iPadH = 1024,
			pctY = stageH / iPadH;
		
		p = {};

		function makeBackground(color) {
			if (!color) color = "#fbd330";
			var bg = new zim.Rectangle(stageW, stageH, color);	
			bg.setBounds(0,0,stageW,stageH);

			return bg;
		}
		
		// WELCOME PAGE

		p.welcome = new createjs.Container();		
		p.welcome.name = "welcome";	
		p.welcome.setBounds(0,0,stageW,stageH);
		p.welcome.addChild(makeBackground());

		var welcomeImage = new createjs.Bitmap(preload.getResult("welcomeImg"));
		welcomeImage.name = "welcomeImage";
		welcomeImage.regY = welcomeImage.getBounds().height / 2;
		welcomeImage.regX = welcomeImage.getBounds().width / 2;
		welcomeImage.y = 450 * pctY;
		welcomeImage.x = stageW / 2;
		welcomeImage.scaleX = welcomeImage.scaleY = pctY;
		p.welcome.addChild(welcomeImage);

		var introTxt = new createjs.Text("CODING MONSTER GENERATOR", "20px Arial", "#ef5080");
		introTxt.name = "introTxt";
		introTxt.textAlign = "center";
		introTxt.x = stageW / 2;
		introTxt.y = stageH - 200 * pctY;
		p.welcome.addChild(introTxt);

		var btArrow = new createjs.Bitmap(preload.getResult("btArrow"));	
		btArrow.name = "btArrow";
		btArrow.regX = btArrow.getBounds().width / 2;
		btArrow.regY = btArrow.getBounds().height / 2;
		btArrow.x = stageW / 2;
		btArrow.y = stageH - 100 * pctY;
		btArrow.scaleX = btArrow.scaleY = pctY;
		p.welcome.addChild(btArrow);

		var btHotSpot = new zim.Rectangle(btArrow.getBounds().width, btArrow.getBounds().height, "#fbd330");
		btHotSpot.setBounds(0, 0, btArrow.getBounds().width, btArrow.getBounds().height);
		btHotSpot.regX = btArrow.getBounds().width / 2;
		btHotSpot.regY = btArrow.getBounds().height / 2;
		btHotSpot.x = btArrow.x;
		btHotSpot.y = btArrow.y;
		btHotSpot.alpha = .01;
		p.welcome.addChild(btHotSpot);

		// BUILD PAGE
		
		p.build = new createjs.Container();
		p.build.name = "build";
		p.build.setBounds(0,0,stageW,stageH);
		p.build.addChild(makeBackground());

		var btGenerate = new zim.Button(stageW * .8, null, "GENERATE", "grey", "grey", 0, 0, 10, "black", 0 );
		btGenerate.regX = btGenerate.getBounds().width / 2;
		btGenerate.regY = btGenerate.getBounds().height / 2;
		btGenerate.x = stageW / 2;
		btGenerate.y = btGenerate.regY * 2;
		btGenerate.removeAllEventListeners();
		btGenerate.cursor = "auto";
		p.build.addChild(btGenerate);

		var footer = new zim.Rectangle(stageW, 200 * pctY, "#ef5080");
		footer.name = "footer";
		footer.setBounds(0, 0, stageW, 200 * pctY);
		footer.regY = footer.getBounds().height;
		footer.x = 0;
		footer.y = stageH;
		p.build.addChild(footer);

		var footerTxt = new createjs.Text("Drag the script to the part of the monster.", "14px Arial", "white");
		footerTxt.name = "footerTxt";
		footerTxt.textAlign = "center";
		footerTxt.x = stageW / 2;
		footerTxt.y = stageH - footer.getBounds().height + 10;
		p.build.addChild(footerTxt);

		var places = [
			{name: "header", height: 154, image: preload.getResult("headerPlace"), color: "red",   taken: false},
			{name: "body", 	 height: 162, image: preload.getResult("bodyPlace"),   color: "green", taken: false},
			{name: "footer", height: 136, image: preload.getResult("footerPlace"), color: "blue",  taken: false}
		];

		var place, sumH = 0;

		for (i = 0; i < places.length; i++) {
			place = new createjs.Bitmap(places[i].image);
			place.name = places[i].name + "Place";
			place.regX = place.getBounds().width / 2;
			place.regY = place.getBounds().height / 2;
			place.x = stageW / 2;
			place.y = 200 * pctY + sumH + places[i].height / 2;
			place.scaleX = place.scaleY = pctY;
			p.build.addChild(place);
			places[i].obj = place;
			sumH += places[i].height * pctY + 40 * pctY;
		}

		var icons = [
			{name: "HTML", color: "#f7931e"},
			{name: "HTML", color: "#f7931e"},
			{name: "HTML", color: "#f7931e"},
			{name: "CSS", color: "#3fa9f5"},
			{name: "CSS", color: "#3fa9f5"},
			{name: "CSS", color: "#3fa9f5"},
			{name: "JS", color: "#fbd330"},
			{name: "JS", color: "#fbd330"},
			{name: "JS", color: "#fbd330"},
			{name: "PHP", color: "#6b7eba"},
			{name: "PHP", color: "#6b7eba"},
			{name: "PHP", color: "#6b7eba"}
		];

		var icon,
			outerCircle,
			innerCircle,
			iconTxt,
			iconSize = 50 * pctY,
			initX = 0,
			initY = 0,
			placesTaken = 0;

		for (i = 0; i < icons.length; i++) {
			icon = new createjs.Container();
			icon.name = icons[i].name;
			icon.setBounds(0, 0, iconSize, iconSize);
			icon.regX = iconSize / 2;
			icon.regY = iconSize / 2;

			outerCircle = new zim.Circle(iconSize, "white");
			outerCircle.x = iconSize / 2;
			outerCircle.y = iconSize / 2;
			icon.addChild(outerCircle);

			innerCircle = new zim.Circle(iconSize - 4, icons[i].color);
			innerCircle.x = outerCircle.x;
			innerCircle.y = outerCircle.y;
			icon.addChild(innerCircle);

			iconTxt = new createjs.Text(icons[i].name, "20px Arial", "white");
			iconTxt.textAlign = "center";
			iconTxt.textBaseline = "middle";
			iconTxt.x = outerCircle.x;
			iconTxt.y = outerCircle.y;
			icon.addChild(iconTxt);

			icon.x = footer.getBounds().width / 4 * (Math.floor(i/3) + 1) - ((footer.getBounds().width / 4) / 2);
			icon.y = stageH - footer.getBounds().height / 2;
			icon.initX = icon.x;
			icon.initY = icon.y;

			p.build.addChild(icon);

			icon.on("mousedown", function(e){
				initX = e.currentTarget.x;
				initY = e.currentTarget.y;
				p.build.swapChildren(e.currentTarget, p.build.children[p.build.numChildren-1]);
				for (i = 0; i < places.length; i++) {
					if (zim.hitTestBounds(e.currentTarget, places[i].obj)) {
						places[i].taken = null;
						placesTaken--;
						break;
					}
				}
			});

			icon.on("pressmove", function(e){
			    e.currentTarget.x = e.stageX;
			    e.currentTarget.y = e.stageY;
			    stage.update();
			});

			icon.on("pressup", function(e){
				var snap = false;
				for (i = 0; i < places.length; i++) {
					if (zim.hitTestBounds(e.currentTarget, places[i].obj)) {
						if (places[i].taken) {
							createjs.Tween.get(places[i].taken)
								.to({x: places[i].taken.initX, y: places[i].taken.initY}, 500, createjs.Ease.cubicOut);
							placesTaken--;
						}
						e.currentTarget.x = places[i].obj.x;
						e.currentTarget.y = places[i].obj.y;
						places[i].taken = e.currentTarget;
						placesTaken++;
						snap = true;
						updateResultPage(places[i].name, e.currentTarget.name);
						break;
					}
				}
				if (!snap) {
					e.currentTarget.x = e.currentTarget.initX;
					e.currentTarget.y = e.currentTarget.initY;
				}
				stage.update();
				if (placesTaken >= 3) {
					toggleBtGenerate(true);
				} else {
					toggleBtGenerate(false);
				}
			});
		}

		function toggleBtGenerate(activate){
			if (activate) {
				btGenerate.backing.graphics._fill.style = "#00C4A1";
				btGenerate.cursor = "pointer";
				btGenerate.on("click", function(e){
					e.currentTarget.parent.parent.go(p.result, "right");
				});
			} else {
				btGenerate.backing.graphics._fill.style = "grey";
				btGenerate.cursor = "auto";
				btGenerate.removeAllEventListeners();
			}
			stage.update();
		}

		// RESULT PAGE

		p.result = new createjs.Container();
		p.result.name = "result";
		p.result.setBounds(0,0,stageW,stageH);
		p.result.addChild(makeBackground());

		p.result.headerContainer = new createjs.Container();
		p.result.headerContainer.setBounds(0, 0, 527, 421);
		p.result.headerContainer.regX = 527 / 2;
		p.result.headerContainer.regY = 421;
		p.result.headerContainer.x = 582 / 2;
		p.result.headerContainer.y = p.result.headerContainer.regY + 100 * pctY;

		p.result.bodyContainer = new createjs.Container();
		p.result.bodyContainer.setBounds(0, 0, 582, 347);
		p.result.bodyContainer.regX = 582 / 2;
		p.result.bodyContainer.regY = 0;
		p.result.bodyContainer.x = 582 / 2;
		p.result.bodyContainer.y = p.result.headerContainer.y + 20 * pctY;
		
		p.result.footerContainer = new createjs.Container();
		p.result.footerContainer.setBounds(0, 0, 439, 158);
		p.result.footerContainer.regX = 439 / 2;
		p.result.footerContainer.regY = 0;
		p.result.footerContainer.x = 582 / 2;
		p.result.footerContainer.y = p.result.bodyContainer.y + 347 + 20 * pctY;		

		var fullContainer = new createjs.Container();
		fullContainer.addChild(p.result.headerContainer);
		fullContainer.addChild(p.result.bodyContainer);
		fullContainer.addChild(p.result.footerContainer);
		fullContainer.regX = fullContainer.getBounds().width / 2;
		fullContainer.regY = fullContainer.getBounds().height / 2;
		fullContainer.x = stageW / 2;
		fullContainer.y = stageH / 2;
		fullContainer.scaleX = fullContainer.scaleY = pctY - .1;
		p.result.addChild(fullContainer);

		var words = new createjs.Bitmap(preload.getResult("words"));
		words.regX = words.getBounds().width / 2;
		words.regY = 0;
		words.x = stageW / 2;
		words.y = 0;
		words.scaleX = words.scaleY = pctY - .1;
		p.result.addChild(words);

		function capitalizeFirstLetter(string) {
		    return string.charAt(0).toUpperCase() + string.slice(1);
		}

		function updateResultPage(nameContainer, nameImage){
			var container = p.result[nameContainer + "Container"];
			container.removeAllChildren();
			var imageId = nameImage.toLowerCase() + capitalizeFirstLetter(nameContainer);
			var image = new createjs.Bitmap(preload.getResult(imageId));
			container.addChild(image);
			stage.update();
		}
				
		return p;
		
	}

	return app;
	
}(app || {});