# puppeteer visual regression tool

# Features

- [ ] store previous diff
- [ ] environment variable control reference site domain

## More feature

- [ ] full page size snapshot
- [ ] mock dom and remove dom
- [ ] easy way to iterate different screen size snapshot
- [ ] public page view only re-usable command
- [ ] reusable commands (https://stackoverflow.com/questions/50755896/how-to-reuse-puppeteer-tests)
  - [ ] login
  - [ ] logout
- [ ] ways to oragnize tests & reusable components
- [ ] load and generate report
  - [ ] posssible independence from all images by convert to bit 64!
        https://www.npmjs.com/package/image-to-base64
  - [ ] close PR with github API
    - [ ] https://stackoverflow.com/questions/47343739/closing-a-pull-request-through-github-api
  - [ ] Potential Setup
    - [ ] Test End -> NodeJs App grab all the images -> save name and distinguish test name and etc to build title and section
          -> build an array of objects -> display all into a html file as report with a button for direct to somewhere to
          .... run an update of the images so the build success
- [ ] button to run update process to update the visual regression app repo and merge the change so the test passes
  - [ ] how to make it work?
        <<<<<<< HEAD
- [ ] # push notification to PR
- [ ]...

# Development Guide

## Run Tests

### Run Only One Specific Test

### Run All Tests

### Update all your image shots

\*NOTE: there could be unexpected diffs when taking snapshot when your branch is not up to date with master, or your locahost is not pointing to the correct server as previous stored image shots been taken from.

### Clean jest test cache

./c

## Find Valid Selector

The main method we use inside the app to select dom is `document.querySelectAll` so in order to find the right element, please try this function inside your console while the testing target page is open, and make sure your query string will target the correct element to mock / remove from the page.

## Mock Elements

Define mockSelectorsConfigList when runing the reusable page commands to mock elements before imageshot is taken.

## mockSelectorsConfigList

### Object Structure of A mockSelectorsConfigList

```
[
  {
    device: [String],
    list: Array<Object { MockConfig }>
  },
  ...
]
```

`device`: specific what device(s) this list of mocks are for. Several options available at this time:

```
  'all': automatically apply to all devices, they will be *concatenated* and *NOT* overrideing other lists, if there are also specific device mock list as well.

  'mobile': apply only to mobile.

  'tablet': apply only to tablet.

  'desktop': apply only to desktop.
```

`list`: a list of `MockConfig` objects you can name infinity amount.

### Object Structure of A MockConfig

```
{
  target: {
    selector: [String]
  },
  mock: {
    text: [String],
    width: [String],
    height: [String]',
    elementType: [String],
    classes: Array<[String]>,
    dataAttributes: Array<[dataAttributeConfig]>,
  }
}
```

`target.selector`: This selector will pick all elements with `document.querySelectAll([String])` internally inside the application.

`mock.text`: This property will automatically consider the dom you picked will have string within, so the text will be replaced to what you specified, instead of a dynamic text that is unpredicatable. NOTE: defining a `text` attribute for mock will ignore all the other attributes below and likely trigger a warning / error inside the chrome instance.

`mock.width`: define a fixed width for the mock space replacing the element you picked.

`mock.height`: define a fixed height for the mock space replacing the element you picked.

`mock.width`: define a custom element type instead of the default type of `section` for the mock space replacing the element you picked.

`mock.classes`: define a list of classes for the mock space replacing the element you picked, so original style for the replaced elements can still be simulated just without its content within.

`mock.dataAttribute`: define a list of custom data attribute for the mock space replacing the element you picked, so styles associated with original data attribute for the replaced elements can still be simulated just without its content within. (i.e. if the attribute name you want to mock is `data-my-custom-attribute="abc"` you define it as `my-custom-attribute: 'abc'` without including the `data-` part as that is default will be part of the data attribute defination, so in this case the end result mock element will be something like `<section data-my-custom-attribute="abc" />)

- A dataAttributeConfig Object Structure:
  ```
  {
    name: [String],
    value: [String]
  }
  ```
  `name`: the data attribute's name, exlcuding the `data-` portion of the name.
  `value`: the value for the data attribute.

## Remove Elements

Define removeSelectorsList when runing the reusable page commands to remove elements before imageshot is taken.

### Object Structure of A mockSelectorsConfigList

```
[
  {
    device: [String],
    list: Array<[String] of SelectorString>
  },
  ...
]
```

`device`: same as the `device` description for `Object Structure of A mockSelectorsConfigList`.

`list`: a list of `SelectorString` you can add infinity amount.
Each string withint the list is a selector that will again, internally laoded with `document.querySelectAll([String])` to match removing elements

##
