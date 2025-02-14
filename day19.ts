let input = `
r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`.trim().split('\n')

let supply: Set<string> = new Set(input[0].split(",").map((t) => t.trim()))
let designs = input.slice(2).map((d) => d.trim())


function subDesignExplode(design: string, results: Set<Set<string>>, subDesign: string[] = []) {
  if (design.length == 0) {
    results.add(new Set(subDesign))
    return
  }

  for (let i = 0; i < design.length; i++) {
    subDesign.push(design.slice(0, i + 1))
    subDesignExplode(design.slice(i + 1), results, subDesign)
    subDesign.pop()
  }
}
// Recursively explode the design to all possible subdesign
//help from https://www.techiedelight.com/find-combinations-non-overlapping-substrings-string/
function designExplode(design: string): Set<Set<string>> {
  let results: Set<Set<string>> = new Set()
  subDesignExplode(design, results)
  return results
}

function designInSupply(design: string, supply: Set<string>): boolean {
  let combinations = designExplode(design)
  // Check if each combination of exploded designed could be a subset of the supply
  for (const combination of combinations) {
    if (combination.isSubsetOf(supply)) {
      return true
    }
  }
  return false
}

function countDesigns(designs: string[], supply: Set<string>): number {
  let result = 0
  for (const design of designs) {
    if (designInSupply(design, supply)) {
      result++
    }
  }
  return result
}


let answer = countDesigns(designs, supply)

console.log(answer)
