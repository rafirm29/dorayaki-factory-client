import React from "react"

interface Props {
  title: String
  children: React.ReactNode
}

export default (props: Props) => {
  const { children, title } = props
  return (
    <div>
      <h2 className="text-center my-6">{title}</h2>
      {children}
    </div>
  )
}
