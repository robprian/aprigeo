import { del, list, put } from '@vercel/blob'

// Vercel Blob storage helpers
export async function uploadFile(filename: string, file: File | Buffer | ArrayBuffer) {
  try {
    const blob = await put(filename, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    })
    return blob
  } catch (error) {
    console.error('Blob upload error:', error)
    throw error
  }
}

export async function uploadFileFromUrl(filename: string, url: string) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch file from URL: ${response.statusText}`)
    }
    const fileBuffer = await response.arrayBuffer()

    const blob = await put(filename, fileBuffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    })
    return blob
  } catch (error) {
    console.error('Blob upload from URL error:', error)
    throw error
  }
}

export async function deleteFile(url: string) {
  try {
    await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    })
  } catch (error) {
    console.error('Blob delete error:', error)
    throw error
  }
}

export async function listFiles(prefix?: string) {
  try {
    const result = await list({
      prefix,
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    })
    return result
  } catch (error) {
    console.error('Blob list error:', error)
    throw error
  }
}

// Product image upload helpers
export async function uploadProductImage(productId: string, file: File) {
  const filename = `products/${productId}/${Date.now()}-${file.name}`
  return await uploadFile(filename, file)
}

export async function uploadCategoryImage(categoryId: string, file: File) {
  const filename = `categories/${categoryId}/${Date.now()}-${file.name}`
  return await uploadFile(filename, file)
}

export async function uploadBrandImage(brandId: string, file: File) {
  const filename = `brands/${brandId}/${Date.now()}-${file.name}`
  return await uploadFile(filename, file)
}

export async function uploadBlogImage(blogId: string, file: File) {
  const filename = `blog/${blogId}/${Date.now()}-${file.name}`
  return await uploadFile(filename, file)
}

// User avatar upload
export async function uploadUserAvatar(userId: string, file: File) {
  const filename = `avatars/${userId}/${Date.now()}-${file.name}`
  return await uploadFile(filename, file)
}
