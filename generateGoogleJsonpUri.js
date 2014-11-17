// < URI generator plugin for New Google Spreadsheet >
//
// This is a jQuery plugin.
// Tested with jQuery 1.11.1 and 2.1.1
// Tested on IE8 and Chrome 35
//
// Developed by mecrazy - http://mecrazy.net
//
(function($){

    $.genJsonpGDU = function(option){

        //Cast dummy console object for old browsers.
        var debug = {console:{log:null},errMsg:[]};
        if(typeof console != 'undefined'){
            debug.console = console;
        }else{
            debug.console.log = function(msg){
                //It is a function for browsers not compatible with console.
                //It can keep 5 error messages maximum.
                if(debug.errMsg.length >= 5){
                    debug.errMsg.splice(4,1); 
                }
                debug.errMsg.unshift(msg);
            };
        }

        var spreadsheetKey = '';
        if(typeof(option) == 'string'){ //For string argument
            spreadsheetKey = option
        }else if(typeof(option) == 'object'){ //For object argument
            if(typeof(option.key) == 'string'){
                spreadsheetKey = option.key;
            }
        }

        //Default setting
        var setting = {
            key:spreadsheetKey,
            base1:'https://spreadsheets.google.com/feeds/cells/',
            //base2:'/od6/public/values?alt=json-in-script',//Fixed to follow Google's syntax change
            base2:'/1/public/basic?alt=json-in-script',
            pager:{
                enabled:false,
                page:1,maxPage:1,prev:false,next:false,
                recsPerPage:5,allRecs:1,
                startRow:2,minCol:1,maxCol:1
            },
            cache:false,
            cacheInterval:{
                sec:0,min:20,hour:0
            },
            firstRequest:true
        };

        //Cahe object for paging
        var cacheObj = {
            url:[],
            json:[],
            time:[]
        };

        var object = {
            //Get simple URL
            //< Syntax 1 (String argument) >
            // xxxxx.url('[Put-spreadsheet-key-here]');
            //< Syntax 2 (Object argument) >
            // xxxxx.url({
            //    minCol:[Col-number-to start],
            //    maxCol:[Col-number-to end],
            //    minRow:[Row-number-to start],
            //    maxRow:[Row-number-to end],
            //    callback:[callback function name],
            //    withoutcallback:[true/false, callback function parameter of GET request]
            // });
            url:function(params){
                var req = setting.base1 + setting.key + setting.base2;
                if(typeof(params) == 'undefined'){
                    //URL for full columns and full rows
                    req += '&callback=callback';//It is default callback function name.
                }else{

                    //Get each column and row parameters.
                    if(typeof(params.minCol) != 'undefined'){
                        req += '&min-col=' + params.minCol;
                    }
                    if(typeof(params.maxCol) != 'undefined'){
                        req += '&max-col=' + params.maxCol;
                    }
                    if(typeof(params.minRow) != 'undefined'){
                        req += '&min-row=' + params.minRow;
                    }
                    if(typeof(params.maxRow) != 'undefined'){
                        req += '&max-row=' + params.maxRow;
                    }

                    //Get a callback parameter
                    if(typeof(params.callback) == 'string'){
                        req += '&callback=' + params.callback;
                    }else{
                        //If there is no param for callback function name, set "callback" for default.
                        if(typeof(params.withoutcallback) == 'undefined'){
                            req += '&callback=callback';
                        }
                    }
                }
                return req;
            },
            //Set parameters
            set:function(params){
                var cacheBefore = setting.cache;
                setting = $.extend(true,setting,params); //Merge objects
                if(cacheBefore != setting.cache){
                    //When cache enabled, launch timer function to check update date.
                    //When cache disabled, stop timer function.
                    cacheCheckerFunc();
                }
                return true;
            },
            //Get parameters
            get:function(){
                var duplicated = $.extend(true,{},setting);
                return duplicated;
            },
            //Generate page URL
            pageUrl:function(targetPage,localPagerUpdate){
                if(targetPage < 1){
                    targetPage = 1;
                }else if(targetPage > setting.pager.maxPage){
                    targetPage = setting.pager.maxPage;
                }
                return generatePageUrl(targetPage,localPagerUpdate);
            },
            //Cast pager
            pager:function(params){
                //"startRow", "minCol" and "maxCol" are required for function "pageUrl".
                setting.pager = $.extend(setting.pager,params); //Merge objects
                setting.pager.enabled = (
                    (typeof(params.startRow) != 'undefined') && 
                    (typeof(params.minCol) != 'undefined') && 
                    (typeof(params.maxCol) != 'undefined'));
                return setting;
            },
            //Ajax function specialized for this plugin
            ajax:function(ajaxObj,cacheUpdate){
                if(typeof(cacheUpdate) == 'undefined'){ cacheUpdate = false; }
                var cloneObj = $.extend(true,{
                    url:object.pageUrl(1,false),dataType:'jsonp',callback:'callback'
                },ajaxObj);
                if(setting.firstRequest){
                    //Check max page at the first time of ajax request
                    checkMaxPage(cloneObj,cacheUpdate);
                }else{
                    normalAjax(cloneObj,cacheUpdate);
                }
                setting.firstRequest = false;
            },
            //Convert Google's JSON to Array 2D
            jsonToArr:function(json){
                var minRow,minCol,yPos,xPos;
                var arr = [];
                var execute = (typeof(json.feed.entry) != 'undefined');
                if(execute){
                    execute = (json.feed.entry.length > 0);
                }
                if(execute){
                    for(var i=0;i<json.feed.entry.length;i++){
                        var txt = json.feed.entry[i].content.$t;
                        var rowAndCol = cellNameToColAndRow(json.feed.entry[i].title.$t);
                        var col = rowAndCol.col;
                        var row = rowAndCol.row;
                        if(i === 0){ minRow = row; }
                        if(i === 0){ minCol = col; }
                        yPos = row - minRow;
                        xPos = col - minCol;
                        while(arr.length < (yPos + 1)){
                            arr.push([]);
                        }
                        while(arr[yPos].length <= xPos){
                            arr[yPos].push('');
                        }
                        arr[yPos][xPos] = txt;
                    }
                }
                return arr;
            },
            //Alert errors
            showErr:function(){
                var tmp = '';
                if(debug.errMsg.length > 0){
                    for(var i=0;i<debug.errMsg.length;i++){
                        tmp += debug.errMsg[i] + '\r\n\r\n';
                    }
                }else{
                    tmp = 'No error.';
                }
                alert(tmp);
            }
        };

        //Launch check function execute every interval
        function cacheCheckerFunc(){
            var htmlObj = $('html');
            var customClass = 'gen-jsonp-gdu-' + spreadsheetKey;

            //When cache disabled.
            if( (htmlObj.hasClass(customClass)) && (!setting.cache) ){
                htmlObj.removeClass(customClass);
            }

            //When cache enabled.
            if( (!htmlObj.hasClass(customClass)) && (setting.cache) ){
                htmlObj.addClass(customClass);
                var seconds = setting.cacheInterval.sec;
                seconds += ( setting.cacheInterval.min * 60 );
                seconds += ( setting.cacheInterval.hour * 60 * 60 );
                //Get only one cell to check update date.
                var tempUrl = object.url({minCol:1,maxCol:1,minRow:1,maxRow:1,withoutcallback:true});
                loopFunc(seconds,function(){
                    object.ajax({
                        url:tempUrl,
                        success:function(json){
                            //Check the updated time of newest data
                            var update = false;
                            for(var t=0;t<cacheObj.time.length;t++){
                                if(cacheObj.time[t] != json.feed.updated.$t){
                                    update = true;
                                    t = cacheObj.time.length;
                                }
                            }
                            if(update){
                                //Clear cache
                                cacheObj = {url:[],json:[],time:[]};
                            }
                        }
                    });
                });
            }

        }

        //Get URL of target page. 2nd argment can control update "setting.pager.page" or not.
        function generatePageUrl(targetPage,localPagerUpdate){
            var pageUrl = '';
            if(!setting.pager.enabled){
                debug.console.log('Pager function is not enabled. Use "pager" function to enable it.');
            }else{
                var startRow = setting.pager.startRow;
                startRow += (targetPage - 1) * setting.pager.recsPerPage;
                var endRow = startRow + setting.pager.recsPerPage - 1;
                pageUrl = object.url({
                    minRow:startRow,
                    maxRow:endRow,
                    minCol:setting.pager.minCol,
                    maxCol:setting.pager.maxCol,
                    withoutcallback:true
                });
                if(typeof(localPagerUpdate) != 'boolean'){
                    localPagerUpdate = true;
                }
                if(localPagerUpdate){
                    setting.pager.page = targetPage;
                }
                setting.pager.prev = (setting.pager.page > 1);
                setting.pager.next = (setting.pager.page < setting.pager.maxPage);
            }
            return pageUrl;
        }

        //Get all rows of 1st column to check record number and max page.
        function checkMaxPage(ajaxObj,cacheUpdate){
            var req = object.url({
                minRow:setting.pager.startRow,
                minCol:setting.pager.minCol,
                maxCol:setting.pager.minCol,
                withoutcallback:true
            });
            var checkAjax = {
                url:req,
                async:false,dataType:'jsonp',callback:'callback',
                error:function(jqXHR,textStatus,errorThrown){
                    debug.console.log(jqXHR,textStatus,errorThrown);
                },
                success:function(json){
                    setting.pager.allRecs = json.feed.entry.length;
                    setting.pager.maxPage = Math.floor(setting.pager.allRecs / setting.pager.recsPerPage);
                    if((setting.pager.allRecs / setting.pager.recsPerPage) > setting.pager.maxPage){
                        setting.pager.maxPage++;
                    }
                    setting.pager.prev = (setting.pager.page > 1);
                    setting.pager.next = (setting.pager.page < setting.pager.maxPage);
                },
                complete:function(){
                    if(typeof(ajaxObj) == 'object'){
                        normalAjax(ajaxObj,cacheUpdate);
                    }
                }
            };
            if(typeof(ajaxObj) == 'object'){
                if(typeof(ajaxObj.beforeSend) != 'undefined'){
                    checkAjax['beforeSend'] = ajaxObj.beforeSend;
                    ajaxObj.beforeSend = null;
                }
            }
            $.ajax(checkAjax);
            return true;
        }

        //Ajax function specialized for this plugin
        function normalAjax(reqObject,cacheUpdate){
            if(setting.cache){
                var pos = cacheObj.url.indexOf(reqObject.url);
                if((pos >= 0)&&(!cacheUpdate)){
                    reqObject.success(cacheObj.json[pos]);
                }else{
                    var successFunc = reqObject.success;
                    var newFunc = function(json){
                        cacheObj.url.push(reqObject.url);
                        cacheObj.json.push(json);
                        cacheObj.time.push(json.feed.updated.$t);
                        successFunc(json);
                    };
                    reqObject.success = newFunc;
                    $.ajax(reqObject);
                }
            }else{
                $.ajax(reqObject);
            }
        }

        //Loop function
        function loopFunc(sec,argFunc){
            var interval = sec * 1000;
            var dummy = setTimeout(function(){
                if(setting.cache){
                    argFunc();
                    loopFunc(sec,argFunc);
                }
            },interval);
        }

		function cellNameToColAndRow(cellName){
			var colStr = cellName.match(/[a-z]+/ig);
			var colArr = new Array();
			if(colStr.length > 1){
				colArr = colStr.split('');
			}else{
				colArr.push(colStr);
			}
			var colNum = 0;
			for(var i=(colArr.length - 1);i>=0;i--){
				var buff = colArr[i] + "A";
				colNum += (buff.charCodeAt(0) - 64) + (26 * i);
			}
			var rowStr = cellName.match(/[0-9]+/ig);
			return {
				col:colNum,
				row:Number(rowStr)
			};
		}

        return object;

    };

})(jQuery);

//Cast indexOf function only for IE
if(!Array.indexOf){
  Array.prototype.indexOf=function(target){
    for(var i=0;i<this.length;i++){if(this[i]===target){return i}}
    return -1;
  }
}
