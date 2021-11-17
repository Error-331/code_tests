# SuiteFlow

Setup > Company > Enable Features > SuiteCloud (subtab)

enable SUITEFLOW (checkbox)

===

Business process 

Collection of linked tasks or activities that, once completed, accomplish some organizational goal

Examples

Sales Order Approvals
Purchase Order Approvals
Employee Performance Reviews

Anatomy of a Business Process

- Initiation (Entry) states;
- Action states;
- Decision states;
- Sub-Process states;
- Completion (End) states;

* Each of these building blocks are often referred to as processing states, in which various actions, decisions, or sub-processes can be initiated.


SuiteFlow is a point and click visual workflow diagrammer used to automate business processes.

Automation tasks examples:

- Generating approval routing workflows with sequential approvers and parallel approvers;
- Sending notifications, including time-based reminder emails;
- Altering the state of a workflow based on changes to other records;
- Configuring service level agreements (SLA) and drip marketing campaigns;
- Defining complex business rules and calculations;

SuiteFLow - Automates Business Processes;
SuiteScript - Extends the capabilities of NetSuite through coding;


Single workflow cannot be applied to multiple record types (but one record can utilize `join` to append additional record)

Example:

Employee Creates Expense Report -> submit -> Pending Manager Approval -> approve -> Pending VP Approval -> approve -> Expense Report Approved / Expense Report Rejected

(On a single record type)


Workflow Building Blocks

- States (state)
- Actions (thunks or actions)
- Transitions (reducers)
- Triggers

Workflow Manager

- Drag-and-drop-enabled, two-dimensional workflow development tool
- Manages all workflow components
- Contains both View and Edit modes


Customizations > Workflow > Workflows
