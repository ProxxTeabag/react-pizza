import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="291" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="337" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="440" rx="10" ry="10" width="40" height="30" /> 
    <rect x="121" y="440" rx="24" ry="24" width="152" height="45" /> 
    <circle cx="135" cy="133" r="132" />
  </ContentLoader>
)

export default Skeleton

