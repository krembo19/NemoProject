/*!
* OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(function(){"use strict";var M={};M.MESSAGES={TYPE_NOT_SUPPORTED:"Value 'sap.ui.core.MessageType.None' for property 'type' is not supported."+"Defaulting to 'sap.ui.core.MessageType.Information'"};M.CLASSES={ROOT:"sapMMsgStrip",ICON:"sapMMsgStripIcon",MESSAGE:"sapMMsgStripMessage",CLOSE_BUTTON:"sapMMsgStripCloseButton",CLOSING_TRANSITION:"sapMMsgStripClosing"};M.ATTRIBUTES={CLOSABLE:"data-sap-ui-ms-closable"};M.RESOURCE_BUNDLE=sap.ui.getCore().getLibraryResourceBundle("sap.m");M.getIconURI=function(){var t=this.getType(),c=this.getCustomIcon(),i="sap-icon://message-"+t.toLowerCase();return c||i;};M.getAriaTypeText=function(){var b="MESSAGE_STRIP_"+this.getType().toUpperCase(),a=M.RESOURCE_BUNDLE.getText(b);if(this.getShowCloseButton()){a+=" "+M.RESOURCE_BUNDLE.getText("MESSAGE_STRIP_CLOSABLE");}return a;};M.handleMSCloseButtonInteraction=function(e){if(M.isMSCloseButtonPressed(e.target)){this.close();}};M.isMSCloseButtonPressed=function(t){return t.className.indexOf(M.CLASSES.CLOSE_BUTTON)!==-1||t.parentNode.className.indexOf(M.CLASSES.CLOSE_BUTTON)!==-1;};M.closeTransitionWithCSS=function(c){this.$().addClass(M.CLASSES.CLOSING_TRANSITION).one("webkitTransitionEnd transitionend",c);};M.getAccessibilityState=function(){return{role:"alert",live:"assertive",labelledby:this.getId()};};return M;});
