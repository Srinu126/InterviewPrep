class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    isEmpty() {
        return this.length === 0;
    }

    getLength() {
        return this.length;
    }

    enqueue(ele) {
        const node = new Node(ele);
        if (this.isEmpty()) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    dequeue() {
        if (this.isEmpty()) {
            console.log('Queue is empty!');
            return;
        }
        const dequeuedValue = this.head.value;
        this.head = this.head.next;

        if (this.head === null) {
            this.tail = null;
        }

        this.length--;
        return dequeuedValue;
    }

    peek() {
        if (this.isEmpty()) {
            console.log('Queue is empty!');
            return null;
        }
        return this.head.value;
    }

    print() {
        if (this.isEmpty()) {
            console.log('Queue is empty');
            return;
        }
        let curr = this.head;
        let listValues = '';
        while (curr) {
            listValues += `${curr.value} -> `;
            curr = curr.next;
        }
        console.log(listValues);
    }

    reverse() {
        let prev = null;
        let curr = this.head;
        while (curr) {
            let next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        this.head = prev;
    }
}

const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
queue.enqueue(50);
console.log(queue.dequeue()); // Output: 10
queue.print(); // Output: 20 -> 30 -> 40 -> 50
console.log(queue.peek()); // Output: 20
queue.reverse(); // Reversing the queue
queue.print(); // Output: 50 -> 40 -> 30 -> 20
console.log(queue.peek()); // Output: 50
console.log(queue.getLength()); // Output: 4
