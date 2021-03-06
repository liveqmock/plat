Ext.define('plat.view.service.RServiceGrid',{
	extend:'Ext.grid.Panel',
	xtype:'rservicegrid',
    
	title:'已删除服务列表',
	id:'yscfwgl',
	closable:true,
	closeAction:'hide',
	columnLines:true,
    store:'service.RServiceStore',
    tbar :['-',			
			{xtype: 'triggerfield',name:'serviceName',width:200,triggerCls: Ext.baseCSSPrefix + 'form-clear-trigger',
    				display:false,	//自定义变量判断triggercls是否display
    				fieldLabel : '服务名称',
    				emptyText: '请输入服务名称关键字...',  
    				labelWidth : 60,
    				onTriggerClick:function(){
    					this.reset();
    					this.display = false;
	    				this.triggerCell.setDisplayed(false);
	    				this.setWidth(200);
    				}
    		},'-',
    		{xtype: 'triggerfield',name:'orgName',width:200,triggerCls: Ext.baseCSSPrefix + 'form-clear-trigger',
    				display:false,	//自定义变量判断triggercls是否display
    				fieldLabel : '机构名称',
    				emptyText: '请输入机构名称关键字...',    
    				labelWidth : 60,
    				onTriggerClick:function(){
    					this.reset();
    					this.display = false;
	    				this.triggerCell.setDisplayed(false);
	    				this.setWidth(200);
    				}
    			},'-',
			{iconCls:'icon-search',text:'查找',action:'search'},
			'-',
			'双击服务可以查看服务详情'],
    initComponent: function() {
    	var me = this;
    	var editWindow;
        Ext.apply(this, {
			columns: [
						new Ext.grid.column.RowNumberer({text:'#',align:'center',width:30}),				        
				        { text: '服务ID',align:'center', dataIndex: 'id',hidden:true},				        
//				        { text: '服务编码',align:'center',width:162, dataIndex: 'serviceNo',locked:true},
				        { text: '服务名称',align:'center',width:120, dataIndex: 'serviceName',locked:true},
				        { text: '添加时间',align:'center',width:144, dataIndex: 'registerTime',locked:true },
				        { text: '服务状态',align:'center',width:84, dataIndex: 'currentStatus',locked:true,
				        	renderer:function(value){
				        		return PlatMap.Service.currentStatus[value];
				        	}
				        },
				        { text: '服务机构',align:'center',width:120,dataIndex:'enterprise.name',locked:true},
				        { text: '所属窗口',align:'center',width:80, dataIndex: 'enterprise.industryType',locked:true,
		                	renderer:function(value){                		
		                		return PlatMap.Enterprises.industryType[value];
		                	}
		                },
				        {
					        xtype : 'actioncolumn',
							text : '配图',
							align : 'center',
							sortable : false,
							locked : true,
							width : 50,
							items : [{
								icon : 'jsLib/extjs/resources/themes/icons/scan.png',
								tooltip : '查看服务配图',
								handler : function(grid, rowIndex, colIndex, node,
										e, record, rowEl) {
									this.fireEvent('pictureclick', this, grid,
											rowIndex, colIndex, node, e, record,
											rowEl);
								}
							}]
					    },
//				       {	
//				        	xtype:'actioncolumn',
//					        text:'还原',
//					        align:'center',
//					        sortable:false,
//					        locked:true,
//					        width:50,
//					        items: [
//					        	{
//						        	icon:'resources/images/arrow_redo.png',
//						            tooltip: '还原服务',
//						            handler: function(grid, rowIndex, colIndex) {
//						            	var record = grid.getStore().getAt(rowIndex);						                    
//						            	Ext.MessageBox.confirm('警告','确定还原服务【 '+ record.data.serviceName +' 】吗?',function(btn){						            		
//									    	if(btn == 'yes'){
//									    		Ext.Ajax.request({
//    												url: 'service/checkService',
//												    params: {
//												        sid: record.data.id
//												    },
//												    success: function(response){
//												        var result = Ext.JSON.decode(response.responseText);
//												        if(result.success){
//												        	record.set('currentStatus',record.data.lastStatus);
//									    					record.set('lastStatus',"5");
//									    					record.set('locked',0);
//									    					grid.getStore().update({
//								    							params:record.data,
//								    							callback:function(record,operation){
//									    							var result =Ext.JSON.decode(operation.response.responseText);								    						
//									    							if(result.success){
//									    								Ext.example.msg('','<p align="center">服务【'+operation.params.serviceName+'】还原成功</p>');
//									    							}else {
//									    								Ext.Msg.alert('提示','服务【'+operation.params.serviceName+'】还原失败');
//									    							}
//								    							}
//								    						});									    		
//												        }else {
//												        	Ext.Msg.alert('提示',result.message+",无法还原");
//												        }												        
//												    }
//												});
////									    		
//											}
//										});
//						           },
//						           isDisabled:function(grid, rowIndex, colIndex){
//						           		return grid.getStore().getAt(rowIndex).data.currentStatus != "5";
//						           }
//						        }]
//				        },
		    			{ text: '联系人',align:'center',width:70, dataIndex: 'linkMan'},
				        { text: '电话',align:'center',width:124, dataIndex: 'tel'},
				        { text: '邮箱',align:'center',width:156, dataIndex: 'email'},
				        { text: '服务类别ID',align:'center', dataIndex: 'category.id',hidden:true},
				        { text: '服务类别',align:'center',width:100, dataIndex: 'category.text'},
					    { text: '来源',align:'center',width:100, dataIndex: 'serviceSource',renderer: function(value){					    	
							return PlatMap.Service.serviceSource[value];
							}
					    },
				        //{ text: '服务机构ID',align:'center', dataIndex: 'organizeId',hidden:true},
				        //{ text: '服务机构',align:'center',width:80, dataIndex: 'organizeName'},
				        //{ text: '服务对象',align:'center',width:100, dataIndex: 'categoryName'},
				        { text: '服务方式',align:'center',width:100, dataIndex: 'serviceMethod'},
				        //{ text: '服务描述',align:'center',width:150, dataIndex: 'serviceProcedure'},
				        //{ text: '收费方式',align:'center',width:80, dataIndex: 'chargeMethod'},
				        { text: '服务次数',align:'center',width:80, dataIndex: 'serviceNum'}
			],
	    	dockedItems :[{
					        xtype: 'pagingtoolbar',
					        store: 'service.RServiceStore',
					        dock: 'bottom',
					        displayInfo: true
					    }]
        });
        this.callParent();
    }
});