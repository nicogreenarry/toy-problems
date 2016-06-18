// This is the example I started working on after we got the name of the problem ("tree count leaves") but before
// we had access to the actual problem. I had to adjust it a bit once I saw the actual problem's structure, but the
// solution was essentially correct.
function treeCountLeaves(node){
  leafCount = 0;
  if(!node) {return 0;} // If we got passed an undefined or null node
  if(!node.left && !node.right) {return 1;} // This node is a leaf

  return treeCountLeaves(node.left) + treeCountLeaves(node.right);
}


// Here's my actual solution (with all the code they included with the problem)

var Tree = function(value){
  this.value = value;
  this.children = [];
};

Tree.prototype.countLeaves = function () { // NOTE: this is the only method where I actually made any changes; all the
  // rest of the sections above and below this were provided to us.
  if(0 === this.children.length) {return 1;} // This node is a leaf

  return this.children.reduce(function(acc,node){
    return acc + node.countLeaves();
  },0);

}

/**
 * You shouldn't need to change anything below here, but feel free to look.
 */

/**
 * add an immediate child
 * (wrap values in Tree nodes if they're not already)
 */
Tree.prototype.addChild = function(child){
  if (!child || !(child instanceof Tree)){
    child = new Tree(child);
  }

  if(!this.isDescendant(child)){
    this.children.push(child);
  }else {
    throw new Error("That child is already a child of this tree");
  }
  // return the new child node for convenience
  return child;
};

/**
 * check to see if the provided tree is already a child of this
 * tree __or any of its sub trees__
 */
Tree.prototype.isDescendant = function(child){
  if(this.children.indexOf(child) !== -1){
    // `child` is an immediate child of this tree
    return true;
  }else{
    for(var i = 0; i < this.children.length; i++){
      if(this.children[i].isDescendant(child)){
        // `child` is descendant of this tree
        return true;
      }
    }
    return false;
  }
};

/**
 * remove an immediate child
 */
Tree.prototype.removeChild = function(child){
  var index = this.children.indexOf(child);
  if(index !== -1){
    // remove the child
    this.children.splice(index,1);
  }else{
    throw new Error("That node is not an immediate child of this tree");
  }
};

