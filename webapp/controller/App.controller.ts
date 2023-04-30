import BaseController from "./BaseController";

/**
 * @namespace com.sap.apm.uiTsTest.uiTsTest.controller
 */
export default class App extends BaseController {

	public onInit() : void {
		// apply content density mode to root view
		this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
	}

}
