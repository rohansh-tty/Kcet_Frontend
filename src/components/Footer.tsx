import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="flex flex-row items-center justify-center w-full  row-span-1 ">
      <p className="text-center">© 2023 Cutoff Tracker</p>

      <p className="text-center ">
        Made with ❤️ by{' '}
        <a
          className="hover:text-blue-400 no-underline"
          href="https://www.linkedin.com/in/rohan-shetty641/"
        >
          Rohan Shetty
        </a>
      </p>
    </footer>
  )
}

export default Footer
