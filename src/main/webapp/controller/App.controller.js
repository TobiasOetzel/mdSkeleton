sap.ui.define([
	"sap/ui/demo/mdtemplate/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.mdtemplate.controller.App", {

		onInit : function () {

			this.oComponent = this.getOwnerComponent();
			// attaches to the onInit event that gets called by the component after it is
			// initialized.
			// this is used to handle all things that have dependencies on component assets
			this.oComponent.attachEvent(this.oComponent.M_EVENTS.OnInit, function () {
				this._handleHideMaster();
			}, this);

			// apply compact mode if touch is not supported; this could me made configurable on "combi" devices with touch AND mouse
			if (!sap.ui.Device.support.touch) {
				this.getView().addStyleClass("sapUiSizeCompact");
			}
		},

		_handleHideMaster : function () {
			var oListSelector = this.oComponent.oListSelector;

			oListSelector.attachEvent("listSelectionChanged", function () {
				this.byId("idAppControl").hideMaster();
			}, this);
		}
	});

}, /* bExport= */ true);
