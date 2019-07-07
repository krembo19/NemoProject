/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/ManagedObject','./Control','./Component','./Core','./library',"./ComponentContainerRenderer","sap/base/Log"],function(M,C,a,b,l,c,L){"use strict";var d=l.ComponentLifecycle;var e=C.extend("sap.ui.core.ComponentContainer",{metadata:{library:"sap.ui.core",properties:{name:{type:"string",defaultValue:null},url:{type:"sap.ui.core.URI",defaultValue:null},async:{type:"boolean",defaultValue:false},handleValidation:{type:"boolean",defaultValue:false},settings:{type:"object",defaultValue:null},propagateModel:{type:"boolean",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},lifecycle:{type:"sap.ui.core.ComponentLifecycle",defaultValue:d.Legacy},autoPrefixId:{type:"boolean",defaultValue:false},usage:{type:"string",defaultValue:null},manifest:{type:"any",defaultValue:null}},associations:{component:{type:"sap.ui.core.UIComponent",multiple:false}},events:{componentCreated:{parameters:{component:{type:"sap.ui.core.UIComponent"}}},componentFailed:{parameters:{reason:{type:"object"}}}},designtime:"sap/ui/core/designtime/ComponentContainer.designtime"}});function s(o,v,S,D){var g=typeof v==="string"?b.getComponent(v):v;var O=o.getComponentInstance();if(O!==g){if(O){O.setContainer(undefined);if(D){O.destroy();}else{o._propagateProperties(true,O,M._oEmptyPropagatedProperties,true);}}o.setAssociation("component",g,S);g=o.getComponentInstance();if(g){g.setContainer(o);o.propagateProperties(true);}}}e.prototype.getComponentInstance=function(){var g=this.getComponent();return g&&b.getComponent(g);};e.prototype.setComponent=function(v,S){s(this,v,S,this.getLifecycle()===d.Container||(typeof this.getUsage()==="string"&&this.getUsage()&&this.getLifecycle()===d.Legacy));return this;};e.prototype.applySettings=function(S,o){if(S){if(S.manifest==="true"||S.manifest==="false"){S.manifest=S.manifest==="true";}if(S.manifest&&S.async===undefined){S.async=true;}}C.prototype.applySettings.apply(this,arguments);};function f(o){var n=o.getName();var m=o.getManifest();var u=o.getUrl();var S=o.getSettings();var g={name:n?n:undefined,manifest:m!==null?m:false,async:o.getAsync(),url:u?u:undefined,handleValidation:o.getHandleValidation(),settings:S!==null?S:undefined};return g;}e.prototype._createComponent=function(){var o=a.getOwnerComponentFor(this),u=this.getUsage(),m=f(this);if(o&&u){m=o._enhanceWithUsageConfig(u,m);}if(this.getAutoPrefixId()){if(m.id){m.id=this.getId()+"-"+m.id;}if(m.settings&&m.settings.id){m.settings.id=this.getId()+"-"+m.settings.id;}}return a._createComponent(m,o);};e.prototype.onBeforeRendering=function(){var o=this.getComponentInstance(),u=this.getUsage(),n=this.getName(),m=this.getManifest();if(!this._oComponentPromise&&!o&&(u||n||m)){o=this._createComponent();if(o instanceof Promise){this._oComponentPromise=o;o.then(function(o){delete this._oComponentPromise;this.setComponent(o);this.fireComponentCreated({component:o});}.bind(this),function(r){delete this._oComponentPromise;this.fireComponentFailed({reason:r});L.error("Failed to load component for container "+this.getId()+". Reason: "+r);}.bind(this));}else if(o){this.setComponent(o,true);this.fireComponentCreated({component:o});}else{this.fireComponentFailed({reason:new Error("The component could not be created.")});}}if(o&&o.onBeforeRendering){o.onBeforeRendering();}};e.prototype.onAfterRendering=function(){var o=this.getComponentInstance();if(o&&o.onAfterRendering){o.onAfterRendering();}};e.prototype.exit=function(){s(this,undefined,true,this.getLifecycle()!==d.Application);};e.prototype.propagateProperties=function(n){var o=this.getComponentInstance();if(o&&this.getPropagateModel()){this._propagateProperties(n,o);C.prototype.propagateProperties.apply(this,arguments);}};e.prototype._propagateContextualSettings=function(){var o=this.getComponentInstance();if(o){o._applyContextualSettings(this._getContextualSettings());}};return e;});
