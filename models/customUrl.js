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