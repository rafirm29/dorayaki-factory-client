import React from "react"

interface Props {
  title: String
  children: React.ReactNode
}

export default (props: Props) => {
  const { children, title } = props
  return (
    <div className="w-full max-w-6xl mx-auto px-3 flex flex-col items-center">
      <h2 className="text-center my-6">{title}</h2>
      {children}
    </div>
  )
}
