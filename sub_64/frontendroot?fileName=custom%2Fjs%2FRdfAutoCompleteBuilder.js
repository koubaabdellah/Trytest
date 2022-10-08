/**
 * PoolPartyPage is a utility for building and maintaing a page.
 * @module page
 * @title PoolPartyPage utility
 */
/**
 * The PoolPartyAutoComplete Class
 * @class PoolPartyAutoComplete
 * @constructor
 * @param {Object} oConfig The Configuration for this PoolPartyAutoComplete.
 */
PoolPartyAutoComplete = function(oConfig){
    this.oConfigSchema = {};
    this.oConfigSchema["id"]="optional";
    this.oConfigSchema["useLucene"]="required";
    this.oConfigSchema["servletPath"]="optional";
    this.oConfig = oConfig;
    this.build();
};

PoolPartyAutoComplete.prototype = {
    /**
     * ConfigurationError fires when there's an error in the Configuration for this PoolPartyPage
     * @event onConfigurationError
     * @type CustomEvent
     * @param type {type} The type.
     * @param args {Object} The arguments.
     * @param self {Object} self.
     */
    onConfigurationError: new YAHOO.util.CustomEvent('ConfigurationError'),
    /**
     * The Configuration of the PoolPartyPage
     * @property oConfig
     * @type Object
     */
    oConfig: null,
    /**
     * A Collection of Permanent AutoCompletes of the PoolPartyPage
     * @property oPermanentAutoCompletes
     * @type Object
     */
    oPermanentAutoCompletes: {},
    /**
     * The Dynamic AutoComplete of the PoolPartyPage
     * @property oDynamicAutoComplete
     * @type {YAHOO.widget.AutoComplete}
     */
    oDynamicAutoComplete: null,
    /**
     * The DataSource of this PoolPartyAutoComplete
     * @property oDynamicAutoComplete
     * @type {YAHOO.util.XHRDataSource}
     */
    oDataSource:null,
    /**
     * The useLuceneFlag, wether to use Lucene or normal SPARQL Query
     * @property useLucene
     * @type {String} "true" || "false"
     */
    useLucene:"false",
    /**
     * The default servletPath used for the XHRDataSource
     * @property servletPath
     * @type {String}
     */
    servletPath:"../!/ac",
    /**
     * Builds the PoolPartyAutoComplete from a ConfigurationObject.
     * @method build
     */
    build: function(){
        if("object" !== typeof this.oConfig || this.oConfig == null){
            this.onConfigurationError.fire();
        } else {
            for(key in this.oConfigSchema){
                if(typeof this.oConfigSchema[key] !== "function"){
                    if(this.oConfigSchema[key]=="required"){
                        if(this.oConfig[key]!==undefined){
                            this[key] = this.oConfig[key];
                        } else {
                            this.onConfigurationError.fire();
                            return;
                        }
                    } else {
                        if(this.oConfig[key]!==undefined){
                            this[key] = this.oConfig[key];
                        }
                    }
                }
            }
            this.buildDataSource();
            this.buildTopConceptOfDataSource();
        }
    },
    /**
     * Builds the oDataSource of this PoolPartyAutoComplete
     * @method buildDataSource
     */
    buildDataSource: function(){
        this.oDataSource = new YAHOO.util.XHRDataSource(this.servletPath,{connMethodPost:true});
        this.oDataSource.responseType = YAHOO.util.XHRDataSource.TYPE_JSON;
        this.oDataSource.connXhrMode = "cancelStaleRequests";
        this.oDataSource.resultTypeList = true;

        this.oDataSource.responseSchema = {
            resultsList : "suggestions",
            fields : ["uri","label", "parentLabels", "rdfType"]
        };
        /*
         * Check for session timeouts
         */
        this.oDataSource.subscribe("responseEvent",function(oArgs){
            if(oArgs.response["getResponseHeader"]["login"]=="true"){
                window.document.location.href=ServerConnector.ContextPath;
            }
        });
    },
    buildDefaultDataSource: function(){
        var oDefaultDataSource = new YAHOO.util.XHRDataSource(this.servletPath,{
            connMethodPost:true
        });
        oDefaultDataSource.isDefault = true;
        oDefaultDataSource.responseType = YAHOO.util.XHRDataSource.TYPE_JSON;
        oDefaultDataSource.connXhrMode = "cancelStaleRequests";
        oDefaultDataSource.resultTypeList = true;

        oDefaultDataSource.responseSchema = {
            resultsList : "suggestions",
            fields : ["uri","label", "parentLabels", "rdfType"]
        };
        oDefaultDataSource.subscribe("responseEvent",function(oArgs){
            if(oArgs.response["getResponseHeader"]["login"]=="true"){
                window.document.location.href=ServerConnector.ContextPath;
            }
        });
        return oDefaultDataSource;
    },
    buildTopConceptOfDataSource: function(){
        this.oTopConceptOfDataSource = new YAHOO.util.XHRDataSource(this.servletPath,{connMethodPost:true});
        this.oTopConceptOfDataSource.responseType = YAHOO.util.XHRDataSource.TYPE_JSON;
        this.oTopConceptOfDataSource.connXhrMode = "cancelStaleRequests";
        this.oTopConceptOfDataSource.resultTypeList = true;
        this.oTopConceptOfDataSource.responseSchema = {
            resultsList : "suggestions",
            fields : ["uri", "label", "parentLabels", "rdfType"]
        };
        /*
         * Check for session timeouts
         */
        this.oTopConceptOfDataSource.subscribe("responseEvent",function(oArgs){
            if(oArgs.response["getResponseHeader"]["login"]=="true"){
                window.document.location.href=ServerConnector.ContextPath;
            }
        });
    },
    /**
     * Adds an AutoComplete from CommonSetup to the PermanentAutoCompletes of this PoolPartyAutoComplete
     * @method addPermanentDefaultAutoComplete
     * @param {String} AutoCompleteID. the id of the PermanentAutoComplete
     * @param {String} InputField. the id of the InputField
     * @param {String} ContainerDiv. the id of ContainerDiv
     */
    addPermanentDefaultAutoComplete: function(AutoCompleteID, InputField, ContainerDiv){
        if(this.oPermanentAutoCompletes[AutoCompleteID]!==undefined){
            try {
                this.oPermanentAutoCompletes[AutoCompleteID].destroy();
            } catch(e){ }
        }
        this.oPermanentAutoCompletes[AutoCompleteID] = this.createGlobalAutoComplete(InputField, ContainerDiv);
        this.oPermanentAutoCompletes[AutoCompleteID].dataSource = this.buildDefaultDataSource();
        this.oPermanentAutoCompletes[AutoCompleteID].dataRequestEvent.subscribe(function(oSelf, sQuery, oRequest){
            document.getElementById("permanentacloading").innerHTML = "<img src='images/permanentacloader.gif'/>";
        });
        this.oPermanentAutoCompletes[AutoCompleteID].dataReturnEvent.subscribe(function(oSelf, sQuery, oRequest){
            document.getElementById("permanentacloading").innerHTML = "";
        });
    },
    /**
     * Adds a CustomAutoComplete to the PermanentAutoCompletes of this PoolPartyAutoComplete
     * @method addPermanentCustomAutoComplete
     * @param {String} AutoCompleteID. the id of the PermanentAutoComplete
     * @param {YAHOO.widget.AutoComplete} AutoComplete. the id of the InputField
     */
    addPermanentCustomAutoComplete: function(AutoCompleteID, AutoComplete){
        if(this.PermanentAutoCompletes[AutoCompleteID]!==undefined){
            this.PermanentAutoCompletes[AutoCompleteID].destroy();
        }
        this.PermanentAutoCompletes[AutoCompleteID] = AutoComplete;
    },
    /**
     * Returns the PermanentAutoComplete for the given AutoCompleteID
     * @method getPermanentAutoComplete
     * @param {String} AutoCompleteID. the id of the PermanentAutoComplete
     */
    getPermanentAutoComplete: function(AutoCompleteID){
        return this.oPermanentAutoCompletes[AutoCompleteID];
    },
    /**
     * Sets a DefaultAutoComplete as the DynamicAutoComplete of this PoolPartyAutoComplete
     * @method setDynamicDefaultAutoComplete
     * @param {String} InputField. the id of the InputField
     * @param {String} ContainerDiv. the id of ContainerDiv
     */
    setDynamicDefaultAutoComplete: function (InputField, ContainerDiv){
        if(this.oDynamicAutoComplete!=null){
            try {
                this.oDynamicAutoComplete.destroy();
            } catch (e){
                console.error(e);
            }
        }
        this.oDynamicAutoComplete = this.createDefaultAutoComplete(InputField, ContainerDiv);
    },
    /**
     * Creates Autocomplete with Dbpedia entries
     */
    setDynamicDefaultAutoCompleteDbpedia: function(InputField, ContainerDiv){
        var dataSource = new YAHOO.util.XHRDataSource("!/ac/dbpedia");
        dataSource.responseType = YAHOO.util.XHRDataSource.TYPE_JSON;
        dataSource.responseSchema = {
            resultsList:"suggestions",
            fields:[
                {key: "label"},
                {key: "uri"},
                {key: "rdfType"},
                {key: "parent"}
            ]
        };

        var ac = new YAHOO.widget.AutoComplete(InputField, ContainerDiv, dataSource);

        ac.resultTypeList = false;
        ac.maxResultsDisplayed = 12;
        ac.queryDelay = 1;
        ac.autoHighlight = false;
        ac.generateRequest = function(sQuery){
            return "?query=" + sQuery + "&lang=en&useLucene="+PPP.AC.useLucene;
        };

        ac.formatResult = function(oResultData, sQuery, sResultMatch){
            var cssClass = "";

            switch(oResultData.rdfType){
                case "header":
                    cssClass = "acHeader";
                    break;
                case "http://dbpedia/resource":
                    cssClass = "acDbpedia";
                    break;
                default:
                    cssClass = "acConcept";
            }
            return "<div class='" + cssClass + "'>" + oResultData.label + "</div>";
        };

        this.oDynamicAutoComplete = ac;
    },
    /**
     * Sets the focus to the input field of the AutoComplete with the given id, if not found
     * to the DynamicAutoComplete
     * @method setFocusToInputfield
     * @param {String} AutoCompleteID. the id of the PermanentAutoComplete
     */
    setFocusToInputfield: function(AutoCompleteID){
        var ac;
        if (AutoCompleteID==null) {
            ac=this.DynamicAutoComplete;
        } else {
            ac=this.PermanentAutoCompletes[AutoCompleteID];
        }
        if (ac!=null) {
            ac.getInputEl().focus();
        }
    },
    setFocusToInputfield2: function(AutoCompleteID){
        dom.get(AutoCompleteID).blur();
        window.setTimeout(function(){
            dom.get(AutoCompleteID).focus();
        }, 500);
    },

    /**
     * Creates a DefaultAutoComplete
     * @method createDefaultAutoComplete
     * @param {String} InputField. the id of the InputField
     * @param {String} ContainerDiv. the id of ContainerDiv
     */
    createDefaultAutoComplete: function(InputField, ContainerDiv){
        var AutoComplete = new YAHOO.widget.AutoComplete(InputField,ContainerDiv, this.oDataSource, {maxResultsDisplayed:150,maxCacheEntries:0});
        AutoComplete.minQueryLength = 2;
        AutoComplete.useShadow = true;
        AutoComplete.suppressInputUpdate = true;
        AutoComplete.autoHighlight = false;
        AutoComplete.generateRequest = function(sQuery) {
            var acLang;
            try {
                acLang = PPP.AC.getLanguage();
            } catch(e){
                acLang = PPP.getSessionAttribute("pptProject").getDefaultLanguage();
            }
            var Q;
            if(acLang=="de" && PPP.AC.useLucene == "false"){
                Q = decodeURI(sQuery).toLowerCase();
                Q = encodeURI(Q);
            } else {
                Q = sQuery;
            }

            return "lang="+acLang+"&query=" + (Q) +"&useLucene="+PPP.AC.useLucene+"&rdfType="+encodeURIComponent("http://www.w3.org/2004/02/skos/core#Concept");
        };

        AutoComplete.formatResult = function(oResultItem, sQuery, sResultMatch) {
            var regex = new RegExp(sQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),'gi');
            var Label = oResultItem[1].replace(regex,function(thematch){return "<span style='font-weight:bold;'>"+thematch+"</span>"});
            try {
                if(oResultItem[2] && oResultItem[2].length>0){
                    var parentLabelCounter = 0;
                    Label += " (";
                    for(var i = 0; i < oResultItem[2].length; i++){
                        if(parentLabelCounter < 3){
                            if(i>0){Label += ", ";}
                            Label += oResultItem[2][i].replace(regex,function(thematch){return "<span style='font-weight:bold;'>"+thematch+"</span>"});
                            parentLabelCounter++;
                        }
                    }
                    Label += ") ";
                }
            } catch(e){
                //console.log(e);
            }
            return Label;
        };
        return AutoComplete;
    },



    /**
     * Creates a AutoComplete for the global search box at the top of the PP UI
     * @method createDefaultAutoComplete
     * @param {String} InputField. the id of the InputField
     * @param {String} ContainerDiv. the id of ContainerDiv
     */
    createGlobalAutoComplete: function(InputField, ContainerDiv){
        var AutoComplete = new YAHOO.widget.AutoComplete(InputField,ContainerDiv, this.oDataSource, {maxResultsDisplayed:150, maxCacheEntries:0});
        AutoComplete.minQueryLength = 2;
        AutoComplete.useShadow = true;
        AutoComplete.suppressInputUpdate = true;
        AutoComplete.autoHighlight = false;
        AutoComplete.generateRequest = function(sQuery) {
            var request = "rdfType="+encodeURIComponent(SKOS.CONCEPT.stringValue())+"&useLucene="+PPP.AC.useLucene;
            var acLang;
            try {
                acLang = PPP.AC.getLanguage();
            } catch(e){
                acLang = PPP.getSessionAttribute("pptProject").getDefaultLanguage();
            }

            request += ("&lang="+acLang);

            if(acLang=="de" && PPP.AC.useLucene == "false"){
                request += ("&query="+encodeURI(decodeURI(sQuery).toLowerCase()));
            } else {
                request += ("&query="+sQuery);
            }

            try {
                if (PPP.CurrentNode.data.TreeNodeClass === SKOS.CONCEPT.stringValue()) {
                    request += ("&currentURI="+encodeURIComponent(PPP.CurrentNode.data.URI));
                }
            } catch(e){
                console.error(e);
            }

            return request;
        };

        AutoComplete.formatResult = function(oResultItem, sQuery, sResultMatch) {
            var regex = new RegExp(sQuery.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),'gi');
            var Label = oResultItem[1].replace(regex,function(thematch){return "<span style='font-weight:bold;'>"+thematch+"</span>"});
            try {
                if(oResultItem[2] && oResultItem[2].length>0){
                    var parentLabelCounter = 0;
                    Label += " (";
                    for(var i = 0; i < oResultItem[2].length; i++){
                        if(parentLabelCounter < 3){
                            if (i>0) Label += ", ";
                            Label += oResultItem[2][i].replace(regex,function(thematch){
                                return "<span style='font-weight:bold;'>"+thematch+"</span>"
                            });
                            parentLabelCounter++;
                        }
                    }
                    Label += ") ";
                }
            } catch(e){
                //console.log(e);
            }
            return Label;
        };
        return AutoComplete;
    },

    createTopConceptOfAutoComplete: function(eInput, eOutput, sConceptURI, bFreeConcepts){
        if(this.oTopConceptOfAutoComplete!=null){
            try {
                this.oTopConceptOfAutoComplete.destroy();
            } catch (e){}
        }

        this.oTopConceptOfAutoComplete = new YAHOO.widget.AutoComplete(eInput,eOutput,this.oTopConceptOfDataSource,{maxResultsDisplayed:150,maxCacheEntries:0});
        this.oTopConceptOfAutoComplete.minQueryLength = 2;
        this.oTopConceptOfAutoComplete.useShadow = true;
        this.oTopConceptOfAutoComplete.suppressInputUpdate = true;
        this.oTopConceptOfAutoComplete.autoHighlight = false;
        this.oTopConceptOfAutoComplete.resultTypeList = true;
        this.oTopConceptOfAutoComplete.bFreeConcepts = bFreeConcepts;
        this.oTopConceptOfAutoComplete.sConceptURI = sConceptURI;
        var replacements = {};
        /*replacements.Ã¶ = "(Ã–|Ã¶)";
         replacements.Ã¤ = "(Ã„|Ã¤)";
         replacements.Ã¼ = "(Ãœ|Ã¼)";*/
        this.oTopConceptOfAutoComplete.generateRequest = function(sQuery) {
            var acLang;
            try {
                acLang = PPP.AC.getLanguage();
            } catch(e){
                acLang = PPP.getSessionAttribute("pptProject").getDefaultLanguage();
            }
            var Q;
            if(acLang=="de"){
                Q = (decodeURI(sQuery)).toLowerCase();
                for(umlaut in replacements){
                    if(typeof replacements[umlaut] !== "function"){
                        var regex = new RegExp( umlaut, "g" )
                        Q = Q.replace( regex, replacements[umlaut] );
                    }
                }
                Q = encodeURI(Q);
            } else {
                Q = sQuery;
            }

            return "lang="+acLang+"&query=" + (Q) +"&topConceptOf=true";
        };

        this.oTopConceptOfAutoComplete.formatResult = function(oResultItem, sQuery, sResultMatch) {
            return oResultItem[1];
        };
        this.oTopConceptOfAutoComplete.itemSelectEvent.subscribe(function(sType,aArgs){
            PPP.SkosEditor.addFreeConceptAsTopConcept(this.sConceptURI, aArgs[1]._oResultData[0], function() {
                PPP.SkosTree.labelClick(PPP.CurrentNode);
            });
        });
    },
    /**
     * Creates a generic Concept Scheme Autocomplete
     *
     * @param {type} eInput             ID of input field
     * @param {type} eOutput            ID of result div
     * @param {type} customSelectEvent  Function that should be fired if user selects an item
     * @param {type} customReturnEvent  Function that should be fired if AC receives data
     * @return {undefined}
     */
    createConceptSchemeAutocomplete: function(eInput, eOutput, customSelectEvent, customReturnEvent){
        if(this.oTopConceptOfAutoComplete!=null){
            try {
                this.oTopConceptOfAutoComplete.destroy();
            } catch (e){}
        }

        this.oTopConceptOfAutoComplete = new YAHOO.widget.AutoComplete(eInput,eOutput,this.oTopConceptOfDataSource,{maxResultsDisplayed:150,maxCacheEntries:0});
        this.oTopConceptOfAutoComplete.minQueryLength = 2;
        this.oTopConceptOfAutoComplete.useShadow = true;
        this.oTopConceptOfAutoComplete.suppressInputUpdate = true;
        this.oTopConceptOfAutoComplete.autoHighlight = false;
        this.oTopConceptOfAutoComplete.resultTypeList = true;
        this.oTopConceptOfAutoComplete.bFreeConcepts = false;//bFreeConcepts;
        //this.oTopConceptOfAutoComplete.sConceptURI = "sConceptURI";

        var replacements = {};
        /*replacements.Ã¶ = "(Ã–|Ã¶)";
         replacements.Ã¤ = "(Ã„|Ã¤)";
         replacements.Ã¼ = "(Ãœ|Ã¼)";*/
        this.oTopConceptOfAutoComplete.generateRequest = function(sQuery) {
            var acLang;
            try {
                acLang = PPP.AC.getLanguage();
            } catch(e){
                acLang = PPP.getSessionAttribute("pptProject").getDefaultLanguage();
            }
            var Q;
            if(acLang=="de"){
                Q = (decodeURI(sQuery)).toLowerCase();
                for(umlaut in replacements){
                    if(typeof replacements[umlaut] !== "function"){
                        Q = Q.replace(new RegExp( umlaut, "g" ), replacements[umlaut]);
                    }
                }
                Q = encodeURI(Q);
            } else {
                Q = sQuery;
            }

            return "lang="+acLang+"&query=" + (Q) +"&topConceptOf=true";
        };

        this.oTopConceptOfAutoComplete.formatResult = function(oResultItem, sQuery, sResultMatch) {
            return oResultItem[1];
        };

        this.oTopConceptOfAutoComplete.dataReturnEvent.subscribe(customReturnEvent);

        this.oTopConceptOfAutoComplete.itemSelectEvent.subscribe(customSelectEvent);
    },
    getLanguage: function(){
        var acLanguage = dom.get("acSelect");
        if(!acLanguage) throw "no ac";
        return acLanguage.getAttribute("value");
    }
};
