# covercase
A slider menu with vertical or horizontal orientation

It's a ultra light weight [jQuery](http://jquery.com/) plugin that that turns the first level children of an element into a slider menu.

## Example :
Here is the simpliest example of how to use it :
```html
<div id="my_parent_elem">
  <img src="/....">
  <img src="/....">
  <img src="/....">
  <div></div>
  <img src="/....">
</div>
```

```js
$('#my_parent_elem').covercase(scroll_orientation: "y");
```


Horizontal scrolling with mouse wheel require : [jQuery Mousewheel Plugin](https://github.com/jquery/jquery-mousewheel) 

## Methodes :

### init
Initialization of the plugin

##### orientation
Allow to control the slider orientation

    Type: string
    Value: 'x' or 'y'

##### width

    Type: css
    Examples: '100px' or '100%'
    
##### height

    Type: css
    Examples: '200px' or '75%'

Example :

```js
$('#my_parent_elem').covercase( scroll_orientation: "y",
                                height: "75%",
                                width: 200);
```
Callback :
cc_init

### destroy
Destroy the plugin (no option)
Example :
```js
$('#my_parent_elem').covercase('destroy');
```
### resize_to
Change the slider width or height

##### width

    Type: css
    Examples: '100px' or '100%'
    
##### height

    Type: css
    Examples: '200px' or '75%'
Example :
```js
$('#my_parent_elem').covercase('resize_to', height: "100%",
                                            width: 300);
```
Callback :
cc_resize
