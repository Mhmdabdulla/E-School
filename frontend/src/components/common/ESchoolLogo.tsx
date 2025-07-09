import React from "react"
import { useNavigate } from "react-router-dom"

interface TutoriamLogoProps {
  text?: boolean
  size?: number
}

const TutoriamLogo: React.FC<TutoriamLogoProps> = ({ text = false, size = 30 }) => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate("/")
  }

  return (
    <button
      onClick={handleLogoClick}
      className="cursor-pointer inline-flex items-end text-black dark:text-white w-fit"
      style={{ fontSize: `${size * 0.5}px` }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 170 120"
        width={size}
        height={size}
        fill="currentColor"
      >
        <path d="M.34 0h64.83c24.3.07 41.68 17.07 41.91 41.31q.33 35.47 0 71c-.17 21.28-14.1 37.79-34.17 41-6.3 1-6.37 1-6.37-5.25V47.2c0-6.71 0-6.6-6.61-6.76-9.28-.21-18.67.22-27.8-1.08C14.81 36.88.38 20.06 0 3.16A28 28 0 0 1 .34 0z" />
        <path d="M101.19.86h67.59l-34.25 56.71z" />
      </svg>

      {text && (
        <span className="ml-[-4px] font-semibold leading-none">
          <i>utoriam</i>
        </span>
      )}
    </button>
  )
}

export default TutoriamLogo