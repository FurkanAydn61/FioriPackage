sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
],
function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("fioriodatav2.controller.View1", {
        onInit: function () {
           var oModel = this.getOwnerComponent().getModel();
           this.getView().setModel(oModel, "mPers") 
        },

        onPressReadList(){
            var oView = this.getView();
            var oModel = oView.getModel();
            
            var sPath = "/persProcessSet";
            oModel.read(sPath, {
                success: function(oSuccess){
                var oJSONModel = new JSONModel();
                oJSONModel.setData(oSuccess);
                oView.setModel(oJSONModel, "mPers");
                MessageToast.show("Success");
                },
                error: function(oError){
                    var sMessage = JSON.parse(oError.responseText).error.message.value;
                    MessageToast.show("Error:" + sMessage);
                }
            });
        }
    });
});
