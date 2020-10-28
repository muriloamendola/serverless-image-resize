import * as sharp from 'sharp'

export async function resize (imageBytes: Buffer, size: { width: number, height: number }): Promise<Buffer> {
  return sharp(imageBytes)
    .resize({
      width: size.width,
      height: size.height,
      fit: sharp.fit.inside
    })
    .toBuffer()
}
