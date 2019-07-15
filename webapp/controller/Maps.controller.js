sap.ui.define([
		"stobag_lead_cre/Stobag_Lead_Cre/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (BaseController,Filter, FilterOperator, History, MessageToast, JSONModel ) {
	"use strict";

	return BaseController.extend("stobag_lead_cre.Stobag_Lead_Cre.controller.Maps", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf LeadManagement.LeadManagementApp.view.V_Detail
		 */	
	       
        searchResults : function(results, status) {
        var that = this;
        this.destroyItems();
        this.locations = [];

        this.locations = jQuery.map(results, function(item) {
            var location = {};
            location.value = item.formatted_address;
            location.lat = item.geometry.location.lat();
            location.lng = item.geometry.location.lng();
            return location;
        });

        this.locations.forEach(function(item) {
            that.addItem(new sap.ui.core.ListItem({
                text: item.value,
            }));
        });
    },
		 
		 
		 	GoToResult: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Tell the Router to Navigate To Target_result
			oRouter.navTo("TargetLeadCreation", {});

		},
		
		onSearch: function(oEvent){
			
			 var util = openui5.googlemaps.MapUtils;
			var para = oEvent;
			
			 var sValue = oEvent.getParameter("newValue");
        if (sValue.length > 3) {
            util.search({
                'address': sValue
            }).done(jQuery.proxy(this.searchResults, this));
        }
        
     
        
		},
		
	
		 
		onInit: function () {
		
		
			 var util = openui5.googlemaps.MapUtils;
		
		
        
       
    
			 
var dataModel = this.getOwnerComponent().getModel("tableData");
			this.getView().setModel(dataModel, "Beers");

			
			var oModel = new JSONModel();
			this.getView().setModel(oModel, "mongo");
		
			this.refresh()

		},

		
		refresh: function () {

			var oModel = this.getView().getModel("mongo");
			oModel.loadData("https://lovely-joshua-tree-24687.herokuapp.com/products");
			this.getView().byId("addProduct").setValue("");
			
			
			/*
			var oModel = new sap.ui.model.odata.v2.ODataModel("https://my343873.crm.ondemand.com/sap/c4c/odata/v1/c4codataapi/");
			debugger;
			*/
			
		},
		addProduct(){
			var sName = this.getView().byId("addProduct").getValue();
			var oData = {name: sName};
			jQuery.ajax({
				url: "https://nemoproject.herokuapp.com/products",
				dataType: "json",
				data: oData,
				type: "post",
				success: jQuery.proxy(function(oData){
					this.refresh();
				},this)
			});
		},
		
		/*--------------------------------------
		 * Event Handling
		 * ---------------------------------------*/

		
		// onNavBack: function (oEvent) {
		// 	// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 	window.history.go(-1);
		// 	// 	oRouter.navTo("appHome");

			
		// },
		
		
		
		

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf LeadManagement.LeadManagementApp.view.V_Detail
		 */
			onBeforeRendering: function() {
		var oViewTest = this.getView();
			},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf LeadManagement.LeadManagementApp.view.V_Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf LeadManagement.LeadManagementApp.view.V_Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});