/*
 Write a function that returns a object that represents a virtual DOM element. A virtual DOM element is an object that has tag, attrs, and children attributes.

 Parameters:

 tagName (required) - an HTML element tag name as a string.
 attrs (optional) - an object of attributes with zero or more of the following keys: class, id, and/or type.
 content (optional) a string, an object, or an array of strings and/or objects.

 */

function vdom (tagName, attrs, content) {
  const vEl = {
    tag: tagName,
    attrs: {}, // default value
    children: null // default value
  };
  if(attrs){
    if(('object' !== typeof attrs) || attrs.tag || Array.isArray(attrs)){
      vEl.children = Array.isArray(attrs) ? attrs : [attrs];
    }else{ // attrs is an object without a 'tag' property
      vEl.attrs = attrs;
      if(content){
        vEl.children = [content];
      }
    }
  }
  return vEl;
}
