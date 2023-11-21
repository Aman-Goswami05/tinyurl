// TrieNode class represents a node in the trie
class TrieNode {
    constructor() {
      this.children = {};
      this.isEndOfAlias = false;
      this.url = null;
    }
}
  
// AliasTrie class represents the trie data structure for custom aliases
class AliasTrie {
    constructor() {
      this.root = new TrieNode();
    }
  
    // Insert a custom alias and its corresponding URL into the trie
    insert(alias, url) {
      let node = this.root;
  
      for (const char of alias) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
  
      node.isEndOfAlias = true;
      node.url = url;
    }
  
    // Search for a custom alias and return the corresponding URL
    search(alias) {
      let node = this.root;
  
      for (const char of alias) {
        if (!node.children[char]) {
          return null; // Alias not found
        }
        node = node.children[char];
      }
  
      if (node.isEndOfAlias) {
        return node.url; // Alias found, return the associated URL
      }
  
      return null; // Prefix of an alias but not a complete alias
    }
}
  
// Example usage:
// Create an instance of the AliasTrie
const aliasTrie = new AliasTrie();
  
// Insert custom aliases and URLs into the trie
aliasTrie.insert("abc", "https://www.example.com");
aliasTrie.insert("xyz", "https://www.example.org");
  
// Search for aliases and retrieve URLs
const url1 = aliasTrie.search("abc");
const url2 = aliasTrie.search("xyz");
const url3 = aliasTrie.search("invalid");
  
// Display results
console.log("URL for 'abc':", url1 || "Alias not found");
console.log("URL for 'xyz':", url2 || "Alias not found");
console.log("URL for 'invalid':", url3 || "Alias not found");