# Custom records

## How to enable

1. Go to: `Setup > Company > Enable Features > SuiteCloud (subtab)`
2. Check `custom records` checkbox;

## How to create new custom record

Go to: `Customization > List, Records, & Fields > Record Types > New`;

## How to create instance of the custom record

### Classic center

Go to: `Lists > Custom > Courses Taken by Employees (example)` (example);

## Notice

- Always check `Store form with record`;

## Warning

If you set parent/child relation to a field and the parent field was not populated at the moment when child record is created, then this field in child record will not be
populated when the field in parent record is updated. To properly connect parent value with child field open your costume record, then `Validation & Defaulting > Default value`, 
then check `Formula chekcbox` and enter something like this `{custrecord_employee_student.title}`.


