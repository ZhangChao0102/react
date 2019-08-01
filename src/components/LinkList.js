function Node(element) {
    this.element = element;
    this.prev = null;
    this.next = null;
}

function LinkedList() {
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
}

function find(item) {
    let currentNode = this.head;

    while (currentNode.element !== item) {
        currentNode = currentNode.next;
    }

    return currentNode;
}

function insert(newElement, item) {
    let node = this.find(item), newNode = new Node(newElement);
    newNode.next = node.next;
    newNode.prev = node;
    if (node.next) node.next.prev = newNode;
    node.next = newNode;
}

function remove(item) {
    let node = this.find(item);
    node.next.prev = node.prev;
    node.prev.next = node.next;
    node.prev = null;
    node.next = null;
}

function display() {
    let node = this.head;
    while (node.next !== null) {
        console.log(node.element);
        node = node.next;
    }
    console.log(node.element);
}

function removeNthFromEnd(head, n) {
    let exact = new LinkedList('');
    let obj = {}, i = 1, item = head;
    exact.next = item;
    obj[0] = exact;
    while (item) {
        obj[i] = item;
        i++;
        item = item.next;
    }


    obj[i - 1 - n].next = obj[i - n].next;
    obj[i - n].next = null;
    return exact.next;

};

let test = new LinkedList();

test.insert('1', 'head');
test.insert('2', '1');
test.insert('3', '2');
test.insert('4', '3');
test.remove('2');
test.display();