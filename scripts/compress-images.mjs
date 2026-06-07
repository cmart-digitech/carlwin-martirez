import sharp from 'sharp'
import { readdirSync, mkdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

const INPUT_DIR = './public/projects'
const OUTPUT_DIR = './public/projects'
const MAX_WIDTH = 1400      // px — enough for 3-col grid on retina
const QUALITY = 82          // WebP quality (0-100)

const SUPPORTED = ['.jpg', '.jpeg', '.png', '.webp', '.avif']

const files = readdirSync(INPUT_DIR).filter(f =>
  SUPPORTED.includes(extname(f).toLowerCase())
)

console.log(`\nCompressing ${files.length} images → WebP @ ${MAX_WIDTH}px / q${QUALITY}\n`)

let totalBefore = 0
let totalAfter = 0

for (const file of files) {
  const inputPath = join(INPUT_DIR, file)
  const name = basename(file, extname(file))
  const outputPath = join(OUTPUT_DIR, `${name}.webp`)

  const sizeBefore = statSync(inputPath).size
  totalBefore += sizeBefore

  await sharp(inputPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outputPath)

  const sizeAfter = statSync(outputPath).size
  totalAfter += sizeAfter

  const pct = Math.round((1 - sizeAfter / sizeBefore) * 100)
  const kb = (n) => `${Math.round(n / 1024)} KB`
  console.log(`  ${file.padEnd(30)} ${kb(sizeBefore).padStart(8)} → ${kb(sizeAfter).padStart(8)}  (${pct}% smaller)`)
}

const totalPct = Math.round((1 - totalAfter / totalBefore) * 100)
const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`
console.log(`\n  Total: ${mb(totalBefore)} → ${mb(totalAfter)}  (${totalPct}% smaller)\n`)
