import { Check } from 'lucide-react';
import React from 'react'

const Features = () => {
  return (
<section className="container mx-auto px-[6%] py-16 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-gray-100 rounded-lg p-4 shadow-lg">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Tutoriam platform interface"
                className="w-full rounded-md"
              />
            </div>
            
          </div>

          <div className="space-y-10">
            <h2 className="text-3xl md:text-2xl font-bold ">Why you'll start teaching on Tutoriam</h2>
            <p className=" text-sm">
              Present congue ornare nibh sed ullamcorper. Proin venenatis tellus non turpis sollicitudin, vitae auctor
              arcu ornare. Cras vitae nulla a purus mollis venenatis.
            </p>

            <FeatureItem
              title="Teach your students as you want"
              description="Morbi quis urna non felis elementum suscipit. Nam sapien tellus, aliquam nec porttitor vel, pellentesque et nulla."
            />

            <FeatureItem
              title="Manage your course, payment in one place"
              description="Sed et mattis urna. Sed tempus fermentum est, eu lobortis nibh consectetur eu. Nullam vel libero pretium, suscipit turpis et, elementum ex."
            />

            <FeatureItem
              title="Chat with your students"
              description="Nullam mattis lectus ac dolor venenatis posuere. Praesent luctus massa velit, ut fermentum eros aliquam id."
            />
          </div>
        </div>
      </section>
  )
}

const FeatureItem: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="flex gap-4">
      <div className="flex-shrink-0 mt-1">
        <div className=" w-6 h-6 rounded-full flex items-center justify-center">
          <Check className="h-3 w-3 text-green-600" />
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-md font-semibold ">{title}</h3>
        <p className=" text-sm">{description}</p>
      </div>
    </div>
  )

export default Features