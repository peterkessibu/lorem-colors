
import Image from 'next/image'

const testimonials = [
  {
    content: "Lorem Colors has revolutionized our design process. The AI-powered recommendations are spot-on!",
    author: {
      name: 'Sarah Johnson',
      role: 'Lead Designer, TechCorp',
      image: '/placeholder.svg?height=96&width=96',
    },
  },
  {
    content: "It is easy to transform our brand identity with Lorem Colors. The color palettes are always on point!",
    author: {
      name: 'Michael Chen',
      role: 'Creative Director, DesignHub',
      image: '/placeholder.svg?height=96&width=96',
    },
  },
  {
    content: "Lorem Colors has become an essential tool in our branding projects. Highly recommended!",
    author: {
      name: 'Emily Rodriguez',
      role: 'Brand Strategist, BrandWorks',
      image: '/placeholder.svg?height=96&width=96',
    },
  },
]

export default function Testimonials() {
  return (
    <section className="bg-gray-50 overflow-hidden w-full">
      <div className="mx-auto pt-20 pb-12 px-4 sm:px-6 lg:px-8 lg:py-20 w-full">
        <div className="relative lg:flex lg:items-center w-full">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex lg:items-center mb-10 w-full">
              <div className="hidden lg:block lg:flex-shrink-0">
                <Image
                  className="h-32 w-32 rounded-full xl:h-40 xl:w-40"
                  src={testimonial.author.image}
                  alt={`Testimonial author ${testimonial.author.name}`}
                  width={128}
                  height={128}
                />
              </div>

              <div className="relative lg:ml-10 w-full">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-8 -translate-y-24 h-36 w-36 text-primary opacity-50"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 144 144"
                  aria-hidden="true"
                >
                  <path
                    strokeWidth={2}
                    d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09 32.109 39.09 16.287 0 28.386-13.03 28.386-28.387 0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93 2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268 16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09 15.822 0 28.386-13.03 28.386-28.387 0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93 2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
                  />
                </svg>
                <blockquote className="relative">
                  <div className="text-2xl leading-9 font-medium w-full flex-auto text-gray-900">
                    <p>&ldquo;{testimonial.content}&rdquo;</p>
                  </div>
                  <footer className="mt-8">
                    <div className="flex">
                      <div className="flex-shrink-0 lg:hidden">
                        <Image
                          className="h-12 w-12 rounded-full"
                          src={testimonial.author.image}
                          alt={`Testimonial author ${testimonial.author.name}`}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="ml-4 lg:ml-0">
                        <div className="text-base font-medium text-gray-900">{testimonial.author.name}</div>
                        <div className="text-base font-medium text-primary">{testimonial.author.role}</div>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}