function findAnagrams(words: string[]) {
    const anagrams = {};
    
    for (let word of words) {
        let cleaned = word.replace(/\s/g, '').split('').sort().join('');
        
        if (anagrams[cleaned]) {
            anagrams[cleaned].push(word);
        } else {
            anagrams[cleaned] = [word];
        }
    }
    
    return Object.values(anagrams);
}

// Test the function
const words = [
    'rope',
    'pore', 'repo',
    'red rum', 'murder', 'listen', 'silent', 'endeavour',
];

console.log(findAnagrams(words));