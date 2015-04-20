/*global opaTest *///declare unusual global vars for JSLint/SAPUI5 validation

sap.ui.require(
	[
		"sap/ui/test/Opa5"
	],
	function () {
		"use strict";

		QUnit.module("Desktop not found");

		opaTest("Should see the resource not found page and no selection in the master list when navigating to an invalid hash", function (Given, When, Then) {
			//Arrangement
			Given.iStartTheApp();

			//Actions
			When.onTheMasterPage.iWaitUntilTheListIsLoaded();
			When.onTheBrowserPage.iChangeTheHashToSomethingInvalid();

			// Assertions
			Then.onTheNotFoundPage.iShouldSeeTheNotFoundPage().
				and.theNotFoundPageShouldSayResourceNotFound();
			Then.onTheMasterPage.theListShouldHaveNoSelection().
				and.iTeardownMyAppFrame();
		});

		function opaTestFactory (sTestName, sHash , fnTest) {
			opaTest("Desktop: " + sTestName, function (Given, When, Then) {
				Given.iStartTheApp(sHash);
				fnTest.call(this, Given, When, Then);
				Then.iTeardownMyAppFrame();
			});
		}

		opaTestFactory("Should see the not found page if the hash is something that matches no route", "#somethingThatDoesNotExist", function (Given, When, Then) {
			//Actions
			When.onTheNotFoundPage.iLookAtTheScreen();

			// Assertions
			Then.onTheNotFoundPage.iShouldSeeTheNotFoundPage().
				and.theNotFoundPageShouldSayResourceNotFound();
		});

		opaTestFactory("Should see the not found master and detail page if an invalid object id has been called", "#/object/SomeInvalidObjectId", function (Given, When, Then) {
			//Actions
			When.onTheNotFoundPage.iLookAtTheScreen();

			// Assertions
			Then.onTheNotFoundPage.iShouldSeeTheObjectNotFoundPage().
				and.theNotFoundPageShouldSayObjectNotFound();
		});

		opaTestFactory("Should see the not found text for no search results", "", function (Given, When, Then) {
			//Actions
			When.onTheMasterPage.iLookAtTheScreen();

			// Assertions
			Then.onTheMasterPage.iShouldSeeTheList();

			//Actions
			When.onTheMasterPage.iSearchForSomethingWithNoResults();

			// Assertions
			Then.onTheMasterPage.iShouldSeeTheNoDataTextForNoSearchResults();
		});
	});
