sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/model/Sorter',
],
function (Controller, MessageToast, JSONModel, Filter, FilterOperator, Sorter) {
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
        },

        onPressUpdate() {
            var oView   = this.getView();
            var oModel  = oView.getModel(); 

            var oData = {
                PersName:   oView.byId("inpName").getValue(),
                PersTitle:  oView.byId("inpTitle").getValue()
            }

            var sPersId = oView.byId("inpId").getValue();
            var sPath = "/persProcessSet(PersId='"+sPersId+"')";

            oModel.update(sPath, oData, {
                success: function(oSuccess){
                MessageToast.show("Success");
                },
                error: function(oError){
                    var sMessage = JSON.parse(oError.responseText).error.message.value;
                    MessageToast.show("Error:" + sMessage);
                }
            });
        },
        onPressDelete(){
            var oView = this.getView();
            var oModel = oView.getModel();

            var sPersId = oView.byId("inpId").getValue();
            var sPath = "/persProcessSet(PersId='"+sPersId+"')";
            oModel.remove(sPath, {
                success: function(oSuccess){
                MessageToast.show("Success");
                },
                error: function(oError){
                    var sMessage = JSON.parse(oError.responseText).error.message.value;
                    MessageToast.show("Error:" + sMessage);
                }
            });
        },

        onFilter(oEvent){
            const aFilter = [];
            const sQuery = oEvent.getParameter("query");
            if (sQuery) {
				aFilter.push(new Filter("PersName", FilterOperator.Contains, sQuery));
			}

            const oList = this.byId("persProcessSet");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        }

    });
});
