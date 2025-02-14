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

let supply = input[0].split(",").map((t) => t.trim()).sort((a, b) => b.length - a.length)
let designs = input.slice(2).map((d) => d.trim())




function matchTowelsToSubDesign(design: string, supply: string[]): ([string, string] | null) {
  for (const towel of supply) {
    if (design.match(new RegExp(towel, "g"))) {
      // Find towel that fulfills part of the design and replace it #. This preserves design.
      return [design.replace(new RegExp(towel, 'g'), '#'), towel]
    }
  }
  return null
}

function matchTowelsToDesign(design: string, supply: string[]): ([string, string[]] | null) {
  let subdesign: string = design
  let towels: string[] = []
  // Continue until the whole design has been claimed.
  while (!subdesign.match(/^#+$/)) {
    let res = matchTowelsToSubDesign(subdesign, supply)
    // No more matches have been found so bail out
    if (!res) {
      break
    }
    subdesign = res[0]
    towels.push(res[1])
  }
  // The design could not be completed with the supply
  if (!subdesign.match(/^#+$/)) {
    return null
  }
  return [design, towels]

}

function matchTowels(designs: string[], supply: string[]): { [design: string]: string[] } {
  let result: { [design: string]: string[] } = {}
  for (const design of designs) {
    let res = matchTowelsToDesign(design, supply)
    // The design is valid store it for later
    if (res) {
      result[res[0]] = res[1]
    }
  }
  return result
}

let answer = matchTowels(designs, supply)

console.log(Object.keys(answer).length)
