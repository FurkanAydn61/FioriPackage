sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("fioriodatav2.controller.View1", {
        onInit: function () {
           var oModel = this.getOwnerComponent().getModel();
           this.getView().setModel(oModel, "mPers") 
        }
    });
});
