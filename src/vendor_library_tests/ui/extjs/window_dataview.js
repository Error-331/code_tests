const data = [{
    "id": 17615,
    "subscriptionstatus": "ACTIVE",
    "name": "Suite.com 1 Year - 4/19/2022 - 3",
    "enduser": null,
    "startdate": "4/19/2022",
    "enddate": "4/18/2023",
    "customer": 3101,
    "billingaccount": 15975,
    "customer_name": "C-447",
    "customer_companyname": "AVI Systems, Inc.",
    "customer_email": "APInvoice@AVISystems.com",
    "quantity": 7,

    "change_orders": [],
}, {
    "id": 16989,
    "subscriptionstatus": "PENDING_ACTIVATION",
    "name": "Suite.com 1 Year - 4/21/2022 - 3 Renew 1",
    "enduser": 3146,
    "startdate": "4/21/2023",
    "enddate": "4/20/2024",
    "customer": 3146,
    "billingaccount": 6351,
    "customer_name": "C-492",
    "customer_companyname": "Diversified Media Group",
    "customer_email": "accounts_payable@diversifiedus.com",
    "quantity": 3221,

    "change_orders": [],
}, {
    "id": 2758,
    "subscriptionstatus": "TERMINATED",
    "name": "Suite.com 1 Year - 3/5/2022 - 5",
    "enduser": 3146,
    "startdate": "3/5/2022",
    "enddate": "3/4/2023",
    "customer": 3146,
    "billingaccount": 5009,
    "customer_name": "C-492",
    "customer_companyname": "Diversified Media Group",
    "customer_email": "accounts_payable@diversifiedus.com",
    "quantity": 2800,

    "change_orders": [],
}, {
    "id": 3484,
    "subscriptionstatus": "TERMINATED",
    "name": "Suite.com 1 Year - 4/21/2022 - 1",
    "enduser": 3146,
    "startdate": "4/21/2022",
    "enddate": "4/20/2023",
    "customer": 3146,
    "billingaccount": 6351,
    "customer_name": "C-492",
    "customer_companyname": "Diversified Media Group",
    "customer_email": "accounts_payable@diversifiedus.com",
    "quantity": 8440,

    "change_orders": [],
}, {
    "id": 5226,
    "subscriptionstatus": "TERMINATED",
    "name": "Suite.com 1 Year - 4/20/2022 - 4",
    "enduser": null,
    "startdate": "4/20/2022",
    "enddate": "4/19/2023",
    "customer": 2771,
    "billingaccount": 7065,
    "customer_name": "C-386",
    "customer_companyname": "Blue Star Inc.",
    "customer_email": "BlueStarAccountsPayable@BlueStarinc.com",
    "quantity": 8,

    "change_orders": [],
}, {
    "id": 8892,
    "subscriptionstatus": "ACTIVE",
    "name": "Suite.com 1 Year - 4/19/2022 - 2",
    "enduser": null,
    "startdate": "4/19/2022",
    "enddate": "4/18/2023",
    "customer": 2771,
    "billingaccount": 7895,
    "customer_name": "C-386",
    "customer_companyname": "Blue Star Inc.",
    "customer_email": "BlueStarAccountsPayable@BlueStarinc.com",
    "quantity": 8,

    "change_orders": [],
}, {
    "id": 3611,
    "subscriptionstatus": "ACTIVE",
    "name": "Suite.com 1 Year - 4/21/2022 - 3",
    "enduser": 3146,
    "startdate": "4/21/2022",
    "enddate": "4/20/2023",
    "customer": 3146,
    "billingaccount": 6351,
    "customer_name": "C-492",
    "customer_companyname": "Diversified Media Group",
    "customer_email": "accounts_payable@diversifiedus.com",
    "quantity": 3221,

    "change_orders": [],
}, {
    "id": 17621,
    "subscriptionstatus": "PENDING_ACTIVATION",
    "name": "Suite.com 1 Year - 4/19/2022 - 3 Renew 1",
    "enduser": null,
    "startdate": "4/19/2023",
    "enddate": "4/18/2024",
    "customer": 3101,
    "billingaccount": 15975,
    "customer_name": "C-447",
    "customer_companyname": "AVI Systems, Inc.",
    "customer_email": "APInvoice@AVISystems.com",
    "quantity": 7,

    "change_orders": [],
}, {
    "id": 16685,
    "subscriptionstatus": "PENDING_ACTIVATION",
    "name": "Suite.com 1 Year - 4/19/2022 - 2 Renew 1",
    "enduser": null,
    "startdate": "4/19/2023",
    "enddate": "4/18/2024",
    "customer": 2771,
    "billingaccount": 7895,
    "customer_name": "C-386",
    "customer_companyname": "Blue Star Inc.",
    "customer_email": "BlueStarAccountsPayable@BlueStarinc.com",
    "quantity": 8,

    "change_orders": [],
}];

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
            { name: 'customer_name', type: 'string' },
            { name: 'customer_companyname', type: 'string' },
            { name: 'customer_email', type: 'string' },
            { name: 'quantity', type: 'int', defaultValue: 0 },
            { name: 'enduser', type: 'string' },
        ],
    });
}

function prepareSubscriptionDetailsStore(data) {
    return Ext.create('Ext.data.Store', {
        model: prepareSubscriptionDetailsModel(),
        data: [ data ],
    });
}

function prepareSubscriptionDetailsDataViewConfig(data) {
    return {
        xtype: 'dataview',
        reference: 'dataview',
        emptyText: 'No Data Loaded',

        padding: 10,
        scrollable: false,

        title: 'No Subscriptions',

        itemTpl: `
                    <div>
                        Name: {name} <br/>  
                        Start Date: {startdate} <br/> 
                        End Date: {enddate} <br/> 
                        Subs Quantity: {quantity} <br/> 
                        Customer Name: {customer_name} {customer_companyname} <br/> 
                        Customer Email: {customer_email} <br/> 
                        Billing Account: {billingaccount} <br/> 
                        End User Name: {endUserName} 
                    </div>
        `,
        store: prepareSubscriptionDetailsStore(data)
    };
}

function prepareSubscriptionDetailsPanel(data) {
    return Ext.create('Ext.panel.Panel', {
        title: 'Subscription',
        flex: 1,

        scrollable: true,
        items: [ prepareSubscriptionDetailsDataViewConfig(data) ]
    });
}

function prepareSubscriptionPanel(data) {
    return Ext.create('Ext.panel.Panel', {
        title: `${data['name']}`, // End User: C-51930 Stonebridge Real Estate Active
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

           /* Ext.create('Ext.panel.Panel', {
                title: 'Subscription change orders',
                flex: 1,
                scrollable: true,
                items: [ prepareSubscriptionDetailsDataViewConfig() ]
            }),*/
        ],
    });
}

Ext.create('Ext.window.Window', {
    title: 'Subscription history',
    height: 300,
    width: 700,
    layout: 'accordion',

    layoutConfig: {
        titleCollapse: true,
        animate: true,
        activeOnTop: false,
        autoScroll:true,
        align: 'stretch'
    },

    items: data.map(prepareSubscriptionPanel)
}).show();