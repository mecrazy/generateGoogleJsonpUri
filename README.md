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
<table class="generateGoogleJsonpUri_table"><tbody>
<tr><td>A1</td><td>B1</td><td>C1</td><td>D1</td><td>E1</td><td>F1</td><td>G1</td><td>H1</td></tr>
<tr><td>A2</td><td bgcolor="#ff0000">B2</td><td class="generateGoogleJsonpUri_cells_range_01">C2</td><td class="generateGoogleJsonpUri_cells_range_01">D2</td><td class="generateGoogleJsonpUri_cells_range_01">E2</td><td class="generateGoogleJsonpUri_cells_range_01">F2</td><td class="generateGoogleJsonpUri_cells_range_01">G2</td><td>H2</td></tr>
<tr><td>A3</td><td class="generateGoogleJsonpUri_cells_range_01">B3</td><td class="generateGoogleJsonpUri_cells_range_01">C3</td><td class="generateGoogleJsonpUri_cells_range_01">D3</td><td class="generateGoogleJsonpUri_cells_range_01">E3</td><td class="generateGoogleJsonpUri_cells_range_01">F3</td><td class="generateGoogleJsonpUri_cells_range_01">G3</td><td>H3</td></tr>
<tr><td>A4</td><td class="generateGoogleJsonpUri_cells_range_01">B4</td><td class="generateGoogleJsonpUri_cells_range_01">C4</td><td class="generateGoogleJsonpUri_cells_range_01">D4</td><td class="generateGoogleJsonpUri_cells_range_01">E4</td><td class="generateGoogleJsonpUri_cells_range_01">F4</td><td class="generateGoogleJsonpUri_cells_range_01">G4</td><td>H4</td></tr>
<tr><td>A5</td><td class="generateGoogleJsonpUri_cells_range_01">B5</td><td class="generateGoogleJsonpUri_cells_range_01">C5</td><td class="generateGoogleJsonpUri_cells_range_01">D5</td><td class="generateGoogleJsonpUri_cells_range_01">E5</td><td class="generateGoogleJsonpUri_cells_range_01">F5</td><td class="generateGoogleJsonpUri_cells_range_01">G5</td><td>H5</td></tr>
<tr><td>A6</td><td class="generateGoogleJsonpUri_cells_range_01">B6</td><td class="generateGoogleJsonpUri_cells_range_01">C6</td><td class="generateGoogleJsonpUri_cells_range_01">D6</td><td class="generateGoogleJsonpUri_cells_range_01">E6</td><td class="generateGoogleJsonpUri_cells_range_01">F6</td><td class="generateGoogleJsonpUri_cells_range_01">G6</td><td>H6</td></tr>
<tr><td>A7</td><td class="generateGoogleJsonpUri_cells_range_02">B7</td><td class="generateGoogleJsonpUri_cells_range_02">C7</td><td class="generateGoogleJsonpUri_cells_range_02">D7</td><td class="generateGoogleJsonpUri_cells_range_02">E7</td><td class="generateGoogleJsonpUri_cells_range_02">F7</td><td class="generateGoogleJsonpUri_cells_range_02">G7</td><td>H7</td></tr>
<tr><td>A8</td><td class="generateGoogleJsonpUri_cells_range_02">B8</td><td class="generateGoogleJsonpUri_cells_range_02">C8</td><td class="generateGoogleJsonpUri_cells_range_02">D8</td><td class="generateGoogleJsonpUri_cells_range_02">E8</td><td class="generateGoogleJsonpUri_cells_range_02">F8</td><td class="generateGoogleJsonpUri_cells_range_02">G8</td><td>H8</td></tr>
<tr><td>A9</td><td class="generateGoogleJsonpUri_cells_range_02">B9</td><td class="generateGoogleJsonpUri_cells_range_02">C9</td><td class="generateGoogleJsonpUri_cells_range_02">D9</td><td class="generateGoogleJsonpUri_cells_range_02">E9</td><td class="generateGoogleJsonpUri_cells_range_02">F9</td><td class="generateGoogleJsonpUri_cells_range_02">G9</td><td>H9</td></tr>
<tr><td>A10</td><td class="generateGoogleJsonpUri_cells_range_02">B10</td><td class="generateGoogleJsonpUri_cells_range_02">C10</td><td class="generateGoogleJsonpUri_cells_range_02">D10</td><td class="generateGoogleJsonpUri_cells_range_02">E10</td><td class="generateGoogleJsonpUri_cells_range_02">F10</td><td class="generateGoogleJsonpUri_cells_range_02">G10</td><td>H10</td></tr>
<tr><td>A11</td><td class="generateGoogleJsonpUri_cells_range_02">B11</td><td class="generateGoogleJsonpUri_cells_range_02">C11</td><td class="generateGoogleJsonpUri_cells_range_02">D11</td><td class="generateGoogleJsonpUri_cells_range_02">E11</td><td class="generateGoogleJsonpUri_cells_range_02">F11</td><td class="generateGoogleJsonpUri_cells_range_02">G11</td><td>H11</td></tr>
<tr><td>A12</td><td>B12</td><td>C12</td><td>D12</td><td>E12</td><td>F12</td><td>G12</td><td>H12</td></tr>
<tr><td>A13</td><td>B13</td><td>C13</td><td>D13</td><td>E13</td><td>F13</td><td>G13</td><td>H13</td></tr>
</tbody></table>
