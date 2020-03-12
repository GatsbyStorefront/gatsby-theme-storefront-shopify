const R = require('ramda');

module.exports = menu => {
  let flattenMenu = [];
  let id = 0;

  const children = R.prop('children');
  const dissoc = R.dissoc('children');
  const assocId = R.assoc('id');
  const assocParentId = R.assoc('parentId');

  const iterate = (childrenArray, parentId = 0) => {
    childrenArray.forEach((obj, index) => {
      id++;
      flattenMenu = R.concat(flattenMenu, [
        dissoc(assocId(id, assocParentId(parentId, obj))),
      ]);

      if (children(obj)) {
        iterate(children(obj), id);
      }
    });
  };

  iterate(menu.children);
  return flattenMenu;
};
