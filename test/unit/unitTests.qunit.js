/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"stobag_lead_cre/Stobag_Lead_Cre/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});