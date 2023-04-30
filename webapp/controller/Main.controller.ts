import MessageBox from "sap/m/MessageBox";
import BaseController from "./BaseController";
import formatter from "../model/formatter";
import JSONModel from "sap/ui/model/json/JSONModel";
import Event from "sap/ui/base/Event";
import UI5Element from "sap/ui/core/Element";

/**
 * @namespace com.sap.apm.uiTsTest.uiTsTest.controller
 */

interface MyElement extends UI5Element {
	setDOMContent?(htmlString: String): any;
}

export default class Main extends BaseController {
	private formatter = formatter;

	private sources: {
		name: String,
		defer: Boolean,
		module: Boolean
	}[] = [{
		name: "runtime-es2015.js",
		defer: false,
		module: true
	  }, {
		name: "runtime-es5.js",
		defer: false,
		module: false
	  },{
		name: "polyfills-es5.js",
		defer: false,
		module: false
	  }, {
		name: "polyfills-es2015.js",
		defer: false,
		module: true
	  }, {
		name: "main-es2015.js",
		defer: false,
		module: true
	  }, {
		name: "main-es5.js",
		defer: false,
		module: false
	}];

	style:String =  "styles.css";

    dir:String =  "/assets/EmbeddedAngular";

	public onInit() : void {
		let receivingJsonModel = new JSONModel();
		sap.ui.getCore().getEventBus().subscribe("UI5Channel", "angularToUi5", function (channel: String, event: String, data: { text:any }) {
			receivingJsonModel.setProperty("/text", data.text);
		});
		this.getView().setModel(receivingJsonModel);
	}

	attachStyle() : void {
		let link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = this.dir + "/" + this.style;
		document.head.appendChild(link);
	}

	attachAngularBootstrapScripts() : Promise<unknown> {
		let that = this;

		Object.defineProperty(window, 'ui5EventBus', {
			value: sap.ui.getCore().getEventBus(),
			writable: false
		  });

		let scriptLoadingPromises = this.sources.map(function (source) {
			return new Promise(function (resolve) {
			let scriptElement = document.createElement("script");
			scriptElement.src = that.dir + "/" + source.name;
			if (source.defer) {
				scriptElement.setAttribute("defer", "");
			}
			if (source.module) {
				scriptElement.type = "module";
				scriptElement.onload = resolve;
			} else {
				scriptElement.setAttribute("nomodule", "");
				resolve(undefined);
			}
			document.head.appendChild(scriptElement);
			});
		});
		return Promise.all(scriptLoadingPromises);
	}

	attachAngularAnker() : void {
		let htmlDiv : MyElement = this.byId("angularDiv");
		htmlDiv.setDOMContent("<div style='height: 100%; width: 100%'><app-root></app-root></div>");
	}
  
	attachZoneScript(): void{
		let scriptElement = document.createElement("script");
		scriptElement.src = "./lib/zone.js";
	}
  
	resetHeight(): void {
		$("#container").css("height", "100%");
		$("#container-uiarea").css("height", "100%");
	}
  
	sendByEventBus() : void {
		sap.ui.getCore().getEventBus().publish("UI5Channel", "ui5ToAngular", {
			text: "Hello Angular"
		});
	}
  
	startAngularApp() : void {
		this.attachAngularAnker();
		this.attachZoneScript();
		this.attachStyle();
		this.attachAngularBootstrapScripts().then(this.resetHeight.bind(this));
	}

	public sayHello() : void {
		MessageBox.show("Hello World!");
	}

}
