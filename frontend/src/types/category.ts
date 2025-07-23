export interface Subcategory {
  _id: string
  name: string
}

export interface Category {
  _id: string
  name: string
  status: boolean
  subcategories: Subcategory[]
  courses: number
  createdAt: string
  updatedAt: string
}

export interface CategoryFormValues {
  _id?:string
  name: string
  status: boolean
  subcategories: { _id?:string, name: string }[]
}

export interface CategoryParams {
  page: number
  limit: number
  searchQuery?: string
  sortBy?: string
  filter?:string
}