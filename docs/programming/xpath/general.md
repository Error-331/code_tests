# XPath

Tokens in an XPath expression are set off from one another using single-character delimiters, or pairs of them. Aside from quotation marks, these delimiters include:

## Delimiters

- `/` - a forward slash separates a location step from the one that follows it;
- `[ and ]` - square brackets set off a predicate from the preceding portion of a location step;
- `= , != , < , > , <= , and >=` - boolean 'delimiters' are used in a predicate to establish the true or false value of the test;
- `::` - a double colon separates the name of an axis type from the name of a specific node (or set of nodes);
- `// , @ , . , and ..`- abbreviated or shortcut form of an axis or location step;
- `|` - Boolean union operator;
- `( and )` - used for grouping subexpressions and  to set off the name of an XPath function from its argument list;
- `+ , - , * , div , and mod` - numeric operators;


## Data Types

### String values

Following XML:

```xml

<type>logical</type>
<type>pathetic</type>

```

using following XPath:

```xpath

type='logical'

```

will be evaluated to following values:

```

'logical'='logical'
'pathetic'='logical'

```

### Numeric values

NaN check:

```xpath

string(number(year)) != "NaN"

```

### Boolean values

Check if element have attribute with specific value:

```xpath

concerto[@key="F"]

```

Locates  element only if it has any key attribute at all:

```xpath

concerto[@key]

```



