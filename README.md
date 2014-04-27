expandCollapse
=================

A Light weight plugin to expand collapse HTML table even works on top of jqGrid's.

## Demo
Download Demo to see demo

##How to use:
Call the plugin on the HTML table elements to see the effect. 
				
##Options:
```javascript
	$(selector).expandCollapse(options);
	$('myHTMLTable').showOnHover(
	    colNumber: 1,
            isjqGrid: false,
            isHTMLTable: true,
	    showEmptyCell: true
	}{);
```
will group all the rows based on the data of Collumn 1 "colNumber: 1".

##Effects:
You cand see the data of collumn 1 getting grouped and with expand collapse button.

##Additional:

You can call expandAll , collapseAll to expand all or collapse all.

