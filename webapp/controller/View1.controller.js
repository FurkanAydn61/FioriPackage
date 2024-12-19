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
        },
        onPressCreate(){
            var oView = this.getView();
            var oModel = oView.getModel();

            var oData = {
                PersId:     oView.byId("inpId").getValue(),
                PersName:   oView.byId("inpName").getValue(),
                PersTitle:  oView.byId("inpTitle").getValue()
            }

            var sPath = "/persProcessSet";

            oModel.create(sPath, oData, {
                success: function(oSuccess){
                MessageToast.show("Success");
                },
                error: function(oError){
                    var sMessage = JSON.parse(oError.responseText).error.message.value;
                    MessageToast.show("Error:" + sMessage);
                }
            });
        },

        onPressRead(){
            var oView   = this.getView();
            var oModel  = oView.getModel(); 
            
            var sPersId = oView.byId("inpId").getValue();

            var sPath = "/persProcessSet(PersId='"+sPersId+"')";
            oModel.read(sPath, {
                success: function(oSuccess){
                oView.byId("inpName").setValue(oSuccess.PersName);
                oView.byId("inpTitle").setValue(oSuccess.PersTitle);
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
