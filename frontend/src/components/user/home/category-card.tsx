import React from 'react'
import {
    TagIcon as Label,
    DollarSign,
    BarChart,
    Code,
    User,
    FileText,
    BarChart2,
    Camera,
    Coffee,
    Palette,
    Heart,
    Music,
  } from "lucide-react"
import { cn } from '../../../lib/utils/className'

interface CategoryCardProps {
    icon: string
    title: string
    count: string
    color: string
    iconColor: string
  }

const CategoryCard = ({ icon, title, count, color, iconColor }: CategoryCardProps) => {
    const iconMap: Record<string, React.ReactNode> = {
        Label: <Label className={cn("h-3 w-3", iconColor)} />,
        DollarSign: <DollarSign className={cn("h-3 w-3", iconColor)} />,
        BarChart: <BarChart className={cn("h-3 w-3", iconColor)} />,
        Code: <Code className={cn("h-3 w-3", iconColor)} />,
        User: <User className={cn("h-3 w-3", iconColor)} />,
        FileText: <FileText className={cn("h-3 w-3", iconColor)} />,
        BarChart2: <BarChart2 className={cn("h-3 w-3", iconColor)} />,
        Camera: <Camera className={cn("h-3 w-3", iconColor)} />,
        Coffee: <Coffee className={cn("h-3 w-3", iconColor)} />,
        Palette: <Palette className={cn("h-3 w-3", iconColor)} />,
        Heart: <Heart className={cn("h-3 w-3", iconColor)} />,
        Music: <Music className={cn("h-3 w-3", iconColor)} />,
      }
  return (
    <div className="flex cursor-pointer  gap-5 items-center  rounded-lg border px-5 py-3  transition-all hover:shadow-md">
      <div className={cn(" flex h-12 w-12 items-center justify-center rounded-lg", color)}>{iconMap[icon]}</div>
      <div className=''>
      <h3 className="mb-1 font-semibold text-[12px]">{title}</h3>
      <p className="text-sm text-muted-foreground">{count}</p>
      </div>
    </div>
  )
}

export default CategoryCard