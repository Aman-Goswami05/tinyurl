const shortid = require("shortid");
// Data structure for storing random short id
const myMap = new Map();

// Data structure for storing custom alias if present
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

const aliasTrie = new AliasTrie();

// Generate new short url
function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});
    var shortID = "";
    if(body.alias){
        shortID = body.alias;
        aliasTrie.insert(body.alias,body.url);
    }else{
        shortID = shortid();
        myMap.set(shortID,body.url);
    }
    return res.json({ shortID });
}

function getUrl(shortId){
    if(aliasTrie.search(shortId)){
        return aliasTrie.search(shortId);
    }
    return myMap.get(shortId);
}

module.exports = {
    handleGenerateNewShortURL,
    getUrl
}