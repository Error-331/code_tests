const SALES_ORDER_PENDING_APPROVAL_STATUS_TITLE = 'Pending Approval';
const SALES_ORDER_PENDING_FULFILLMENT_STATUS_TITLE = 'Pending Fulfillment';
const SALES_ORDER_CANCELLED_STATUS_TITLE = 'Cancelled';
const SALES_ORDER_PARTIALLY_FULFILLED_STATUS_TITLE = 'Partially Fulfilled';
const SALES_ORDER_PENDING_BILLING_PARTIALLY_FULFILLED_STATUS_TITLE = 'Pending Billing/Partially Fulfilled';
const SALES_ORDER_PENDING_BILLING_STATUS_TITLE = 'Pending Billing';
const SALES_ORDER_BILLED_STATUS_TITLE = 'Billed';
const SALES_ORDER_CLOSED_STATUS_TITLE = 'Closed';

const SALES_ORDER_STATUS_CODE_TO_SALES_ORDER_STATUS_TITLE = Object.freeze({
    'a': SALES_ORDER_PENDING_APPROVAL_STATUS_TITLE,
    'b': SALES_ORDER_PENDING_FULFILLMENT_STATUS_TITLE,
    'c': SALES_ORDER_CANCELLED_STATUS_TITLE,
    'd': SALES_ORDER_PARTIALLY_FULFILLED_STATUS_TITLE,
    'e': SALES_ORDER_PENDING_BILLING_PARTIALLY_FULFILLED_STATUS_TITLE,
    'f': SALES_ORDER_PENDING_BILLING_STATUS_TITLE,
    'g': SALES_ORDER_BILLED_STATUS_TITLE,
    'h': SALES_ORDER_CLOSED_STATUS_TITLE,
});

const data = [
    {
        "id": 123,
        "status": "ACTIVE",
        "name": "Suite.cloud 1 Year",
        "enduser": 321,
        "startdate": "1/7/2023",
        "enddate": "1/6/2024",
        "network": "BSG",
        "quantity": 1,
        "customer_id": 321,
        "customer_name": "C-23123 DDM",
        "customer_email": "test@test.com",
        "billingaccount_id": 321,
        "billingaccount_idnumber": "321",
        "billingaccount_name": "321",
        "sales_orders": [{
            "id": 441,
            "tranid": "SO-111",
            "name": 221,
            "status": "G",
            "trandate": "1/7/2022",
            "quantity": 1
        }]
    },
    {
        "id": 123,
        "status": "TERMINATED",
        "name": "Suite.cloud 1 Year",
        "enduser": null,
        "startdate": "9/21/2022",
        "enddate": "9/20/2023",
        "network": "Pilot",
        "quantity": 1,
        "customer_id": 321,
        "customer_name": "C-234 DOG",
        "customer_email": "test@test.com",
        "billingaccount_id": 321,
        "billingaccount_idnumber": "321",
        "billingaccount_name": "321"
    }, {
        "id": 123,
        "status": "ACTIVE",
        "name": "Suite.cloud 1 Year",
        "enduser": null,
        "startdate": "9/21/2022",
        "enddate": "9/20/2023",
        "network": "Pilot",
        "quantity": 1,
        "customer_id": 321,
        "customer_name": "C-723 DOG",
        "customer_email": "test@test.com",
        "billingaccount_id": 321,
        "billingaccount_idnumber": "321",
        "billingaccount_name": "321"
    }, {
        "id": 123,
        "status": "ACTIVE",
        "name": "CSS 1 Year",
        "enduser": 321,
        "startdate": "10/26/2022",
        "enddate": "10/25/2023",
        "network": null,
        "quantity": 1,
        "customer_id": 321,
        "customer_name": "C-64534 BOR",
        "customer_email": "test@test.com",
        "billingaccount_id": 321,
        "billingaccount_idnumber": "321",
        "billingaccount_name": "321",
        "sales_orders": [{
            "id": 441,
            "tranid": "SO-1111",
            "name": 1,
            "status": "G",
            "trandate": "10/24/2021",
            "quantity": 1
        }]
    }, {
        "id": 123,
        "status": "ACTIVE",
        "name": "CSS 1 Year",
        "enduser": 321,
        "startdate": "2/5/2023",
        "enddate": "2/4/2024",
        "network": null,
        "quantity": 2,
        "customer_id": 321,
        "customer_name": "C-6457 DOR",
        "customer_email": "test@test.com",
        "billingaccount_id": 371,
        "billingaccount_idnumber": "321",
        "billingaccount_name": "321",
        "sales_orders": [{
            "id": 441,
            "tranid": "SO-1111",
            "name": 1,
            "status": "G",
            "trandate": "1/5/2022",
            "quantity": 1
        }]
    }, {
        "id": 123,
        "status": "CLOSED",
        "name": "CSS 1 Year",
        "enduser": 321,
        "startdate": "3/4/2022",
        "enddate": "3/3/2023",
        "network": null,
        "quantity": 2,
        "customer_id": 321,
        "customer_name": "C-2345 DOR",
        "customer_email": "test@test.com",
        "billingaccount_id": 321,
        "billingaccount_idnumber": "321",
        "billingaccount_name": "321",
        "sales_orders": [{
            "id": 441,
            "tranid": "SO-1111",
            "name": 1,
            "status": "G",
            "trandate": "2/1/2021",
            "quantity": 1
        }]
    }, {
        "id": 123,
        "status": "TERMINATED",
        "name": "CSS 1 Year",
        "enduser": 321,
        "startdate": "6/1/2022",
        "enddate": "5/31/2023",
        "network": null,
        "quantity": 1,
        "customer_id": 321,
        "customer_name": "C-4567 DOR",
        "customer_email": "test@test.com",
        "billingaccount_id": 321,
        "billingaccount_idnumber": "321",
        "billingaccount_name": "321",
        "sales_orders": [{
            "id": 441,
            "tranid": "SO-1111",
            "name": 1,
            "status": "G",
            "trandate": "5/1/2021",
            "quantity": 1
        }]
    }, {
        "id": 123,
        "status": "ACTIVE",
        "name": "CSS 1 Year",
        "enduser": 321,
        "startdate": "5/8/2022",
        "enddate": "5/7/2023",
        "network": null,
        "quantity": 1,
        "customer_id": 321,
        "customer_name": "C-456 DOR",
        "customer_email": "test@test.com",
        "billingaccount_id": 321,
        "billingaccount_idnumber": "321",
        "billingaccount_name": "321",
        "sales_orders": [{
            "id": 441,
            "tranid": "SO-11111",
            "name": 1,
            "status": "G",
            "trandate": "4/7/2021",
            "quantity": 1
        }]
    }, {
        "id": 123,
        "status": "ACTIVE",
        "name": "CSS 1 Year",
        "enduser": 321,
        "startdate": "3/4/2023",
        "enddate": "3/3/2024",
        "network": null,
        "quantity": 1,
        "customer_id": 321,
        "customer_name": "C-498787 BOR",
        "customer_email": "test@test.com",
        "billingaccount_id": 321,
        "billingaccount_idnumber": "321",
        "billingaccount_name": "321",
        "sales_orders": [{
            "id": 441,
            "tranid": "SO-1111",
            "name": 1,
            "status": "G",
            "trandate": "2/1/2021",
            "quantity": 1
        }]
    }, {
        "id": 123,
        "status": "PENDING_ACTIVATION",
        "name": "CSS 1 Year",
        "enduser": 321,
        "startdate": "5/8/2023",
        "enddate": "5/7/2024",
        "network": null,
        "quantity": 1,
        "customer_id": 321,
        "customer_name": "C-6546 DOR",
        "customer_email": "test@test.com",
        "billingaccount_id": 321,
        "billingaccount_idnumber": "321",
        "billingaccount_name": "321"
    }
];

function getSalesOrderStatusTitleByCode(statusCode) {
    return SALES_ORDER_STATUS_CODE_TO_SALES_ORDER_STATUS_TITLE[statusCode.toLowerCase()];
}

function appendStyles() {
    const range = document.createRange()
    const frag = range.createContextualFragment(`
        <style>
            .base_status {
                width: auto;
            
                border-radius: 3px;
                -webkit-border-radius: 3px;
                padding: 1px 2px;
                
                text-shadow: rgba(0, 0, 0, 0.5) 0 -0.08em 0;
                    
                box-shadow: rgba(0, 0, 0, 0.3) 0 0.1em 0.1em;
                -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 0.1em 0.1em;
                
                font-size: 10px;
                font-weight: bold;
                
                background-image: none;
                color: #ffffff;
            }
        
            .active_status {                   
                background-color: #0C0;
                background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #1aff1a), color-stop(3%, #00e600), color-stop(100%, #00b300));
                background-image: -webkit-linear-gradient(top, #1aff1a, #00e600 3%, #00b300);
                background-image: linear-gradient(top, #1aff1a, #00e600 3%, #00b300);
            }
            
            .pending_status {                                  
                background-color: #CC0;
                background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #ffff1a), color-stop(3%, #e6e600), color-stop(100%, #b3b300));
                background-image: -webkit-linear-gradient(top, #ffff1a, #e6e600 3%, #b3b300);
                background-image: linear-gradient(top, #ffff1a, #e6e600  3%, #b3b300);
            }
            
            .suspend_status {         
                background-color: #9370DB;
                background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #9370DB), color-stop(3%, #893f89), color-stop(100%, #800080));
                background-image: -webkit-linear-gradient(top, #9370DB, #893f89 3%, #800080);
                background-image: linear-gradient(top, #9370DB, #893f89  3%, #800080);                          
            }
            
            .terminated_status {    
                background-color: #C00;
                background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #ff1a1a), color-stop(3%, #e60000), color-stop(100%, #b30000));
                background-image: -webkit-linear-gradient(top, #ff1a1a, #e60000 3%, #b30000);
                background-image: linear-gradient(top, #ff1a1a, #e60000  3%, #b30000);            
            }
            
           .else_status {         
                background-color: #CCC;
                background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #ffffff), color-stop(3%, #e6e6e6), color-stop(100%, #b3b3b3));
                background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6 3%, #b3b3b3);
                background-image: linear-gradient(top, #ffffff, #e6e6e6  3%, #b3b3b3);
                     
                color: #333333;
            }
                  
            .details_container {
                display: flex;
        
                flex-direction: column;
                flex-wrap: nowrap;
        
                justify-content: flex-start;
        
                align-items: stretch;
                align-content: flex-start;
            }
            
            .order_container {
                margin-bottom: 15px;
            }
                  
            .details_container .row {
                flex-basis: auto;
                flex-grow: 0;
                flex-shrink: 0;
            }
        
            .details_container .row.header {
                border-top: 1px solid gray;
                border-left: 1px solid gray;
                border-right: 1px solid gray;
            
                padding: 5px;
        
                font-size: 12px;
                font-weight: bold;
        
                background: #eee;
            }
        
            .details_container .row .field_name {
                font-weight: bold;
                font-size: 12px;
            }
        
            .details_container .row .field_value {
                font-size: 12px;
            }
        
            .details_container .row .field_link {
                font-size: 12px;
                color: inherit;
            }
                
            .subdetails_container {
                flex-basis: auto;
                flex-grow: 0;
                flex-shrink: 0;
        
                border: 1px solid gray;
                padding: 5px;
            }
        </style>
    `);

    document.querySelector('head').append(frag);
}

function prepareSalesOrderModel() {
    return Ext.create('Ext.data.Model', {
        fields: [
            { name: 'key', type: 'string' },
            { name: 'id', type: 'int' },
            { name: 'name', type: 'string' },
            { name: 'tranid', type: 'string' },
            { name: 'status', type: 'string' },
            { name: 'trandate', type: 'string' },
            { name: 'quantity', type: 'int', defaultValue: 0 },
        ],
    });
}

function prepareSubscriptionDetailsModel() {
    return Ext.create('Ext.data.Model', {
        fields: [
            { name: 'id', type: 'int' },
            { name: 'subscriptionstatus', type: 'string' },
            { name: 'name', type: 'string' },
            { name: 'startdate', type: 'string' },
            { name: 'enddate', type: 'string' },
            { name: 'customer', type: 'int' },
            { name: 'billingaccount', type: 'int' },
            { name: 'customer_id', type: 'int' },
            { name: 'customer_name', type: 'string' },
            { name: 'customer_companyname', type: 'string' },
            { name: 'customer_email', type: 'string' },
            { name: 'quantity', type: 'int', defaultValue: 0 },
            { name: 'enduser', type: 'string' },
            { name: 'endusername', type: 'string' },
        ],
    });
}

function prepareSalesOrdersStore(subscriptionData) {
    let data = [];

    if (subscriptionData.sales_orders !== undefined && subscriptionData.sales_orders !== null) {
        let key = 1;

        data = subscriptionData.sales_orders
            .map(salesOrder => {
                salesOrder.key = `Order ${key}`;
                key += 1;

                salesOrder.status = getSalesOrderStatusTitleByCode(salesOrder.status);
                return salesOrder;
            });
    }

    return Ext.create('Ext.data.Store', {
        autoDestroy: true,

        model: prepareSalesOrderModel(),
        data,
    });
}

function prepareSubscriptionDetailsStore(data) {
    return Ext.create('Ext.data.Store', {
        autoDestroy: true,

        model: prepareSubscriptionDetailsModel(),
        data: [ data ],
    });
}

function prepareSalesOrdersListViewConfig(data) {
    return {
        xtype: 'dataview',
        reference: 'dataview',

        padding: 10,
        scrollable: false,

        title: 'No Sales Orders Found',
        emptyText: 'No Sales Orders Found',

        itemTpl: `
                        <div class="details_container order_container">
                            <div class="row header">
                               {key}
                            </div>
                            <div class="details_container subdetails_container">
                                <div class="row">
                                    <span class="field_name">ID:</span>
                                    <a href="/app/accounting/transactions/salesord.nl?id={id}" target="_blank" class="field_link">{tranid}</a>
                                </div>                               
                                <div class="row">
                                    <span class="field_name">Name:</span>
                                    <span class="field_value">{name}</span>
                                </div>
                                <div class="row">
                                    <span class="field_name">Status:</span>
                                    <span class="field_value">{status}</span>
                                </div>
                                <div class="row">
                                    <span class="field_name">Date:</span>
                                    <span class="field_value">{trandate}</span>
                                </div>
                                <div class="row">
                                    <span class="field_name">Quantity:</span>
                                    <span class="field_value">{quantity}</span>
                                </div>   
                            </div>          
                        </div>
                    `,
        store: prepareSalesOrdersStore(data)
    };
}

function prepareSubscriptionDetailsDataViewConfig(data) {
    const urlToNetworkManagement = '/';

    return {
        xtype: 'dataview',
        reference: 'dataview',

        padding: 10,
        scrollable: false,

        title: 'No Subscriptions',
        emptyText: 'No Data Loaded',

        itemTpl: `
                        <div class="details_container">
                            <div class="row">
                                <span class="field_name">Name:</span>
                                <a href="/app/accounting/subscription/subscription.nl?id={id}" target="_blank" class="field_link">{name}</a>
                            </div>
                            <div class="row">
                                <span class="field_name">Start Date:</span>
                                <span class="field_value">{startdate}</span>
                            </div>
                            <div class="row">
                                <span class="field_name">End Date:</span>
                                <span class="field_value">{enddate}</span>
                            </div>
                            <div class="row">
                                <span class="field_name">Subs Quantity:</span>
                                <span class="field_value">{quantity}</span>
                            </div>
                            <div class="row">
                                <span class="field_name">Customer Name:</span>
                                <a href="/app/common/entity/custjob.nl?id={customer_id}" target="_blank" class="field_link">{customer_name} {customer_companyname}</a>
                            </div>
                            <div class="row">
                                <span class="field_name">Customer Email:</span>
                                <span class="field_value">{customer_email}</span>
                            </div>     
                            <div class="row">
                                <span class="field_name">Billing Account:</span>
                                <a href="/app/accounting/otherlists/billingaccount.nl?id={billingaccount_id}" target="_blank" class="field_link">{customer_name} {billingaccount_idnumber} {billingaccount_name}</a>
                            </div>                   
                            <div class="row">
                                <span class="field_name">End User Name:</span>
                                <a href="/app/common/entity/custjob.nl?id={enduser}" target="_blank" class="field_link">{endusername}</a>
                            </div> 
                            <div class="row">
                                <span class="field_name">Network:</span>
                                <a href="${urlToNetworkManagement}&bsn_email={network}" target="_blank" class="field_link">{network}</a>
                            </div>
                        </div>
                    `,
        store: prepareSubscriptionDetailsStore(data)
    };
}

function prepareSalesOrdersPanel(data) {
    return Ext.create('Ext.panel.Panel', {
        title: 'Sales Orders',
        flex: 1,

        scrollable: true,
        items: [ prepareSalesOrdersListViewConfig(data) ]
    });
}

function prepareSubscriptionDetailsPanel(data) {
    return Ext.create('Ext.panel.Panel', {
        title: 'Subscription',
        flex: 1,

        scrollable: true,
        items: [ prepareSubscriptionDetailsDataViewConfig(data) ]
    });
}

function prepareStatusClassAndName(status) {
    switch (status) {
        case 'ACTIVE':
            return ['ACTIVE', 'base_status active_status'];
        case 'PENDING_ACTIVATION':
            return ['PENDING ACTIVATION', 'base_status pending_status'];
        case 'SUSPEND':
            return ['SUSPEND', 'base_status suspend_status'];
        case 'TERMINATED':
            return ['TERMINATED', 'base_status terminated_status'];
        default:
            return [status, 'base_status else_status'];
    }
}

function prepareSubscriptionPanel(data) {
    const [ caption, className ] = prepareStatusClassAndName(data['status']);

    return Ext.create('Ext.panel.Panel', {
        title: `${data['name']} <span class="${className}">${caption}</span>`,
        width: 200,

        scrollable: false,
        bodyPadding: 2,

        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },

        items: [
            prepareSubscriptionDetailsPanel(data),
            prepareSalesOrdersPanel(data),
        ],
    });
}

function showDialogBox(data) {
    Ext.create('Ext.window.Window', {
        title: 'Subscription history',
        height: 500,
        width: 700,
        layout: 'accordion',

        autoDestroy: true,

        layoutConfig: {
            titleCollapse: true,
            animate: true,
            activeOnTop: false,
            autoScroll:true,
            align: 'stretch'
        },

        items: data.map(prepareSubscriptionPanel)
    }).show();
}

appendStyles();
showDialogBox(data);