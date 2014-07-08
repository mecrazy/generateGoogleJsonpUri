<link href="https://raw.github.com/mecrazy/generateGoogleJsonpUri/master/markdown.css" rel="stylesheet"></link>

generateGoogleJsonpUri
======================
generateGoogleJsonpUri is a jQuery plugin. Tested with jQuery 1.11.1 and 2.1.1. Tested on Chrome 35 and Internet Explorer 8.

## Usage

### $.genJsonpGDU("<Your-spreadsheet-key-here>")

When you open your Google Spreadsheet, URL is like `https://docs.google.com/spreadsheets/d/[ Your spreadsheet key ]/edit#gid=0`. Please put your spreadsheet key into the syntax below.
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
Please compare the syntax above and the table below. Following syntax means the range of the first page is the pink area, 2nd page is the green area. "B2:G2" is a first record. "B6:G6" is a fifth record.
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
};
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