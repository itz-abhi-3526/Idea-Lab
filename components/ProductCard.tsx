"use client"

import Link from "next/link"

type Product = {
  id: string
  title: string
  short_description: string
  image_url: string
  technologies: string[]
  category: string
  status: string
  price: number
  is_paid: boolean
  team_size: number
  created_at: string
}

export default function ProductCard({
  product,
  viewMode = "grid",
}: {
  product: Product
  viewMode?: "grid" | "list"
}) {

  if (viewMode === "list") {
    return (
      <div className="flex gap-0 overflow-hidden">

        {/* IMAGE */}
        {product.image_url && (
          <div className="relative flex-shrink-0 w-40 h-full min-h-[120px]">
            <img
              src={product.image_url}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* CONTENT */}
        <div className="flex flex-1 flex-col justify-between p-4 min-w-0">

          <div>
            {/* badges row */}
            <div className="flex flex-wrap gap-2 mb-2">
              {product.category && (
                <span className="bg-purple-600 text-xs px-2 py-0.5 rounded-full text-white">
                  {product.category}
                </span>
              )}
              {product.status && (
                <span className="bg-green-500 text-xs px-2 py-0.5 rounded-full text-white">
                  {product.status}
                </span>
              )}
            </div>

            <h3 className="text-base font-semibold text-white mb-1 truncate">
              {product.title}
            </h3>

            <p className="text-sm text-gray-400 line-clamp-2 mb-3">
              {product.short_description}
            </p>

            {/* TECH STACK */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {product.technologies?.slice(0, 4).map((tech) => (
                <span key={tech} className="text-xs bg-white/10 px-2 py-0.5 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between">
            <Link href={`/products/${product.id}`} className="text-sm text-blue-400">
              Know More →
            </Link>
            {product.is_paid ? (
              <span className="text-yellow-400 font-semibold">₹{product.price}</span>
            ) : (
              <span className="text-green-400 text-sm">Free</span>
            )}
          </div>

        </div>
      </div>
    )
  }

  /* ── GRID (default — original layout unchanged) ── */
  return (
    <div>

      {/* IMAGE */}
      <div className="relative">
        <img src={product.image_url} className="w-full h-48 object-cover" />

        {product.category && (
          <span className="absolute top-3 left-3 bg-purple-600 text-xs px-3 py-1 rounded-full text-white">
            {product.category}
          </span>
        )}

        {product.status && (
          <span className="absolute top-3 right-3 bg-green-500 text-xs px-3 py-1 rounded-full text-white">
            {product.status}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">

        <h3 className="text-lg font-semibold text-white mb-2">
          {product.title}
        </h3>

        <p className="text-sm text-gray-400 mb-4">
          {product.short_description}
        </p>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.technologies?.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs bg-white/10 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between">
          <Link href={`/products/${product.id}`} className="text-sm text-blue-400">
            Know More →
          </Link>
          {product.is_paid ? (
            <span className="text-yellow-400 font-semibold">₹{product.price}</span>
          ) : (
            <span className="text-green-400 text-sm">Free</span>
          )}
        </div>

      </div>
    </div>
  )
}