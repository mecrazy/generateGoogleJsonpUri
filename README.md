generateGoogleJsonpUri
======================
generateGoogleJsonpUri is a jQuery plugin. Tested with jQuery 1.11.1 and 2.1.1. Tested on Chrome 35 and Internet Explorer 8.

## Warning
When you use this plugin, please enable "__Publish to the web__" of your spreadsheet to get by this plugin. __If you enable this function, your Gmail address will be on public JSONP file__. If you want to keep your Gmail address secret, please get extra Google account only for public.

## Ready to use
Load the script after jQuery like below.
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="js/generateGoogleJsonpUri.min.js"></script>
```

## Usage

### $.genJsonpGDU("<Your-spreadsheet-key-here>")

When you open your Google Spreadsheet on your browser, URL is like
`https://docs.google.com/spreadsheets/d/[ Your spreadsheet key ]/edit#gid=0`<br>
Please put your spreadsheet key into the syntax below.
```javascript
var mySheet = $.genJsonpGDU("<Your-spreadsheet-key-here>");
```
Or also you can use the syntax below.
```javascript
var mySheet = $.genJsonpGDU({key:"<Your-spreadsheet-key-here>"});
```

### url(object)
```javascript
mySheet.url({
  minRow:1,//Row number to start getting (optional)
  maxRow:2,//Row number to end getting (optional)
  minCol:1,//Column number to start getting (optional)
  maxCol:2,//Column number to end getting (optional)
  callback:"myCallback"//Callback function name (optional)
});
```
If you do not set "callback", default function name is "callback". If you do not want to set callback function name into URL, please use syntax like below.
```javascript
mySheet.url({
  minRow:2,//Row number to start getting (optional)
  maxRow:3,//Row number to end getting (optional)
  minCol:2,//Column number to start getting (optional)
  maxCol:4,//Column number to end getting (optional)
  withoutcallback:true//Callback function name visible (optional)
});
```
"withoutcallback" is _false_ by default. If you set it _true_, generated URL does not have callback parameter.

### pager(object)
```javascript
mySheet.pager({
  startRow:2,//Row number to start getting (required)
  minCol:2,//Column number to start getting (required)
  maxCol:7,//Column number to end getting (required)
  recsPerPage:5//Records on a page (optional)
});
```
Please compare the syntax above and the table below. Following syntax means the range of the first page is the pink area, 2nd page is the green area. "B2:G2" is a first record. "B6:G6" is a fifth record. Please understand it if you develop paging action with this plugin.

![Range of the pager](https://raw.githubusercontent.com/mecrazy/generateGoogleJsonpUri/master/markdown/table.gif "Range of the pager")

### pageUrl(number)
```javascript
var pageUrl = mySheet.pageUrl(1);
```
If you use this syntax, `mySheet.pager(object)` casting is required before executing this function.

### ajax(object)
```javascript
mySheet.ajax({
  url:mySheet.pageUrl(1),
  success:function(json){
    console.log(json);
  }
});
```
Arguments for this function are the same as "http://api.jquery.com/jQuery.ajax/".

### get
```javascript
var param = mySheet.get();
```
This function returns current parameters. Default parameters are like below.
```javascript
{
  key:[Your-spreadsheet-key],
  base1:'https://spreadsheets.google.com/feeds/cells/',//Do not change!
  base2:'/1/public/basic?alt=json-in-script',//Do not change!
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
}
```

### get ( on ajax )
If you want to know current page has previous page or next page, please use "get()" in _success function of ajax function_ and check parameters.
```javascript
mySheet.ajax({
  url:mySheet.pageUrl(1),
  success:function(json){
    console.log(json);
    var param = mySheet.get();
    if(param.pager.prev){
      console.log('Current page has previous page.');
    }else{
      console.log('Current page does not have previous page.');
    }
    if(param.pager.next){
      console.log('Current page has next page.');
    }else{
      console.log('Current page does not have next page.');
    }
  }
});
```

### jsonToArr
It is a special function for Google's JSON style .
```javascript
mySheet.ajax({
  url:mySheet.pageUrl(1),
  success:function(json){
    var arr2d = mySheet.jsonToArr(json);
    console.log(arr2d);
  }
});
```
If your pager setting is like below,
```javascript
mySheet.pager({
  startRow:2,//Row number to start getting (required)
  minCol:2,//Column number to start getting (required)
  maxCol:7,//Column number to end getting (required)
  recsPerPage:5//Records on a page (optional)
});
```
`arr2d[0][0]` = B2,

`arr2d[0][1]` = C2,

`arr2d[0][2]` = D2,

`arr2d[1][0]` = B3,

`arr2d[1][1]` = C3,

`arr2d[1][2]` = D3.

JSON data will be converted to `arr2d[ row position ][ column position ]`.

### set ( using cache )
Basically this function is for cache.
```javascript
mySheet.set({cache:true});
```
This argument switch to use cache for paging. It checks update date on JSONP every 20 minutes by default. If the date changed, it automatically clear cache. If you want to change the interval to check the date. You can use the syntax like below.
```javascript
mySheet.set({
  cache:true,
  cacheInterval:{
    sec:0,min:50,hour:0
  }
});
```
This function can also change all parameters that you can get by `mySheet.get()`.

======================
### Developer
[http://mecrazy.net](http://mecrazy.net "mecrazy")<br>
[Google+](https://plus.google.com/+MecrazyNet/ "mecrazy")

### Pages about this plugin
English - [Get new version of Google Spreadsheets as JSONP](http://mecrazy.net/2014/07/07/get-cells-new-google-spreadsheet-jsonp/)<br>
espanol - [Obtenga nueva versión de Google Spreadsheets como JSONP](http://mecrazy.net/es/2014/07/08/obtenga-nueva-version-de-google-spreadsheets-como-jsonp/)<br>
русский - [Получить новую версию Google Таблицы как JSONP](http://mecrazy.net/ru/2014/07/09/%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C-%D0%BD%D0%BE%D0%B2%D1%83%D1%8E-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%8E-google-%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B-%D0%BA%D0%B0%D0%BA-jsonp/)<br>
Deutsch - [Neue Version von Google Spreadsheets als JSONP](http://mecrazy.net/de/2014/07/08/neue-version-von-google-spreadsheets-als-jsonp/)<br>
Francais - [Obtenez nouvelle version de Google Feuilles de calcul comme JSONP](http://mecrazy.net/fr/2014/07/08/obtenez-nouvelle-version-de-google-feuilles-de-calcul-comme-jsonp/)<br>
Portugues - [Obter nova versão do Editor de planilhas do Google como JSONP](http://mecrazy.net/pt-pt/2014/07/09/obter-nova-versao-editor-de-planilhas-google-como-jsonp/)<br>
简体中文 - [获取谷歌电子表格作为JSONP的新版本](http://mecrazy.net/zh-hans/2014/07/09/%E8%8E%B7%E5%8F%96%E8%B0%B7%E6%AD%8C%E7%94%B5%E5%AD%90%E8%A1%A8%E6%A0%BC%E4%BD%9C%E4%B8%BAjsonp%E7%9A%84%E6%96%B0%E7%89%88%E6%9C%AC/)<br>
日本語 - [JSONP形式で新バージョンのGoogleスプレッドシートの内容を取得](http://mecrazy.net/ja/2014/07/08/jsonp%E5%BD%A2%E5%BC%8F%E3%81%A7%E6%96%B0%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E3%81%AEgoogle%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%E3%81%AE%E5%86%85%E5%AE%B9/)<br>
 العربية- [الحصول على الإصدار الجديد من جوجل جداول البيانات كما JSONP](http://mecrazy.net/ar/2014/07/10/%D8%A7%D9%84%D8%AD%D8%B5%D9%88%D9%84-%D8%B9%D9%84%D9%89-%D8%A7%D9%84%D8%A5%D8%B5%D8%AF%D8%A7%D8%B1-%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF-%D9%85%D9%86-%D8%AC%D9%88%D8%AC%D9%84-%D8%AC%D8%AF%D8%A7%D9%88/)
