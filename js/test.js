/**
  *
   上海三高通用接口模块
  *
  @module 接口转发模块
  @author wangchao 2018/11/12
*/
window.SH3HBridge = (function ($Core) {
    return $Core;
})(window.SH3HBridge || {});


(function ($Core) {
    $Core.Bridge = Bridge;
    function Bridge(iframeId) {
        var _that = this;
        this.anonymousfnlist = [];
        if (window.attachEvent) {
            window.attachEvent("message", handleMessage);
        }
        else if (window.addEventListener) {
            window.addEventListener("message", handleMessage, false);
        }              
        this.registerEvent = function (eventName, callback) {             
            if (!this[eventName]) {
                this[eventName] = [];
            }
            this[eventName].push(callback);           
        }
        this.dispatchEvent = function (eventName) {
            var that = this;
            var params = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
            if (that[eventName]) {
                Array.prototype.forEach.call(that[eventName], function (arg) {
                    arg.apply(self, params);
                });
            }
        }         
        this.EventApi = {           
            //注册地图事件
            RegisterMapClick: function (callBack) {
                Invoke.apply(_that, ["EventApi.RegisterMapClick", [getFinallFunName.apply(_that, [this, callBack])]]);
            },
            //数据展示
            ShowDataOnMap: function (data, option, callBack) {
                Invoke.apply(_that, ["EventApi.ShowDataOnMap", [data, option, getFinallFunName.apply(_that, [this, callBack])]]);
            },
            //创建热力图
            CreateHeatMap: function (data, option, callBack) {
                Invoke.apply(_that, ["EventApi.CreateHeatMap", [data, option, getFinallFunName.apply(_that, [this, callBack])]]);
            },
            //清空热力图
            ClearHeatMap: function (callBack) {
                Invoke.apply(_that, ["EventApi.ClearHeatMap", [getFinallFunName.apply(_that, [this, callBack])]]);
            },
            //清空所有数据显示
            ClearLayers: function (layerkeys) {
                Invoke.apply(_that, ["EventApi.ClearLayers", [layerkeys, getFinallFunName.apply(_that, [this])]]);
            },
            //获取地图中心点坐标
            GetCenterCoord: function (callBack) {
                Invoke.apply(_that, ["EventApi.GetCenterCoord", [getFinallFunName.apply(_that, [this, callBack])]])
            },
            //底图的缩放操作
            doNav: function (navtool) {
                Invoke.apply(_that, ["EventApi.doNav", [navtool, getFinallFunName.apply(_that, [this])]]);
            },
            //按比例或范围 缩放定位
            JXH_DoLocate: function (option) {
                Invoke.apply(_that, ["EventApi.JXH_DoLocate", [option]]);
            },
            //设置比例尺
            doSetScale: function (scale) {
                Invoke.apply(_that, ["EventApi.doSetScale", [scale]]);
            },
            //根据图层名，where 定位  option 配置项
            doLocate: function (layername, where, option, callBack) {
                Invoke.apply(_that, ["EventApi.doLocate", [layername, where, option, getFinallFunName.apply(_that, [this, callBack])]]);
            },
            doEchartMove: function (geoCoordMap, KSData) {
                
                Invoke.apply(_that, ["EventApi.doEchartMove", [geoCoordMap, KSData]]);
            },           
            CreateEchartLayer: function (option) {
                Invoke.apply(_that, ["EventApi.CreateEchartLayer", [option]]);
            },
            ClearEchartLayer: function () {
                Invoke.apply(_that, ["EventApi.ClearEchartLayer", []]);
            },
            openLayersByNames: function (params) {
                Invoke.apply(_that, ["EventApi.openLayersByNames", [params, getFinallFunName.apply(_that, [this])]]);
            },
            setStartQueryFlag: function (queryobj, callBack) {
                Invoke.apply(_that, ["EventApi.setStartQueryFlag", [queryobj, getFinallFunName.apply(_that, [this, callBack])]]);
            },
            initTrack: function (track, lineSymbolOption, symbolstartOption, symbolendOption, symbolmoveOption, infotempStr) {
                Invoke.apply(_that, ["EventApi.initTrack", [track, lineSymbolOption, symbolstartOption, symbolendOption, symbolmoveOption, infotempStr]]);
            },
            clearTrack: function () {
                Invoke.apply(_that, ["EventApi.clearTrack", []]);
            },
            startPlayTrack: function (speedTime) {
                Invoke.apply(_that, ["EventApi.startPlayTrack", [speedTime]]);
            },
            stopPlayTrack: function () {
                Invoke.apply(_that, ["EventApi.stopPlayTrack", []]);
            },
            rePlayTrack: function (speedTime) {
                Invoke.apply(_that, ["EventApi.rePlayTrack", [speedTime]]);
            },
            initToolBar: function () {
                Invoke.apply(_that, ["EventApi.initToolBar", []]);
            },
            toolBarDistince: function () {
                Invoke.apply(_that, ["EventApi.toolBarDistince", []]);
            },
            toolBarArea: function () {
                Invoke.apply(_that, ["EventApi.toolBarArea", []]);
            },
            cleartoolBar: function () {
                Invoke.apply(_that, ["EventApi.cleartoolBar", []]);
            },
			RegisterMapListerEvent: function (name,callBack) {
                Invoke.apply(_that, ["EventApi.RegisterMapListerEvent", [name,getFinallFunName.apply(_that, [this, callBack])]]);
            },
			ClearMapListerEvent: function () {
                Invoke.apply(_that, ["EventApi.ClearMapListerEvent", []]);
            },
        }
        function init() {             
            this.iframe = document.getElementById(iframeId).contentWindow;
            this.domain = document.getElementById(iframeId).src;
            this.dispatchEvent("load");
        }
        function handleMessage(evt) {
            console.log(evt);            
            if (evt.data.method == "init") {
                eval(evt.data.method).apply(_that, evt.data.arguments);
            }
            else if (evt.data.method == "graphicclick") {
                if (evt.data.type != undefined)
                    eval(evt.data.msg)(evt.data.data, evt.data.type);
                else
                    eval(evt.data.msg)(evt.data.data);
            }
            else if (evt.data.method == "mapclick") {
                eval(evt.data.msg)(evt.data.data);
            }
            else {
                try {
                    if (window[evt.data.method] !== undefined) {
                        eval(evt.data.method).apply(window, evt.data.arguments);
                    }
                    else {
                        var i = 0, len = _that.anonymousfnlist.length;
                        for (; i < len; i++) {
                            if (_that.anonymousfnlist[i].fname == evt.data.method) {
                                var d = _that.anonymousfnlist[i];
                                d.fn.apply(d.domain, evt.data.arguments);
                                break;
                            }

                        }

                    }
                }
                catch (error) {
                    console.log("未注册该方法" + error)
                }

            }
        }
        function Invoke(methodname, arguments) {    
            if (this.iframe === undefined)
                return;
            this.iframe.postMessage(JSON.stringify({ method: methodname, arguments: arguments }), this.domain);
        };
        function getFinallFunName($this, fn) {             
            var fname = undefined;          
            if (typeof (fn) == "function") {               
                fname = getFunName(fn);              
                if (window[fn] === undefined) {
                    var hasfn = false;
                    if (fname == "") {
                        fname = "anonymousCallBack" + this.anonymousfnlist.length;
                        for (var i = 0, len = this.anonymousfnlist.length; i < len; i++) {
                            if (this.anonymousfnlist[i].fn == fn && this.anonymousfnlist[i].domain == $this) {
                                fname = this.anonymousfnlist[i].fname;
                                hasfn = true;
                                break;
                            }
                        }
                    }
                    if (!hasfn)
                        this.anonymousfnlist.push({ fname: fname, fn: fn, domain: $this });
                }
            }
            else {
                fname = fn;
            }
            console.log(fname);
            return fname;
        }
        function getFunName(fn) {
            return (/^[\s\(]*function(?:\s+([\w$_][\w\d$_]*))?\(/).exec(fn.toString())[1] || '';
        }
    }
})(SH3HBridge)