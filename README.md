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
