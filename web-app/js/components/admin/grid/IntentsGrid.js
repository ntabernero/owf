Ext.define('Ozone.components.admin.IntentsGrid', {
  extend: 'Ext.grid.Panel',
  alias: ['widget.intentsgrid'],
  plugins: new Ozone.components.focusable.FocusableGridPanel(),

  cls: 'grid-intent',
  
  forceFit: true,
  baseParams: null,

  initComponent: function() {

    //create new store
    if (this.store == null) {
      this.store = Ext.StoreMgr.lookup({
        type: 'intentstore'
      });
    }
    
    if (this.baseParams) { this.setBaseParams(this.baseParams); }

    var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
        groupHeaderTpl: '{name}',
        enableNoGroups: false,
        enableGroupingMenu: false
    });

    Ext.apply(this, {
      features: [groupingFeature],
      columnLines: true,
      columns: [
        {
          itemId: 'dataType',
          header: 'Intent',
          dataIndex: 'dataType',
          flex: 1,
          minWidth: 200,
          sortable: true,
          renderer:  function(value, metaData, record, rowIndex, columnIndex, store, view) {
            return  '<div class="intent-text">' + value +'</div>';
          }
        },
        {
          itemId: 'send',
          header: 'Send',
          dataIndex: 'send',
          width: 140,
          sortable: true,
          align: 'center',
          renderer:  function(value, metaData, record, rowIndex, columnIndex, store, view) {
    		  var icon = '&nbsp;';
        	  if (value == true) {
        		  icon = '<img src="../themes/common/images/icons/ball.png" />';
        	  }
        	  return icon;
          }
        },
        {
            itemId: 'receive',
            header: 'Receive',
            dataIndex: 'receive',
            width: 140,
            sortable: true,
            align: 'center',
            renderer:  function(value, metaData, record, rowIndex, columnIndex, store, view) {
      		  var icon = '&nbsp;';
          	  if (value == true) {
        		  icon = '<img src="../themes/common/images/icons/ball.png" />';
          	  }
        	  return icon;
            }
        }
      ]
    });
    
    this.callParent(arguments);
  },

  refresh: function() {
    this.store.loadPage(this.store.currentPage);
  },

  getTopToolbar: function() {
    return this.getDockedItems('toolbar[dock="top"]')[0];
  },

  applyFilter: function(filterText, fields) {
	  this.clearFilters();
	  if (filterText) {
	      var filters = [];
	      for (var i = 0; i < fields.length; i++) {
	        filters.push({
	          property: fields[i],
	          value: filterText,
	          anyMatch: true
	        });
	      }
		  this.store.filter(filters);
	  }
  },

  clearFilters: function() {
	  this.store.clearFilter();
  },
  
  setBaseParams: function(params) {
      this.baseParams = params;
      if (this.store.proxy.extraParams) {
          Ext.apply(this.store.proxy.extraParams, params);
      } else {
          this.store.proxy.extraParams = params;
      }
  },
  
  setStore: function(store, cols) {
      this.reconfigure(store, cols);
  }

});