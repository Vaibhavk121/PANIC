/**
 * Bluetooth Mesh Network Simulation Model
 * This code simulates a Bluetooth Mesh network with nodes, message routing, 
 * node joining/leaving, message TTL, and broadcast/multicast/unicast support.
 */

class MeshNode {
  constructor(id, neighbors = [], isRelay = true) {
    this.id = id;
    this.neighbors = neighbors; // Array of MeshNode ids
    this.receivedMessages = new Set();
    this.isRelay = isRelay; // If false, node won't forward messages
    this.online = true;
  }

  // Simulate sending a message to all neighbors
  sendMessage(message, meshNetwork) {
    if (!this.online) return;
    for (const neighborId of this.neighbors) {
      const neighbor = meshNetwork.getNode(neighborId);
      if (neighbor) {
        neighbor.receiveMessage(message, this.id, meshNetwork);
      }
    }
  }

  // Simulate receiving a message and forwarding it if not already received
  receiveMessage(message, fromId, meshNetwork) {
    if (!this.online) return;
    const messageKey = `${message.id}`;
    if (this.receivedMessages.has(messageKey) || message.ttl <= 0) {
      return; // Already received or TTL expired
    }
    this.receivedMessages.add(messageKey);

    // Process the message (e.g., log or trigger an action)
    console.log(
      `Node ${this.id} received message "${message.payload}" from Node ${fromId} (TTL: ${message.ttl})`
    );

    // If this is the destination node for unicast, stop here
    if (message.type === 'unicast' && message.destination === this.id) {
      console.log(`Node ${this.id} is the final destination for message "${message.payload}"`);
      return;
    }

    // Forward to other neighbors except the sender, if relay is enabled
    if (this.isRelay && message.ttl > 1) {
      const nextMessage = { ...message, ttl: message.ttl - 1 };
      for (const neighborId of this.neighbors) {
        if (neighborId !== fromId) {
          const neighbor = meshNetwork.getNode(neighborId);
          if (neighbor) {
            neighbor.receiveMessage(nextMessage, this.id, meshNetwork);
          }
        }
      }
    }
  }

  // Node goes offline
  goOffline() {
    this.online = false;
    console.log(`Node ${this.id} is now offline.`);
  }

  // Node comes online
  goOnline() {
    this.online = true;
    console.log(`Node ${this.id} is now online.`);
  }

  // Add a neighbor
  addNeighbor(neighborId) {
    if (!this.neighbors.includes(neighborId)) {
      this.neighbors.push(neighborId);
    }
  }

  // Remove a neighbor
  removeNeighbor(neighborId) {
    this.neighbors = this.neighbors.filter(id => id !== neighborId);
  }
}

class MeshNetwork {
  constructor() {
    this.nodes = {};
  }

  addNode(node) {
    this.nodes[node.id] = node;
  }

  removeNode(id) {
    delete this.nodes[id];
    // Remove from neighbors
    for (const node of Object.values(this.nodes)) {
      node.removeNeighbor(id);
    }
  }

  getNode(id) {
    return this.nodes[id];
  }

  // Broadcast a message from a specific node
  broadcastMessage(fromNodeId, payload, ttl = 5) {
    const message = {
      id: Date.now() + Math.random(), // Unique message id
      payload,
      ttl,
      type: 'broadcast',
    };
    const node = this.getNode(fromNodeId);
    if (node) {
      node.sendMessage(message, this);
    }
  }

  // Multicast to a group of nodes
  multicastMessage(fromNodeId, payload, groupIds = [], ttl = 5) {
    const message = {
      id: Date.now() + Math.random(),
      payload,
      ttl,
      type: 'multicast',
      group: groupIds,
    };
    for (const destId of groupIds) {
      const node = this.getNode(destId);
      if (node) {
        node.receiveMessage(message, fromNodeId, this);
      }
    }
  }

  // Unicast to a single node
  unicastMessage(fromNodeId, payload, destinationId, ttl = 5) {
    const message = {
      id: Date.now() + Math.random(),
      payload,
      ttl,
      type: 'unicast',
      destination: destinationId,
    };
    const node = this.getNode(fromNodeId);
    if (node) {
      node.sendMessage(message, this);
    }
  }

  // Print network topology
  printTopology() {
    console.log("Mesh Network Topology:");
    for (const node of Object.values(this.nodes)) {
      console.log(
        `Node ${node.id} (Relay: ${node.isRelay}, Online: ${node.online}) -> Neighbors: [${node.neighbors.join(", ")}]`
      );
    }
  }
}

// Example usage:
const mesh = new MeshNetwork();

// Create nodes and define neighbors (mesh topology)
mesh.addNode(new MeshNode('A', ['B', 'C']));
mesh.addNode(new MeshNode('B', ['A', 'C', 'D']));
mesh.addNode(new MeshNode('C', ['A', 'B', 'D']));
mesh.addNode(new MeshNode('D', ['B', 'C']));

// Print topology
mesh.printTopology();

// Broadcast a message from node A
mesh.broadcastMessage('A', 'Emergency: Please respond!');

// Unicast a message from A to D
mesh.unicastMessage('A', 'Private message to D', 'D');

// Multicast a message from B to C and D
mesh.multicastMessage('B', 'Group message to C and D', ['C', 'D']);

// Simulate node going offline and online
mesh.getNode('C').goOffline();
mesh.broadcastMessage('A', 'Test after C offline');
mesh.getNode('C').goOnline();
mesh.broadcastMessage('A', 'Test after C online');

// Export for use in other modules
module.exports = { MeshNode, MeshNetwork };