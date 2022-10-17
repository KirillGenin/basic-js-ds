const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.data = null;
    this.left = null;
    this.right = null;
  }

  root() {
    return this.data ? this : null
  }

  add(data) {

    if (!this.data) {
      this.data = data
      return
    }

    let newNode = new Node(data)
    let currentNode = this

    while (currentNode) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode
          return
        } else currentNode = currentNode.left
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode
          return
        } else currentNode = currentNode.right
      }
    }
  }

  has(data) {
    return Boolean(this.find(data))
  }

  find(data, mode) {
    if (!this.data) return mode ? { removeNode: null, removeRootNode: null } : null

    let currentNode = this
    let removeRootNode = null

    if (data === currentNode.data) return mode ? { removeNode: currentNode, removeRootNode } : currentNode

    while (currentNode) {

      if (currentNode.left) {
        if (currentNode.left.data === data) {
          return mode ? { removeNode: currentNode.left, removeRootNode: currentNode } : currentNode.left
        }
      }
      if (currentNode.right) {
        if (currentNode.right.data === data) {
          return mode ? { removeNode: currentNode.right, removeRootNode: currentNode } : currentNode.right
        }
      }
      if (!currentNode.left && !currentNode.right) {
        return mode ? { removeNode: null, removeRootNode: null } : null
      }

      if (data > currentNode.data) currentNode = currentNode.right
      else currentNode = currentNode.left
    }

    return mode ? { removeNode: null, removeRootNode: null } : null
  }

  remove(data) {
    
    let node = this.root()
    node = this.removeNode(node, data)
  }

  removeNode(node, data) {

    if (node.data < data) {
      node.right = this.removeNode(node.right, data)

    } else if (node.data > data) {
      node.left = this.removeNode(node.left, data)

    } else {
      if (!node.left) return node.right
      if (!node.right) return node.left

      node.data = this.min(node.right).data
      node.right = this.removeNode(node.right, node.data)
    }

    return node
  }

  min(mode) {
    if (!this.data) return null

    let currentNode = mode ? mode : this.root()

    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return mode ? currentNode : currentNode.data
  }

  max() {
    if (!this.data) return null

    let currentNode = this.root()

    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};