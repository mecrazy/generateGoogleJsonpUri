generateGoogleJsonpUri
======================
generateGoogleJsonpUri is a jQuery plugin. Tested with jQuery 1.11.1 and 2.1.1. Tested on Chrome 35 and Internet Explorer 8.

## Warning
When you use this plugin, please enable "_Publish to the web_" of your spreadsheet to get by this plugin. But if you enable this function, your Gmail address will be on public JSONP file. If you want to keep your Gmail address secret, please get extra Google account only for public.

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

### page(number)
```javascript
var pageUrl = mySheet.page(1);
```

### ajax(object)
```javascript
mySheet.ajax({
  url:mySheet.page(1),
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
  base2:'/od6/public/values?alt=json-in-script',//Do not change!
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
  url:mySheet.page(1),
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
  url:mySheet.page(1),
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

### Page about this plugin
[mecrazy](http://mecrazy.net "mecrazy")
