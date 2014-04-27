(function ( $ ) {
	var settings;
	var defaults = {
			colNumber: 2,
            evenRowClass: 'evenRow',
            oddRowClass: 'oddRow',
            isjqGrid: true,
            isHTMLTable: false,
			showEmptyCell: true
	};
    $.fn.expandCollapse = function( options ) { 
        settings = $.extend({}, defaults, options );
        var tempColTitle = '';
        var colTitle = '';
        var uniqueColTitle = [];
        var elementExpCollap ;
    	var evenRow = true;
    	var rowIdentifier = settings.isjqGrid == true ? "tr.jqgrow" : "tr" ;
        $(this).find(rowIdentifier).each(function(index,element){
        	element = $(element);
        	if(!settings.isjqGrid){
        		element.find('td:eq('+(settings.colNumber-1)+')').attr("title",
        				element.find('td:eq('+(settings.colNumber-1)+')').html());
        		element.attr("id","ecr-"+index);
        	}
        	colTitle = element.find('td:eq('+(settings.colNumber-1)+')').attr("title");
        	if(index == 0 || (tempColTitle != colTitle)){
	        	elementExpCollap = element;
	        	elementExpCollap.find('td:eq(0)').on('click', click);
	        	elementExpCollap.attr('expand-collapse-ids','');
	        	applyExpandCollapseIcon(elementExpCollap);
	        	if(evenRow){
	        		element.addClass(settings.oddRowClass);
	        		evenRow = false;
	        	}else{
	        		element.addClass(settings.evenRowClass);
	        		evenRow = true;
	        	}	        	
        	}else{
        		var elementId = "#"+element.attr("id");
        		var expandCollapseIds = elementExpCollap.attr('expand-collapse-ids');
        		elementExpCollap.attr('expand-collapse-ids', elementId + "," + expandCollapseIds);
        		if(settings.showEmptyCell){
        			element.find('td:lt('+ settings.colNumber +')').html('');
        		}
        		element.css("display","none");
        		if(evenRow){
	        		element.addClass(settings.evenRowClass);
	        	}else{
	        		element.addClass(settings.oddRowClass);
	        	}
        	}
        	tempColTitle = colTitle ;
        });
    };
    
    $.fn.expandAll = function(){
    	expandCollapseAll(this,true);
    }
    
    $.fn.collapseAll = function(){
    	expandCollapseAll(this,false);
    }
    
    var expandCollapseAll = function(element,isExpand){
    	$(element).find('[expand-collapse-ids]').each(function(index,element){
    		element = $(element);
    		$.each(element.attr("expand-collapse-ids").split(','),function(index,value){
    			value = $(value);
    			if(isExpand){
    				value.css('display','table-row');
    			}else{value.css('display','none');}
    		});
    		element.find('td:eq(0) span:eq(0)').removeClass('expandIcon collapseIcon');
    		if(isExpand){
    			element.find('td:eq(0) span:eq(0)').addClass('expandIcon');
    		}else{element.find('td:eq(0) span:eq(0)').addClass('collapseIcon');}
    	});
    }
    
	var click = function(ev){
		var expandCollapseIds = $(this).parent().attr("expand-collapse-ids");
		$.each(expandCollapseIds.split(","),function(index,value){
			value = $(value);
			if(value.css('display') == 'none'){
				value.css('display','table-row');
			}else{
				value.css('display','none');
			}
		});
		$(this).find('span:eq(0)').toggleClass('expandIcon collapseIcon');
	}
	
	var applyExpandCollapseIcon = function(elementExpCollap){
		var tdElement = elementExpCollap.find('td:eq(0)');
		tdElement.prepend('<span style="display:inline-block" class="expandCollapseSprites collapseIcon"></span>');
	}
 
}( jQuery ));