sap.ui.define(['sap/ui/test/Opa5'],
	function(Opa5) {
		"use strict";

		return Opa5.extend("sap.ui.demo.mdskeleton.test.opa.action.NavigationAction", {
			iPressOnTheObject1: function () {
				var oObject1Item = null;

				return this.waitFor({
					id: "list",
					viewName: "Master",
					check: function (oList) {
						return oList.getItems().some(function (oItem) {
							if (oItem.getTitle() === "Object 1") {
								oObject1Item = oItem;
								return true;
							}

							return false;
						});
					},
					success: function (oList) {
						oObject1Item.$().trigger("tap");
						ok(oList, "Pressed the Object 1 item");
					},
					errorMessage: "the list did not contain Object 1"
				});
			},

			iChangeTheHashToObject3: function () {
				return this.waitFor({
					success: function () {
						Opa5.getWindow().location.hash = "#/Objects/ObjectID_3";
					}
				});
			},

			iLookAtTheScreen: function () {
				return this;
			}
		});
	});