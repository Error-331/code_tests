# SuiteScript

## Script types

- Client Script Type is designed for scripts that should run in the browser;
- Scheduled Script Type is for server-side scripts that should run at a specific time or on a recurring schedule;
- RESTlet Script Type is for server-side scripts that should execute when called over HTTP by an application external to NetSuite;

Each script type includes one or more entry points that are exclusive to that type. Specifically, you tell the system that it should execute a function defined within the script. This function is called 
an entry point function.

## Script modules

SuiteScript 2.0 APIs are organized into a series of standard modules. For example, the `N/record` Module lets you interact with NetSuite records. The `N/https` Module lets you make https requests
to external web services. In an entry point script, you load a module by using the define Object. You list the modules that you want to load as an argument of the define function.

Some APIs are globally available When an object, method, or function is globally available, it an be used even when you do not explicitly load the module to which it belongs.

### Enabling 'Client SuiteScript' feature

1. Select `Setup > Company > Enable Features`;
2. Click the `SuiteCloud` subtab;
3. Locate the `Client SuiteScript` option;
4. If you agree to the terms, scroll to the bottom of the window and click `I Agree`;
5. Click Save;

### Uploading script file

1. In the NetSuite UI, go to `Documents > File > SuiteScripts`;
2. Click Add File;
3. Follow the prompts to locate the `helloWorld.js` file in your local environment and upload it;

### Creating a Script Record and Script DeploymentRecord

In general, before an entry point script can execute in your account, you must create a script record that represents the entry point script file. You must also create a script deployment record.

1. Go to `Customization > Scripting > Scripts > New`;
2. In the `Script File` dropdown list, select `helloWorld.js`;
3. After you have populated the dropdown list, click the `Create Script Record` button;
4. Fill out the required body fields as follows:
   - In the Name field, enter `Hello World Client Script`;
   - In the `ID` field, enter `_cs_helloworld`;
5. Click the `Deployments` subtab;
6. Add a line to the sublist, as follows:
   - Set the `Applies to` dropdown list to `Task`; 
   - In the `ID` field, enter `_cs_helloworld`;
7. Click Save;

### Testing the Script

1. Verify that the dialog alert appears when it should:
   - Open a task record by going to `Activities > Scheduling > Tasks > New`, if the script is working properly, the system displays a dialog alert;
   - Confirm and close the dialog by clicking `OK`;
2. Verify that the expected log entry has been saved to the script deployment record:
   - Go to `Customization > Scripting > Script Deployments`'
   - Locate your deployment, and click `View`;
   - Click the `Execution Log` subtab, the subtab should show an entry similar;
