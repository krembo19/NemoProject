//@ui5-bundle sap/ui/integration/library-h2-preload.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/ui/integration/library',["sap/ui/base/DataType","sap/ui/Global","sap/ui/core/library","sap/f/library"],function(D){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.integration",version:"1.67.1",dependencies:["sap.ui.core","sap.f"],types:["sap.ui.integration.CardActionType","sap.ui.integration.CardDataMode"],controls:["sap.ui.integration.widgets.Card","sap.ui.integration.host.HostConfiguration"],elements:[],noLibraryCSS:true,customTags:{"card":"sap/ui/integration/widgets/Card","host-configuration":"sap/ui/integration/host/HostConfiguration"},defaultTagPrefix:"ui"});var t=sap.ui.integration;t.CardActionType={Navigation:"Navigation"};t.CardDataMode={Active:"Active",Inactive:"Inactive"};return t;});
sap.ui.require.preload({
	"sap/ui/integration/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.ui.integration","type":"library","embeds":[],"applicationVersion":{"version":"1.67.1"},"title":"SAPUI5 library with integration-related controls.","description":"SAPUI5 library with integration-related controls.","ach":"CA-UI5-CTR","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":[]},"sap.ui5":{"dependencies":{"minUI5Version":"1.67","libs":{"sap.ui.core":{"minVersion":"1.67.1"},"sap.f":{"minVersion":"1.67.1"}}},"library":{"i18n":"messagebundle.properties","css":false,"content":{"controls":["sap.ui.integration.widgets.Card","sap.ui.integration.host.HostConfiguration"],"elements":[],"types":["sap.ui.integration.CardActionType","sap.ui.integration.CardDataMode"]}}}}'
},"sap/ui/integration/library-h2-preload"
);
sap.ui.loader.config({depCacheUI5:{
"sap/ui/integration/host/HostConfiguration.js":["sap/ui/core/Control.js","sap/ui/integration/host/HostConfigurationCompiler.js"],
"sap/ui/integration/host/HostConfigurationCompiler.js":["sap/base/Log.js","sap/ui/thirdparty/less.js"],
"sap/ui/integration/library.js":["sap/f/library.js","sap/ui/Global.js","sap/ui/base/DataType.js","sap/ui/core/library.js"],
"sap/ui/integration/services/Data.js":["sap/ui/integration/services/Service.js"],
"sap/ui/integration/services/Navigation.js":["sap/ui/integration/services/Service.js"],
"sap/ui/integration/util/CardManifest.js":["sap/base/Log.js","sap/ui/base/Object.js","sap/ui/core/Manifest.js"],
"sap/ui/integration/util/CustomElements.js":["sap/base/Log.js"],
"sap/ui/integration/util/ServiceManager.js":["sap/base/Log.js","sap/ui/base/EventProvider.js"],
"sap/ui/integration/widgets/Card.js":["sap/base/Log.js","sap/f/CardRenderer.js","sap/f/cards/BaseContent.js","sap/f/cards/DataProviderFactory.js","sap/f/cards/Header.js","sap/f/cards/NumericHeader.js","sap/f/library.js","sap/m/HBox.js","sap/m/Text.js","sap/m/VBox.js","sap/ui/core/Control.js","sap/ui/core/Core.js","sap/ui/core/Icon.js","sap/ui/integration/library.js","sap/ui/integration/util/CardManifest.js","sap/ui/integration/util/ServiceManager.js","sap/ui/model/json/JSONModel.js","sap/ui/model/resource/ResourceModel.js","sap/ui/thirdparty/jquery.js"]
}});
//# sourceMappingURL=library-h2-preload.js.map