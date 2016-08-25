/*
 Implement the function getClosestCommonAncestor and getAncestorPath in the Tree class

 // Valid Child
 var grandma = new Tree();
 var mom = new Tree();
 var uncle = new Tree();
 grandma.addChild(mom);
 grandma.addChild(uncle);
 var me = new Tree();
 mom.addChild(me);

 grandma.getAncestorPath(me); // => [grandma, mom, me]
 mom.getAncestorPath(me)  // => [mom, me]
 me.getAncestorPath(me) // => [me]
 grandma.getClosestCommonAncestor(me, uncle); // => grandma

 // Invalid Child
 grandma.getAncestorPath(H R Giger) // => null

 */
'use strict';
var Tree = function(){
  this.children = [];
};

Tree.prototype.addChild = function(child){
  if(!this.isDescendant(child)){
    this.children.push(child);
  }else {
    throw new Error("That child is already a child of this tree");
  }
  return this;
};

Tree.prototype.getClosestCommonAncestor = function(tree1,tree2){
  if(this === tree1 || this === tree2) {return this;}
  const lineage1 = this.getAncestorPath(tree1);
  const lineage2 = this.getAncestorPath(tree2);
  if(null === lineage1 || null === lineage2) {return null;}

  const minLength = Math.min(lineage1.length,lineage2.length);

  for(var i = 0; i < minLength; i++){
    if(lineage1[i] !== lineage2[i]){
      return lineage1[i-1];
    }
  }
  return lineage1[i];
}

Tree.prototype.getAncestorPath = function(descendant){
  function search(parent, target, path){
    if(parent === target) {return path;}
    if(!parent.children) {return null;}

    const childResults = parent.children.map(child => search(child, target, path.concat(child)));

    const successfulResults = childResults.filter(result => result);
    if(successfulResults.length) {
      return successfulResults[0];
    }
    return null; // else if no results
  }

  return search(this, descendant, [this]);
}

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

Tree.prototype.removeChild = function(child){
  var index = this.children.indexOf(child);
  if(index !== -1){
    // remove the child
    this.children.splice(index,1);
  }else{
    throw new Error("That node is not an immediate child of this tree");
  }
};