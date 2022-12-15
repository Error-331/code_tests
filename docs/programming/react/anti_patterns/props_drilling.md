# Props Drilling

- component at the very top that holds all the state but then you there is a  deeply nested component that likewise needs to use that state;
- state should be passed as a prop to a lot of intermediate components that do not actually require it until it finally gets to that child; 

Solution: Redux or context API.