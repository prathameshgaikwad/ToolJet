---
id: run-py
title: Run Python code
---

You can write custom Python code to interact with components and queries. To do that, you just need to create a new query and select **Run Python Code** from the available datasources.

<div style={{textAlign: 'center'}}>
    <img className="screenshot-full" src="/img/datasource-reference/custom-python/run-py.png" alt="Run JavaScript code" />
</div>

## Using Python code to trigger component specific actions

- Let's drag a **button** and a **text** widget onto the canvas. We will set a text on the text component and trigger button click event from the Python query.
- Click on the `+` on the query panel to create a query and select **Run Python code** from the available datasources
- Let's write the code in **Python Editor** and save the query:

    ```python
    class Person:
      def __init__(self, name, age):
        self.name = name
        self.age = age
        
      def myfunc(self):
        return "Hello my name is " + self.name
        
    p1 = Person(tj_globals.currentUser.firstName, 36)
    
    components.text1.setText(p1.myfunc())
    components.button1.click()
    ```
- The code above has a function `myfunc` which returns a string and we using the component specific action to set the **text component**'s value from the Python query. We are also triggering the button click using `components.button1.click()`

:::tip
- ToolJet's global variables can be accessed using **tj_globals**. ex: `tj_globals.currentUser.firstName`
- As of now, Run Python code only supports the [Python standard library](https://docs.python.org/3/library/) only.
- Check **[RunPy Limitations](/docs/contributing-guide/troubleshooting/runpy-limitations)**
:::

- Let's edit the properties of widgets:
    - Add an event handler to the button - Select **On Click** event, **Show alert** action, and set a success message `Triggered using RunPy`. This will show a success alert popup whenever the button click event is triggered from the Python code.
    - For the text component, we don't have to edit any property since we are changing the value directly from the Python code.

<div style={{textAlign: 'center'}}>
    <img className="screenshot-full" src="/img/datasource-reference/custom-python/runpyg.gif" alt="Run Python code" />
</div>

You can also write custom Python code to get the data from **External APIs** and manipulate the response for graphical representation. 

## Get Query Data

To immediately access the data returned by a query in the RunPy code, you can use the below functions: 

#### Retrieve the latest data of a query:
```py
response = await queries.getSalesData.run()
#replace getSalesData with your query name

value = queries.getSalesData.getData()
#replace getSalesData with your query name

value
```

#### Retrieve the latest raw data of a query:
```py
response = await queries.getCustomerData.run()
#replace getCustomerData with your query name

value = queries.getCustomerData.getRawData()
#replace getCustomerData with your query name

value
```

#### Retreive the loading state of a query:
```py
response = await queries.getTodos.run()
#replace getTodos with your query name

value = queries.getTodos.getLoadingState()
#replace getTodos with your query name

value
```

## Get Variables

To immediately access a variable or page variable after setting it in the RunPy code, you can use the below functions.

#### Retrieve the current value of a variable: 
```py
actions.setVariable('mode','dark')
#replace mode with your desired variable name

actions.getVariable('mode')
#replace mode with your desired variable name
```

#### Retrieve the current value of a page-specific variable:
```py
actions.setPageVariable('number',1)
#replace number with your desired variable name

actions.getPageVariable('number')
#replace number with your desired variable name
```

:::info
Issues with writing custom Python code? Ask in our [Slack community](https://www.tooljet.com/slack).
:::
