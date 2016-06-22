// https://www.codewars.com/kata/515bb423de843ea99400000a/train/javascript

// The constructor takes in an array of items and a integer indicating how many
// items fit within a single page
function PaginationHelper(collection, itemsPerPage){
  Object.assign(this,{collection, itemsPerPage});
}

// returns the number of items within the entire collection
PaginationHelper.prototype.itemCount = function() {
  return this.collection.length;
}

// returns the number of pages
PaginationHelper.prototype.pageCount = function() {
  return Math.ceil(this.collection.length / this.itemsPerPage);
}

// returns the number of items on the current page. page_index is zero based.
// this method should return -1 for pageIndex values that are out of range
PaginationHelper.prototype.pageItemCount = function(pageIndex) {
  const totalPages = this.pageCount();
  if(pageIndex < 0 || pageIndex >= totalPages) {return -1;}
  if(pageIndex < totalPages-1) {return this.itemsPerPage;}
  return this.collection.length % this.itemsPerPage;
}

// determines what page an item is on. Zero based indexes
// this method should return -1 for itemIndex values that are out of range
PaginationHelper.prototype.pageIndex = function(itemIndex) {
  if(itemIndex < 0 || itemIndex >= this.collection.length) {return -1;}
  return Math.floor(itemIndex / this.itemsPerPage);
}