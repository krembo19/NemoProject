sap.ui.define([
		"stobag_lead_cre/Stobag_Lead_Cre/controller/BaseController"

], function (BaseController) {
	"use strict";

	return BaseController.extend("stobag_lead_cre.Stobag_Lead_Cre.controller.LeadCreation", {

		/*this.getModel().metadataloaded().then(function () {
	
		var sPath = "/CorporateAccountCollection?$filter=AccountID eq '10005775'";

	var oView = this.getView();

	oView.bindElement({

	path: sPath


	});

});*/

		onInit: function () {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("TargetLeadCreation").attachPatternMatched(this._onRouteMatched, this);
			//var oModel = this.getView().getModel();
		//	oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		_onRouteMatched: function () {

			//here goes your logic which will be executed when the "add" route is hit
			// register for metadata loaded events
			var oModel = this.getView().getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},

		_onMetadataLoaded: function () {
			var oProperties = {
				IndividualCustomerFamilyName: "",
				IndividualCustomerGivenName: "",
				IndividualCustomerAddressStreetName: "",
				IndividualCustomerAddressHouseID: "",
				IndividualCustomerAddressPostalCode: "",
				IndividualCustomerAddressCity: "",
				IndividualCustomerAddressCountry: "",
				IndividualCustomerEMail: "",
				IndividualCustomerPhone: "",
				Note: "",

				Name: "",
				OriginTypeCode: "",

				//	LeadItem: []

				// restlichen Felder
			};

			var expandProperties = {
				LeadID: "",
				ID: "",
				ProductCategoryInternalID: ""
			};

			//	var leadItem = {
			//		ProductCategoryInternalID: "Z3000"
			//	};
			//	
			//	oProperties.LeadItem.push(leadItem);

			this._oContext = this.getView().getModel().createEntry("/LeadCollection", {
				properties: oProperties
			});

			//	this._oContextCheckbox = this.getView().getModel().createEntry("/LeadItemCollection", {
			//		properties: expandProperties
			//	});

			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
			//	this.getView().byId("smartForm").setBindingContext(this._oContextCheckbox);
		},

		saveData: function (oEvent) {
			var sPath = this._oContext.getPath();
			//	var sPathCheckbox = this._oContextCheckbox.getPath();
			var oModel = this.getView().getModel();

			var sLastName = this.byId("lastNameInput").getValue();
			var sFirstName = this.byId("firstNameInput").getValue();
			var sStreet = this.byId("streetInput").getValue();
			var sHouseNumber = this.byId("houseNumberInput").getValue();
			var sPostalCode = this.byId("postalCodeInput").getValue();
			var sCity = this.byId("cityInput").getValue();
			var sCountry = this.byId("countryInput").getValue();
			var sEmail = this.byId("mailInput").getValue();
			var sPhone = this.byId("phoneInput").getValue();
			var sNote = this.byId("note1").getValue();

			//statische Wertübergabe
			var sSource = "004";
			var Name = "Fachpartnerportal - " + sFirstName + "," + sLastName;

			var oProperties = {
				IndividualCustomerFamilyName: sLastName,
				IndividualCustomerGivenName: sFirstName,
				IndividualCustomerAddressStreetName: sStreet,
				IndividualCustomerAddressHouseID: sHouseNumber,
				IndividualCustomerAddressPostalCode: sPostalCode,
				IndividualCustomerAddressCity: sCity,
				IndividualCustomerAddressCountry: sCountry,
				IndividualCustomerEMail: sEmail,
				IndividualCustomerPhone: sPhone,
				Note: sNote,

				Name: Name,
				OriginTypeCode: sSource

			};

			// restlichen Inputfelder Values
			oModel.setProperty(sPath + "/IndividualCustomerFamilyName", sLastName);
			oModel.setProperty(sPath + "/IndividualCustomerGivenName", sFirstName);
			oModel.setProperty(sPath + "/IndividualCustomerAddressStreetName", sStreet);
			oModel.setProperty(sPath + "/IndividualCustomerAddressHouseID", sHouseNumber);
			oModel.setProperty(sPath + "/IndividualCustomerAddressPostalCode", sPostalCode);
			oModel.setProperty(sPath + "/IndividualCustomerAddressCity", sCity);
			oModel.setProperty(sPath + "/IndividualCustomerAddressCountry", sCountry);
			oModel.setProperty(sPath + "/IndividualCustomerEMail", sEmail);
			oModel.setProperty(sPath + "/IndividualCustomerPhone", sPhone);
			oModel.setProperty(sPath + "/Note", sNote);

			oModel.setProperty(sPath + "/Name", Name);
			oModel.setProperty(sPath + "/OriginTypeCode", sSource);

			//	oModel.submitChanges();
			var vProductCategory;
			var checkBoxBauzaun = this.byId("bauzaunCheckbox").getSelected();
			var checkBoxBalkenp = this.byId("balkenPlaCheckbox").getSelected();
			if (checkBoxBauzaun == true)
				vProductCategory = "Z3000";
				if(checkBoxBalkenp == true)
					vProductCategory = "Z4000";
			
			oModel.create("/LeadCollection", oProperties, {
				success: function (oData, oResponse) {
					var oDataId = oData.ObjectID;
					var oPropertiesLeadItem = {
					//	LeadID: oDataId,
						ParentObjectID: oDataId,
					//	ID: "30",
						ProductCategoryInternalID: vProductCategory
					};
					oModel.create("/LeadItemCollection", oPropertiesLeadItem);
				}
			});

		}
	});
});