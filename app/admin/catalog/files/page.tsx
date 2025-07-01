"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Search, Filter, FolderOpen, File, ImageIcon, Download, Trash2, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const files = [
  {
    id: 1,
    name: "trimble-r12i-manual.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploaded: "2024-01-15",
    folder: "Product Manuals",
    url: "/files/manuals/trimble-r12i-manual.pdf",
  },
  {
    id: 2,
    name: "leica-ts16-hero.jpg",
    type: "Image",
    size: "1.8 MB",
    uploaded: "2024-01-14",
    folder: "Product Images",
    url: "/files/images/leica-ts16-hero.jpg",
  },
  {
    id: 3,
    name: "gps-equipment-catalog.pdf",
    type: "PDF",
    size: "5.2 MB",
    uploaded: "2024-01-13",
    folder: "Catalogs",
    url: "/files/catalogs/gps-equipment-catalog.pdf",
  },
  {
    id: 4,
    name: "topcon-gt1200-specs.docx",
    type: "Document",
    size: "456 KB",
    uploaded: "2024-01-12",
    folder: "Specifications",
    url: "/files/specs/topcon-gt1200-specs.docx",
  },
]

const folders = [
  { name: "Product Images", count: 156, size: "234 MB" },
  { name: "Product Manuals", count: 45, size: "128 MB" },
  { name: "Catalogs", count: 12, size: "67 MB" },
  { name: "Specifications", count: 89, size: "45 MB" },
]

export default function FileManagerPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const getFileIcon = (type: string) => {
    switch (type) {
      case "Image":
        return <ImageIcon className="w-5 h-5 text-green-600" />
      case "PDF":
        return <File className="w-5 h-5 text-red-600" />
      case "Document":
        return <File className="w-5 h-5 text-blue-600" />
      default:
        return <File className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">File Manager</h1>
          <p className="text-gray-600">Organize and manage your digital assets</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Folders */}
      <Card>
        <CardHeader>
          <CardTitle>Folders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {folders.map((folder, index) => (
              <div key={index} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <FolderOpen className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium">{folder.name}</p>
                  <p className="text-sm text-gray-500">
                    {folder.count} files • {folder.size}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Files */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Files</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search files..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Size</th>
                  <th className="text-left py-3 px-4">Folder</th>
                  <th className="text-left py-3 px-4">Uploaded</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {getFileIcon(file.type)}
                        <span className="ml-3 font-medium">{file.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{file.type}</Badge>
                    </td>
                    <td className="py-3 px-4">{file.size}</td>
                    <td className="py-3 px-4">{file.folder}</td>
                    <td className="py-3 px-4">{file.uploaded}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" title="Preview">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" title="Download">
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button variant="outline" size="sm" title="Delete">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
