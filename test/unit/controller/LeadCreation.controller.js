/*global QUnit*/

sap.ui.define([
	"stobag_lead_cre/Stobag_Lead_Cre/controller/LeadCreation.controller"
], function (Controller) {
	"use strict";

	QUnit.module("LeadCreation Controller");

	QUnit.test("I should test the LeadCreation controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});