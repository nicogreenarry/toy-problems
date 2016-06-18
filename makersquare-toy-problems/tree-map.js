Tree.prototype.map = function(callback){
  var newTree = new Tree(callback(this.value));
  this.children.forEach(tree => newTree.addChild(tree.map(callback)));
  return newTree;
};