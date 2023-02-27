# Props Plowing

- analogue to 'Props Drilling' but in horizontal way;

before:

```jsx

const data = {
 id: 11,
 name: Yosua,
 age: 10,
 avatar: "👍",
 bio: "GGWP"
}

<AssessmentTable id={data.id} name={data.name} age={data.age} avatar={data.avatar} bio={data.bio}/>

```

- use **spread** operator;

after:

```jsx

const data = {
 id: 11,
 name: Yosua,
 age: 10,
 avatar: "👍",
 bio: "GGWP"
}
 
<AssessmentTable {...data}/>

```
